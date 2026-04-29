import type { IllustrationItem } from '@lib/types'
import { cn } from '@lib/utils'
import AutoHeight from 'embla-carousel-auto-height'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  forwardRef,
  type Ref,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { getLightboxImageUrl, LIGHTBOX_IMAGE_SIZE } from './cloudinaryUrls'

export type IllustrationLightboxCarouselHandle = {
  scrollPrev: () => void
  scrollNext: () => void
}

type IllustrationLightboxCarouselProps = {
  slides: IllustrationItem[]
  initialIndex: number
  onSlideChange: (index: number) => void
}

const IllustrationLightboxCarousel = forwardRef<
  IllustrationLightboxCarouselHandle,
  IllustrationLightboxCarouselProps
>(function IllustrationLightboxCarousel(
  { slides, initialIndex, onSlideChange },
  ref: Ref<IllustrationLightboxCarouselHandle>,
) {
  const plugins = useMemo(() => [AutoHeight()], [])
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: slides.length > 1,
      align: 'center',
      // default is 25; higher = slower, more noticeable scroll on prev/next and keyboard
      duration: 52,
    },
    plugins,
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useImperativeHandle(
    ref,
    () => ({
      scrollPrev,
      scrollNext,
    }),
    [scrollPrev, scrollNext],
  )

  const slideIds = slides.map((s: IllustrationItem) => s.id).join('|')
  const prevSlideIdsRef = useRef<string | null>(null)
  // first alignment after mount or slide set change: jump (no sweep). later: animate (e.g. popstate).
  const hasAlignedOnceRef = useRef(false)

  useLayoutEffect(() => {
    if (!emblaApi || slides.length === 0) return
    if (prevSlideIdsRef.current !== slideIds) {
      if (prevSlideIdsRef.current !== null) {
        emblaApi.reInit()
      }
      prevSlideIdsRef.current = slideIds
      hasAlignedOnceRef.current = false
    }

    const bounded = Math.min(Math.max(0, initialIndex), slides.length - 1)
    const selected = emblaApi.selectedScrollSnap()
    if (selected !== bounded) {
      const jump = !hasAlignedOnceRef.current
      emblaApi.scrollTo(bounded, jump)
    }
    hasAlignedOnceRef.current = true

    const onSelect = () => {
      onSlideChange(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, initialIndex, slideIds, onSlideChange, slides.length])

  const handleImgLoad = useCallback(() => {
    emblaApi?.reInit()
  }, [emblaApi])

  const navButtonClass = cn(
    'w-10 h-10 rounded-full bg-base-100 text-foreground flex items-center justify-center cursor-pointer',
    'hover:bg-base-100/70 focus:outline-none focus:ring-2 focus:ring-border',
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-3 items-center w-full max-w-full pointer-events-auto',
      )}
    >
      <div
        className={cn('embla--lightbox embla__viewport w-full')}
        ref={emblaRef}
      >
        <div className={cn('embla__container')}>
          {slides.map((slide: IllustrationItem) => (
            <div
              className={cn('embla__slide flex justify-center items-center')}
              key={slide.id}
            >
              <img
                src={getLightboxImageUrl(slide.id)}
                alt={slide.id}
                onLoad={handleImgLoad}
                className={cn(
                  'max-w-full max-h-[85vh] w-auto h-auto object-contain',
                )}
                width={LIGHTBOX_IMAGE_SIZE}
                height={LIGHTBOX_IMAGE_SIZE}
              />
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className={cn('flex gap-3 justify-center items-center')}>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous image"
            className={navButtonClass}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next image"
            className={navButtonClass}
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  )
})

export default IllustrationLightboxCarousel
