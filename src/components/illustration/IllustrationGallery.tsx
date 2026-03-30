import { ILLUSTRATION_FILTER_OPTIONS } from '@lib/constants'
import type { IllustrationItem, IllustrationTag } from '@lib/types'
import { cn } from '@lib/utils'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useIllustrationGallery } from './useIllustrationGallery'

interface IllustrationGalleryProps {
  illustrations: IllustrationItem[]
}

export default function IllustrationGallery({
  illustrations,
}: IllustrationGalleryProps) {
  const {
    dialogRef,
    filtered,
    selectedCollection,
    updateCollection,
    openLightbox,
    closeLightbox,
    goToSlide,
    currentSlide,
    currentSlideUrl,
    handleDialogClick,
    handleKeyDown,
    lightboxImageSize,
  } = useIllustrationGallery(illustrations)

  return (
    <div className={cn('flex flex-col gap-4')}>
      <div className={cn('flex gap-2 items-center')}>
        <label htmlFor="collection-select" className="sr-only">
          Collections
        </label>
        <select
          id="collection-select"
          value={selectedCollection}
          onChange={(e) => updateCollection(e.target.value as IllustrationTag)}
          aria-label="Collections"
          className={cn(
            'rounded-md border border-border bg-surface-default px-3 py-2 cursor-pointer',
            'text-body text-primary focus:outline-none focus:ring-border focus:ring-brand',
          )}
        >
          {ILLUSTRATION_FILTER_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4')}
      >
        {filtered.map((image: IllustrationItem, index: number) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openLightbox(index)}
            className={cn(
              'block w-full text-left rounded-md overflow-hidden',
              'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
            )}
            aria-label={`View ${image.id}`}
          >
            <img
              src={image.url}
              alt={image.id}
              loading="lazy"
              width={400}
              height={400}
              className={cn(
                'w-full h-full object-cover rounded-md cursor-pointer',
              )}
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-label="Image lightbox"
        onClick={handleDialogClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'p-0 max-w-[90vw] w-full max-h-[90vh] overflow-visible',
          'bg-transparent shadow-none border-0',
          'backdrop:bg-black/70',
          'm-auto',
        )}
      >
        <div
          className={cn(
            'relative flex items-center justify-center min-h-0 pointer-events-none',
          )}
        >
          {currentSlide && (
            <>
              <img
                src={currentSlideUrl}
                alt={currentSlide.id}
                className={cn(
                  'max-w-full max-h-[85vh] w-auto h-auto object-contain',
                  'pointer-events-auto',
                )}
                width={lightboxImageSize}
                height={lightboxImageSize}
              />
              {filtered.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToSlide(-1)}
                    aria-label="Previous image"
                    className={cn(
                      'absolute left-2 top-1/2 -translate-y-1/2',
                      'w-10 h-10 rounded-full bg-surface-default text-primary flex items-center justify-center cursor-pointer pointer-events-auto',
                      'hover:bg-surface-default/70 focus:outline-none focus:ring-2 focus:ring-border',
                    )}
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(1)}
                    aria-label="Next image"
                    className={cn(
                      'absolute right-2 top-1/2 -translate-y-1/2',
                      'w-10 h-10 rounded-full bg-surface-default text-primary flex items-center justify-center cursor-pointer pointer-events-auto',
                      'hover:bg-surface-default/70 focus:outline-none focus:ring-2 focus:ring-border',
                    )}
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className={cn(
                  'absolute top-2 right-2 w-10 h-10 rounded-full',
                  'bg-surface-default text-primary flex items-center justify-center cursor-pointer pointer-events-auto hover:bg-surface-default/70',
                  'focus:outline-none focus:ring-2 focus:ring-border',
                )}
              >
                <X className="w-5 h-5" aria-hidden />
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  )
}
