import { DialogOverlay, DialogContent } from "@reach/dialog";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { handleEnterKeyPress } from "../utils/a11y";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import { useOnClickOutside, useKeypressSimple } from "../hooks";
import { IllustrationItem } from "../lib/types";
import { ChakraNextImage } from "./ChakraNextImage";
import { Box, chakra, useColorModeValue, Flex } from "@chakra-ui/react";
import "@reach/dialog/styles.css";
import NextImage from "next/image";

const Overlay = chakra(DialogOverlay);
const Content = chakra(DialogContent);
const LeftNav = chakra(FaChevronLeft);
const RightNav = chakra(FaChevronRight);
const Close = chakra(IoMdClose);

type DialogProps = {
  className?: any;
  children?: any;
  images: IllustrationItem[];
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

export function Dialog({ className, images, offset, onClose }: DialogProps) {
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
        (nextEl as unknown as HTMLElement).style.opacity = `${value}`;
        (prevEl as unknown as HTMLElement).style.opacity = `${value}`;
      }
    },
    [ref.current]
  );

  const setNavFocus = useCallback(() => {
    // setNavOpacity(1);
  }, []);
  const unsetNavFocus = useCallback(() => {
    // setNavOpacity(0);
  }, []);

  const imageIndex = wrap(0, images.length, page);
  useOnClickOutside(ref, onClose as any);

  return (
    <Overlay
      bg={useColorModeValue("rgb(255,255,255,0.93)", "rgb(0,0,0,0.93)")}
      isOpen
      onDismiss={onClose}
      className={className}
      ref={ref}
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={100}
    >
      <Content
        aria-label="gallery of Instagram images"
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap={3}
        pos="relative"
        bg="transparent"
        w="100%"
        pointerEvents="none"
        height="calc(100vh - 7rem)"
        margin={0}
        padding={0}
        sx={{
          ":hover [data-reach-dialog-nav]": {
            opacity: 1,
          },
          "[data-reach-dialog-overlay]": {
            background: "black",
            backgroundColor: "black",
          },
          "[data-reach-dialog-content]": {
            margin: "0 auto",
          },
        }}
      >
        <Flex
          gap={4}
          w={["85%", "100%"]}
          h="100%"
          maxHeight="85vw"
          maxWidth="85vh"
          alignItems="center"
          pointerEvents="auto"
          pos="relative"
          sx={{
            ":hover [data-reach-dialog-nav]": {
              opacity: 1,
            },
          }}
        >
          <Close
            pos="absolute"
            top="-2rem"
            right="-1rem"
            border={"1px solid"}
            borderColor={useColorModeValue("gray.300", "gray.700")}
            padding={"0"}
            width={"1.5rem"}
            height={"1.5rem"}
            color={useColorModeValue("gray.700", "gray.300")}
            cursor={"pointer"}
            borderRadius={"50%"}
            pointerEvents="auto"
            onClick={onClose}
            aria-label="close image viewer"
            role="button"
          />
          {onPrev && (
            <LeftNav
              border="none"
              padding="0"
              margin="0 0 1rem"
              width="1.9rem"
              height="1.9rem"
              fontSize=".75rem"
              color={useColorModeValue("gray.700", "gray.300")}
              cursor="pointer"
              top="50%"
              borderRadius="50%"
              transition="opacity 300ms"
              left="-10"
              opacity={0}
              display={["none", "none", "block"]}
              onClick={onPrev}
              data-reach-dialog-nav="prev"
              role="button"
              aria-label="previous image"
              tabIndex={0}
              onKeyPress={handleEnterKeyPress(onPrev)}
              onFocus={setNavFocus}
              onBlur={unsetNavFocus}
              sx={{
                ":focus": {
                  opacity: 1,
                  "& ~ [data-reach-dialog-nav]": {
                    opacity: 1,
                  },
                },
              }}
            />
          )}
          <Box position="relative" w={"100%"} h={"100%"} m="0 auto" overflow="hidden">
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
                <NextImage
                  src={images[imageIndex]?.url}
                  alt={`full size page`}
                  objectFit="contain"
                  width={200}
                  height={200}
                  layout="responsive"
                  style={{ cursor: "pointer" }}
                />
              </motion.div>
            </AnimatePresence>
          </Box>
          {onNext && (
            <RightNav
              border="none"
              padding="0"
              margin="0 0 1rem"
              width="1.9rem"
              height="1.9rem"
              fontSize=".75rem"
              color={useColorModeValue("gray.700", "gray.300")}
              cursor="pointer"
              top="50%"
              borderRadius="50%"
              transition="opacity 300ms"
              right="-10"
              opacity={0}
              display={["none", "none", "block"]}
              onClick={onNext}
              data-reach-dialog-nav="next"
              role="button"
              aria-label="next image"
              tabIndex={0}
              onKeyPress={handleEnterKeyPress(onNext)}
              onFocus={setNavFocus}
              onBlur={unsetNavFocus}
              sx={{
                ":focus": {
                  opacity: 1,
                  "& + [data-reach-dialog-nav]": {
                    opacity: 1,
                  },
                },
              }}
            />
          )}
        </Flex>
      </Content>
    </Overlay>
  );
}
