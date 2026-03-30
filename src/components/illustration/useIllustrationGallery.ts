import type { IllustrationItem, IllustrationTag } from '@lib/types'
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { getLightboxImageUrl, LIGHTBOX_IMAGE_SIZE } from './cloudinaryUrls'
import {
  COLLECTION_DEFAULT,
  parseCollectionParam,
} from './illustrationUrlParams'

export const DESKTOP_BREAKPOINT = 768

export function useIllustrationGallery(illustrations: IllustrationItem[]) {
  const [selectedCollection, setSelectedCollection] =
    useState<IllustrationTag>(COLLECTION_DEFAULT)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const filtered = useMemo((): IllustrationItem[] => {
    return illustrations.filter((item) =>
      item.tags.includes(selectedCollection),
    ) as IllustrationItem[]
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

    const list = illustrations.filter((item) => item.tags.includes(collection))
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

  return {
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
    lightboxImageSize: LIGHTBOX_IMAGE_SIZE,
  }
}
