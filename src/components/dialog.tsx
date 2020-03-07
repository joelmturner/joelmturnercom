/** @jsx jsx */
import { jsx } from "theme-ui"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useSwipeable } from "react-swipeable"
import "@reach/dialog/styles.css"
import { handleEnterKeyPress } from "../utils/a11y"
import { useState, useCallback } from "react"

type DialogProps = {
  className?: any;
  children: any;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const Dialog = ({ className, children, onClose, onPrev, onNext }: DialogProps) => {
  const [isNavFocused, setIsNavFocused] = useState<boolean>(false)
  const onSwipedRight = useCallback(function() {
      if (onPrev) {
          onPrev();
      }
  }, [onPrev])
  const onSwipedLeft = useCallback(function() {
      if (onNext) {
          onNext();
      }
  }, [onNext])

  const setNavFocus = useCallback(function() {
      setIsNavFocused(true);
  }, [])
  const unsetNavFocus = useCallback(function() {
      setIsNavFocused(false);
  }, [])

  const handlers = useSwipeable({
    onSwipedRight,
    onSwipedLeft,
    ...{
      delta: 10,
      preventDefaultTouchmoveEvent: true,
      trackTouch: true,
      trackMouse: true,
      rotationAngle: 0,
    },
  })
  return (
    <DialogOverlay sx={{ variant: "dialog.overlay" }} isOpen onDismiss={onClose} className={className} {...handlers}>
      <DialogContent
        aria-label="gallery of Instagram images"
        sx={{
          variant: "dialog.content",
          "[data-reach-dialog-overlay]": {
            background: "black",
            backgroundColor: "black",
          },
        }}
      >
        <div>{children}</div>
        <button
          sx={{
            bg: "muted",
            border: "none",
            padding: "0",
            margin: "0 0 1rem",
            width: "1.9rem",
            height: "1.9rem",
            fontSize: "1.3rem",
            color: "text",
            cursor: "pointer",
            position: "absolute",
            right: "-1.3rem",
            top: "-1.5rem",
            borderRadius: "50%",
          }}
          onClick={onClose}
        >
          X
        </button>
        {onNext && (
          <FaChevronRight
            sx={{
              variant: "dialog.nav",
              right: -4,
              opacity: isNavFocused ? 1 : 0,
            }}
            onClick={onNext}
            data-reach-dialog-nav="next"
            role="button"
            tabIndex={0}
            onKeyPress={handleEnterKeyPress(onNext)}
            onFocus={setNavFocus}
            onBlur={unsetNavFocus}
          />
        )}
        {onPrev && (
          <FaChevronLeft
            sx={{
              variant: "dialog.nav",
              left: -4,
              opacity: isNavFocused ? 1 : 0,
            }}
            onClick={onPrev}
            data-reach-dialog-nav="prev"
            role="button"
            tabIndex={0}
            onKeyPress={handleEnterKeyPress(onPrev)}
            onFocus={setNavFocus}
            onBlur={unsetNavFocus}
          />
        )}
      </DialogContent>
    </DialogOverlay>
  )
}

export default Dialog
