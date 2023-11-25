import { useCallback, useRef } from 'react';
import { Portal } from '@ark-ui/react';
import { wrap } from '@popmotion/popcorn';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, XIcon } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { useKeypressSimple, useOnClickOutside } from '../hooks';
import { useLightBoxContext } from '../hooks/useLightBox';
import { IllustrationItem } from '../lib/types';
import { handleEnterKeyPress } from '../utils/a11y';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Dialog } from './Dialog';

type DialogProps = {
  images: IllustrationItem[];
  offset: number;
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
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Lightbox({ images, offset = -1 }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { lightbox, setLightbox } = useLightBoxContext();

  const direction = lightbox.direction ?? 0;
  const page = lightbox.index ?? offset;
  const isOpen = offset > -1;

  const handleLightboxUpdate = useCallback(
    (index: -1 | 0 | 1) => {
      setLightbox((prevState) => ({
        ...prevState,
        index: prevState.index + index,
        direction: index,
      }));
    },
    [setLightbox]
  );

  const handleClose = useCallback(() => {
    setLightbox((prevState) => ({ ...prevState, index: -1, direction: 0 }));
  }, [setLightbox]);

  const paginate = useCallback(
    (newDirection: -1 | 0 | 1) => {
      handleLightboxUpdate(newDirection);
    },
    [handleLightboxUpdate]
  );

  const onNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const onPrev = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const handleDragEnd = useCallback(
    (e, { offset, velocity }) => {
      const swipe = swipePower(offset.x, velocity.x);

      if (swipe < -swipeConfidenceThreshold) {
        paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1);
      }
    },
    [paginate]
  );

  // handle key presses
  useKeypressSimple('ArrowRight', onNext, [page]);
  useKeypressSimple('ArrowLeft', onPrev, [page]);

  const imageIndex = wrap(0, images.length, page);
  useOnClickOutside(ref, handleClose);

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner top={0} ref={ref}>
          <Dialog.Content
            className={css({
              position: 'relative',
              '&:hover [data-dialog-nav]': {
                opacity: 1,
              },
            })}
          >
            <Stack gap="8" p="6" w="85svh" h="85svh">
              <div
                className={css({
                  position: 'relative',
                  w: 'full',
                  h: 'full',
                  m: '0 auto',
                  overflow: 'hidden',
                })}
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
                    style={{
                      y: '0%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={handleDragEnd}
                  >
                    <CldImage
                      src={images[imageIndex]?.url}
                      alt={'full size page'}
                      width={700}
                      height={700}
                      sizes="100vw"
                      style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              {onPrev && (
                <Icon
                  onClick={onPrev}
                  data-dialog-nav="prev"
                  role="button"
                  aria-label="previous image"
                  tabIndex={0}
                  onKeyPress={handleEnterKeyPress(onPrev)}
                  className={css({
                    position: 'absolute',
                    border: 'none',
                    padding: '0',
                    margin: '0 0 1rem',
                    width: '1.9rem',
                    height: '1.9rem',
                    fontSize: '.75rem',
                    color: 'fg.default',
                    cursor: 'pointer',
                    top: '50%',
                    borderRadius: '50%',
                    transition: 'opacity 300ms',
                    left: '-10',
                    opacity: '0',
                    display: { base: 'none', lg: 'block' },
                    _focus: {
                      opacity: 1,
                      '& ~ [data-dialog-nav]': {
                        opacity: 1,
                      },
                    },
                  })}
                >
                  <ChevronLeft />
                </Icon>
              )}
              {onNext && (
                <Icon
                  onClick={onNext}
                  data-dialog-nav="next"
                  role="button"
                  aria-label="next image"
                  tabIndex={0}
                  onKeyPress={handleEnterKeyPress(onNext)}
                  className={css({
                    position: 'absolute',
                    border: 'none',
                    padding: '0',
                    margin: '0 0 1rem',
                    width: '1.9rem',
                    height: '1.9rem',
                    fontSize: '.75rem',
                    color: 'fg.default',
                    cursor: 'pointer',
                    top: '50%',
                    borderRadius: '50%',
                    transition: 'opacity 300ms',
                    right: '-10',
                    opacity: '0',
                    display: { base: 'none', lg: 'block' },
                    _focus: {
                      opacity: 1,
                      '& + [data-dialog-nav]': {
                        opacity: 1,
                      },
                    },
                  })}
                >
                  <ChevronRight />
                </Icon>
              )}
            </Stack>
            <Dialog.CloseTrigger asChild position="absolute" top="0" right="0">
              <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
                <XIcon />
              </IconButton>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
