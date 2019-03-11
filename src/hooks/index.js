// @flow
import { useEffect, useRef, useState } from 'react'

type Lightbox = {
 showLightbox: boolean,
 selectedImage: HTMLElement,
}

export function useLightbox(): [Lightbox, (image: HTMLElement | null) => void] {
 const [showLightbox, setShowLightbox] = useState(false)
 const [selectedImage, setSelectedImage] = useState(false)

 const setLightbox = image => {
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
 const [storedValue, setStoredValue] = useState(() => {
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
 const setValue = (value: string | (() => void)) => {
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

export function useOnClickOutside(ref, handler) {
 useEffect(
  () => {
   const listener = event => {
    // Do nothing if clicking ref's element or descendent elements
    if (!ref.current || ref.current.contains(event.target)) {
     return
    }

    handler(event)
   }

   document.addEventListener('mousedown', listener)
   document.addEventListener('touchstart', listener)

   return () => {
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
   }
  },
  // Add ref and handler to effect dependencies
  // It's worth noting that because passed in handler is a new ...
  // ... function on every render that will cause this effect ...
  // ... callback/cleanup to run every render. It's not a big deal ...
  // ... but to optimize you can wrap handler in useCallback before ...
  // ... passing it into this hook.
  [ref, handler]
 )
}

export function useKeyDown(key, callback) {
 useEffect(() => {
  const handler = function(event) {
   if (event.key === key) {
    callback()
   }
  }
  window.addEventListener('keydown', handler)
  return () => {
   window.removeEventListener('keydown', handler)
  }
 }, [])
}

let cachedScripts = []
export function useScript(src) {
 // Keeping track of script loaded and error state
 const [state, setState] = useState({
  loaded: false,
  error: false,
 })

 useEffect(
  () => {
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
    let script = document.createElement('script')
    script.type = 'text/javascript'
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

    script.addEventListener('load', onScriptLoad)
    script.addEventListener('error', onScriptError)

    // Add script to document body
    document.head.appendChild(script)

    // Remove event listeners on cleanup
    return () => {
     script.removeEventListener('load', onScriptLoad)
     script.removeEventListener('error', onScriptError)

     // not ideal, CodePen needs to run evertime the page loads
     const index = cachedScripts.indexOf(src)
     if (index >= 0) cachedScripts.splice(index, 1)
     script.remove()
    }
   }
  },
  [src] // Only re-run effect if script src changes
 )

 return [state.loaded, state.error]
}
