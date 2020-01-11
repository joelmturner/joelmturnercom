import { useEffect, useRef, useState } from "react"
import { getImageStep } from "../utils/utils"
import { GalleryImage } from "../components/gallery"
import { InstaNode } from "../pages"


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

export function useLocalStorage(key: string, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string | ((val: string) => string)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

export function useOnClickOutside(ref: any, handler: (e: any) => void) {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler]) // ... passing it into this hook. // ... but to optimize you can wrap handler in useCallback before ... // ... callback/cleanup to run every render. It's not a big deal ... // ... function on every render that will cause this effect ... // It's worth noting that because passed in handler is a new ... // Add ref and handler to effect dependencies
}

export function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)

  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}

export function useLightboxNav(list: any[]) {
  const [lightbox, setLightbox] = useLightbox()
  const rightArrow = useKeyPress("ArrowRight")
  const leftArrow = useKeyPress("ArrowLeft")
  const ref = useRef()
  const selectedImage: InstaNode = lightbox && lightbox.selectedImage
  const selectedIndex = list.indexOf(selectedImage)
  const nextImage = getImageStep(selectedIndex, list, "next")
  const prevImage = getImageStep(selectedIndex, list, "prev")
  const { showLightbox } = lightbox

  function setDir(dir: "prev" | "next") {
    if (dir === "prev") {
      setLightbox(prevImage)
    } else if (dir === "next") {
      setLightbox(nextImage)
    }
  }

  useOnClickOutside(ref, () => setLightbox(null))

  useEffect(() => {
    if (rightArrow && selectedImage) {
      setLightbox(nextImage)
    } else if (leftArrow && selectedImage) {
      setLightbox(prevImage)
    }
  }, [rightArrow, leftArrow])

  return { showLightbox, setLightbox, selectedImage, setDir }
}

const cachedScripts: string[] = []
export function useScript(src: string) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    // If cachedScripts array already includes src that means another instance ...
    // ... of this hook already loaded this script, so no need to load again.
    if (cachedScripts.includes(src)) {
      setState({
        loaded: true,
        error: false,
      })
    } else {
      cachedScripts.push(src)

      // Create script
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.async = true
      script.src = src

      // Script event listener callbacks for load and error
      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false,
        })
      }

      const onScriptError = () => {
        // Remove from cachedScripts we can try loading again
        const index = cachedScripts.indexOf(src)
        if (index >= 0) cachedScripts.splice(index, 1)
        script.remove()

        setState({
          loaded: true,
          error: true,
        })
      }

      script.addEventListener("load", onScriptLoad)
      script.addEventListener("error", onScriptError)

      // Add script to document body
      document.head.appendChild(script)

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener("load", onScriptLoad)
        script.removeEventListener("error", onScriptError)

        // not ideal, CodePen needs to run every time the page loads
        const index = cachedScripts.indexOf(src)
        if (index >= 0) cachedScripts.splice(index, 1)
        script.remove()
      }
    }
  }, [src]) // Only re-run effect if script src changes

  return [state.loaded, state.error]
}
