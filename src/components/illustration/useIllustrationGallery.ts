import type { IllustrationItem, IllustrationTag } from '@lib/types'
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  COLLECTION_DEFAULT,
  parseCollectionParam,
} from './illustrationUrlParams'

type UseIllustrationGalleryOptions = {
  collection?: IllustrationTag
  syncUrl?: boolean
}

export function useIllustrationGallery(
  illustrations: IllustrationItem[],
  { collection, syncUrl = true }: UseIllustrationGalleryOptions = {},
) {
  const [selectedCollection, setSelectedCollection] = useState<IllustrationTag>(
    collection ?? COLLECTION_DEFAULT,
  )
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // lock filter when a fixed collection is provided
  useEffect(() => {
    if (collection) setSelectedCollection(collection)
  }, [collection])

  const filtered = useMemo((): IllustrationItem[] => {
    return illustrations.filter((item) =>
      item.tags.includes(selectedCollection),
    ) as IllustrationItem[]
  }, [illustrations, selectedCollection])

  const syncStateFromUrl = useCallback(() => {
    if (typeof window === 'undefined' || !syncUrl) return
    const params = new URLSearchParams(window.location.search)
    const nextCollection = collection
      ? collection
      : parseCollectionParam(params.get('collection'))
    const imageParam = params.get('image')

    setSelectedCollection(nextCollection)

    const list = illustrations.filter((item) =>
      item.tags.includes(nextCollection),
    )
    if (imageParam && list.length > 0) {
      const idx = list.findIndex((item) => item.id === imageParam)
      if (idx !== -1) {
        setLightboxIndex(idx)
        setLightboxOpen(true)
        return
      }
    }
    setLightboxOpen(false)
  }, [illustrations, syncUrl, collection])

  useEffect(() => {
    if (!syncUrl) return
    syncStateFromUrl()
  }, [syncStateFromUrl, syncUrl])

  useEffect(() => {
    if (!syncUrl) return
    const handlePopState = () => syncStateFromUrl()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [syncStateFromUrl, syncUrl])

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
      if (!syncUrl) return
      const url = new URL(window.location.href)
      url.searchParams.delete('image')
      window.history.pushState({}, '', url)
    }
    el.addEventListener('close', handleClose)
    return () => el.removeEventListener('close', handleClose)
  }, [syncUrl])

  const updateCollection = useCallback(
    (next: IllustrationTag) => {
      setSelectedCollection(next)
      if (!syncUrl) return
      const url = new URL(window.location.href)
      url.searchParams.set('collection', next)
      window.history.pushState({}, '', url)
    },
    [syncUrl],
  )

  const openLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index)
      setLightboxOpen(true)
      if (!syncUrl) return
      const item = filtered[index]
      if (item) {
        const url = new URL(window.location.href)
        url.searchParams.set('image', item.id)
        window.history.pushState({}, '', url)
      }
    },
    [filtered, syncUrl],
  )

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    if (!syncUrl) return
    const url = new URL(window.location.href)
    url.searchParams.delete('image')
    window.history.pushState({}, '', url)
  }, [syncUrl])

  const commitSlideIndex = useCallback(
    (index: number) => {
      setLightboxIndex(index)
      if (!syncUrl) return
      const item = filtered[index]
      if (!item || typeof window === 'undefined') return
      const url = new URL(window.location.href)
      if (url.searchParams.get('image') === item.id) return
      url.searchParams.set('image', item.id)
      window.history.pushState({}, '', url)
    },
    [filtered, syncUrl],
  )

  const handleDialogClick = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) closeLightbox()
    },
    [closeLightbox],
  )

  return {
    dialogRef,
    filtered,
    selectedCollection,
    updateCollection,
    openLightbox,
    closeLightbox,
    commitSlideIndex,
    handleDialogClick,
    lightboxOpen,
    lightboxIndex,
  }
}
