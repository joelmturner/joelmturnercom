/** @jsx jsx */
import { jsx } from "theme-ui"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "@reach/dialog/styles.css"
import { handleEnterKeyPress } from "../utils/a11y"
import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Img from "gatsby-image"
import { wrap } from "@popmotion/popcorn"
import { InstaNode } from "../pages"
import { useOnClickOutside, useKeypress } from "../hooks"

type DialogProps = {
  className?: any;
  children?: any;
  imageEdges: InstaNode[];
  offset: number;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      y: "0%",
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    y: "0%",
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      y: "0%",
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const Dialog: React.FC<DialogProps> = ({ className, imageEdges, offset, onClose }) => {
  const ref = useRef(null)
  const currentPage = useRef(-1);
  const [isNavFocused, setIsNavFocused] = useState<boolean>(false)

  const [[page, direction], setPage] = useState([offset, 0])
  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection])
    },
    [setPage, page]
  )

  const onNext = useCallback(() => {
    paginate(1)
  }, [paginate])

  const onPrev = useCallback(() => {
    paginate(-1)
  }, [paginate])

  const rightArrow = useKeypress("ArrowRight")
  const leftArrow = useKeypress("ArrowLeft")

  useEffect(() => {
      if (currentPage.current === page) {
          if (rightArrow) {
            onNext()
          }
          if (leftArrow) {
            onPrev()
          }
      }
      currentPage.current = page;
  }, [onNext, onPrev, rightArrow, leftArrow, page])

  const setNavFocus = useCallback(() => {
    setIsNavFocused(true)
  }, [])
  const unsetNavFocus = useCallback(() => {
    setIsNavFocused(false)
  }, [])

  const imageIndex = wrap(0, imageEdges.length, page)
  useOnClickOutside(ref, onClose as any)

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
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 200 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            style={{ y: "0%", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          >
            <Img fluid={imageEdges[imageIndex]?.localFile?.childImageSharp.fluid} />
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
        >
          X
        </button>
        <FaChevronRight
          sx={{
            variant: "dialog.nav",
            right: -4,
            opacity: isNavFocused ? 1 : 0,
          }}
          onClick={onNext}
          data-reach-dialog-nav="next"
          role="button"
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
              opacity: isNavFocused ? 1 : 0,
            }}
            onClick={onPrev}
            data-reach-dialog-nav="prev"
            role="button"
            tabIndex={0}
            onKeyPress={handleEnterKeyPress(onPrev)}
            onFocus={setNavFocus}
            onBlur={unsetNavFocus}
          />
        )}
      </DialogContent>
    </DialogOverlay>
  )
}

export default Dialog
