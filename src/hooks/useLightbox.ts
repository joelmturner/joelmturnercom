import { GalleryImage } from "../components/gallery"
import { useState } from "react"

type Lightbox = {
    showLightbox: boolean;
    selectedImage: any;
  }
  
  export function useLightbox(): [Lightbox, (image: GalleryImage | null) => void] {
    const [showLightbox, setShowLightbox] = useState(false)
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  
    const setLightbox = (image: GalleryImage | null): void => {
      if (image === null) {
        setShowLightbox(false)
        return
      }
      setShowLightbox(true)
      setSelectedImage(image)
    }
  
    const lightbox = { showLightbox, selectedImage }
  
    return [lightbox, setLightbox]
  }

  export default useLightbox