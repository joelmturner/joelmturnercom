/** @jsx jsx */
import { jsx } from "theme-ui";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { handleEnterKeyPress } from "../utils/a11y";
import { useState, useCallback, useRef, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image";
import { wrap } from "@popmotion/popcorn";
import { InstaNode } from "../pages";
import { useOnClickOutside, useKeypressSimple } from "../hooks";
import "@reach/dialog/styles.css";

type DialogProps = {
  className?: any;
  children?: any;
  imageEdges: InstaNode[];
  offset: number;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

// based on https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=/src/Example.tsx&file=/src/Example.tsx:1884-2000
const VARIANTS = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const TRANSITION = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Dialog: FC<DialogProps> = ({ className, imageEdges, offset, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [[page, direction], setPage] = useState([offset, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage, prevDirection]) => [prevPage + newDirection, newDirection]);
    },
    [setPage]
  );

  const onNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const onPrev = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const handleDragEnd = useCallback((e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  }, []);

  // handle key presses
  useKeypressSimple("ArrowRight", onNext, [page]);
  useKeypressSimple("ArrowLeft", onPrev, [page]);

  // handle navigation opacity
  const setNavOpacity = useCallback(
    (value = 0) => {
      const nextEl = ref?.current?.querySelectorAll('[data-reach-dialog-nav="next"]')?.[0];
      const prevEl = ref?.current?.querySelectorAll('[data-reach-dialog-nav="prev"]')?.[0];

      if (nextEl && prevEl) {
        (nextEl as unknown as HTMLElement).style.opacity = value;
        (prevEl as unknown as HTMLElement).style.opacity = value;
      }
    },
    [ref.current]
  );

  const setNavFocus = useCallback(() => {
    setNavOpacity(1);
  }, []);
  const unsetNavFocus = useCallback(() => {
    setNavOpacity(0);
  }, []);

  const imageIndex = wrap(0, imageEdges.length, page);
  useOnClickOutside(ref, onClose as any);

  return (
    <DialogOverlay sx={{ variant: "dialog.overlay" }} isOpen onDismiss={onClose} className={className} ref={ref}>
      <DialogContent
        aria-label="gallery of Instagram images"
        sx={{
          variant: "dialog.content",
          "[data-reach-dialog-overlay]": {
            background: "black",
            backgroundColor: "black",
          },
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={TRANSITION}
            drag="x"
            style={{ y: "0%", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            <img
              src={imageEdges[imageIndex]?.secure_url}
              alt={`full size page`}
              style={{ maxWidth: "100%", width: "960px" }}
            />
          </motion.div>
        </AnimatePresence>
        <button
          sx={{
            bg: "muted",
            border: "none",
            padding: "0",
            margin: "0 0 1rem",
            width: "1.9rem",
            height: "1.9rem",
            fontSize: "1.3rem",
            color: "text",
            cursor: "pointer",
            position: "absolute",
            right: "-1.3rem",
            top: "-1.5rem",
            borderRadius: "50%",
          }}
          onClick={onClose}
          aria-label="close image viewer"
        >
          X
        </button>
        <FaChevronRight
          sx={{
            variant: "dialog.nav",
            right: -4,
            opacity: 0,
          }}
          onClick={onNext}
          data-reach-dialog-nav="next"
          role="button"
          aria-label="next image"
          tabIndex={0}
          onKeyPress={handleEnterKeyPress(onNext)}
          onFocus={setNavFocus}
          onBlur={unsetNavFocus}
        />
        {onPrev && (
          <FaChevronLeft
            sx={{
              variant: "dialog.nav",
              left: -4,
              opacity: 0,
            }}
            onClick={onPrev}
            data-reach-dialog-nav="prev"
            role="button"
            aria-label="previous image"
            tabIndex={0}
            onKeyPress={handleEnterKeyPress(onPrev)}
            onFocus={setNavFocus}
            onBlur={unsetNavFocus}
          />
        )}
      </DialogContent>
    </DialogOverlay>
  );
};

export default Dialog;
