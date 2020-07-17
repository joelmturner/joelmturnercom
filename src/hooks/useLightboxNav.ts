import useKeypress from "./useKeypress"
import { useRef, useEffect, useCallback } from "react"
import useOnClickOutside from "./useOnClickOutside"
import useLightbox from "./useLightbox"
import { getImageStep } from "../utils/utils"

export function useLightboxNav(list: any[]) {
    const [{showLightbox, selectedImage = null}, setLightbox] = useLightbox()
    const ref = useRef()
    const currentIndex = useRef<number>(-1);

    // controls
    const rightArrow = useKeypress("ArrowRight")
    const leftArrow = useKeypress("ArrowLeft")

    // get prev and next images
    const selectedIndex = list.indexOf(selectedImage)
    const nextImage = getImageStep(selectedIndex, list, "next")
    const prevImage = getImageStep(selectedIndex, list, "prev")
  
    function setDir(dir: "prev" | "next") {
      if (dir === "prev") {
        setLightbox(prevImage)
      } else if (dir === "next") {
        setLightbox(nextImage)
      }
    }

    const emptyLightbox = useCallback(() => {setLightbox(null)}, [setLightbox])
    useOnClickOutside(ref, emptyLightbox)
  
    useEffect(() => {
      if (selectedImage) {
          if (currentIndex.current === selectedIndex) {
              if (rightArrow) {
              setLightbox(nextImage)
            } else if (leftArrow) {
              setLightbox(prevImage)
            }
          }
        currentIndex.current = selectedIndex;
      }
      
    }, [rightArrow, leftArrow, selectedImage, nextImage, prevImage, setLightbox, selectedIndex])
  
    return { showLightbox, setLightbox, selectedImage, setDir }
  }

  export default useLightboxNav;