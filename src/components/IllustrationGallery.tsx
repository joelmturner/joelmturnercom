import { Cloudinary } from '@cloudinary/url-gen'
import { fit } from '@cloudinary/url-gen/actions/resize'
import { ILLUSTRATION_FILTER_OPTIONS } from '@lib/constants'
import type { IllustrationItem, IllustrationTag } from '@lib/types'
import { cn } from '@lib/utils'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const COLLECTION_DEFAULT: IllustrationTag = 'joelmturner_featured'
const DESKTOP_BREAKPOINT = 768
const LIGHTBOX_IMAGE_SIZE = 800

const cloudName =
  (import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string) || 'joelmturner'
const cld = new Cloudinary({
  cloud: { cloudName },
  url: { secure: true },
})

// build lightbox URL with url-gen; fit preserves aspect ratio (no crop)
function getLightboxImageUrl(publicId: string): string {
  return cld
    .image(publicId)
    .resize(fit().width(LIGHTBOX_IMAGE_SIZE).height(LIGHTBOX_IMAGE_SIZE))
    .toURL()
}

function parseCollectionParam(value: string | null): IllustrationTag {
  if (!value) return COLLECTION_DEFAULT
  if (value === 'featured') return 'joelmturner_featured'
  const option = ILLUSTRATION_FILTER_OPTIONS.find((o) => o.value === value)
  return option ? option.value : COLLECTION_DEFAULT
}

interface IllustrationGalleryProps {
  illustrations: IllustrationItem[]
}

export default function IllustrationGallery({
  illustrations,
}: IllustrationGalleryProps) {
  const [selectedCollection, setSelectedCollection] =
    useState<IllustrationTag>(COLLECTION_DEFAULT)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const filtered = useMemo(() => {
    const tag =
      selectedCollection === 'featured'
        ? 'joelmturner_featured'
        : selectedCollection
    return illustrations.filter((item) => item.tags.includes(tag))
  }, [illustrations, selectedCollection])

  const currentSlide = filtered[lightboxIndex] ?? null
  const currentSlideUrl = currentSlide
    ? getLightboxImageUrl(currentSlide.id)
    : ''

  const syncStateFromUrl = useCallback(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const collection = parseCollectionParam(params.get('collection'))
    const imageParam = params.get('image')

    setSelectedCollection(collection)

    const tag =
      (collection as unknown as string) === 'featured'
        ? 'joelmturner_featured'
        : collection
    const list = illustrations.filter((item) => item.tags.includes(tag))
    if (imageParam && list.length > 0) {
      const idx = list.findIndex((item) => item.id === imageParam)
      if (idx !== -1) {
        setLightboxIndex(idx)
        setLightboxOpen(true)
        return
      }
    }
    setLightboxOpen(false)
  }, [illustrations])

  useEffect(() => {
    syncStateFromUrl()
  }, [syncStateFromUrl])

  useEffect(() => {
    const handlePopState = () => syncStateFromUrl()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [syncStateFromUrl])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (lightboxOpen) {
      el.showModal()
    } else {
      el.close()
    }
  }, [lightboxOpen])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handleClose = () => {
      setLightboxOpen(false)
      const url = new URL(window.location.href)
      url.searchParams.delete('image')
      window.history.pushState({}, '', url)
    }
    el.addEventListener('close', handleClose)
    return () => el.removeEventListener('close', handleClose)
  }, [])

  const updateCollection = useCallback((collection: IllustrationTag) => {
    setSelectedCollection(collection)
    const url = new URL(window.location.href)
    url.searchParams.set('collection', collection)
    window.history.pushState({}, '', url)
  }, [])

  const openLightbox = useCallback(
    (index: number) => {
      if (
        typeof window !== 'undefined' &&
        window.innerWidth < DESKTOP_BREAKPOINT
      )
        return
      setLightboxIndex(index)
      setLightboxOpen(true)
      const item = filtered[index]
      if (item) {
        const url = new URL(window.location.href)
        url.searchParams.set('image', item.id)
        window.history.pushState({}, '', url)
      }
    },
    [filtered],
  )

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    const url = new URL(window.location.href)
    url.searchParams.delete('image')
    window.history.pushState({}, '', url)
  }, [])

  const goToSlide = useCallback(
    (delta: number) => {
      const next = (lightboxIndex + delta + filtered.length) % filtered.length
      setLightboxIndex(next)
      const item = filtered[next]
      if (item) {
        const url = new URL(window.location.href)
        url.searchParams.set('image', item.id)
        window.history.pushState({}, '', url)
      }
    },
    [lightboxIndex, filtered],
  )

  const handleDialogClick = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) closeLightbox()
    },
    [closeLightbox],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDialogElement>) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToSlide(-1)
      if (e.key === 'ArrowRight') goToSlide(1)
    },
    [lightboxOpen, closeLightbox, goToSlide],
  )

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
        {filtered.map((image, index) => (
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
                'w-full h-auto object-cover rounded-md cursor-pointer',
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
                width={LIGHTBOX_IMAGE_SIZE}
                height={LIGHTBOX_IMAGE_SIZE}
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
