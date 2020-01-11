/** @jsx jsx */
import { jsx } from "theme-ui"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useSwipeable } from "react-swipeable"
import "@reach/dialog/styles.css"
import { buildHandleEnterKeyPress } from "../utils/a11y"
import { useState } from "react"

type DialogProps = {
  className?: any;
  children: any;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const Dialog = ({ className, children, onClose, onPrev, onNext }: DialogProps) => {
  const [isNavFocused, setIsNavFocused] = useState<boolean>(false)
  const handlers = useSwipeable({
    onSwipedRight: () => onPrev && onPrev(),
    onSwipedLeft: () => onNext && onNext(),
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
            onKeyPress={buildHandleEnterKeyPress(onNext)}
            onFocus={() => setIsNavFocused(true)}
            onBlur={() => setIsNavFocused(false)}
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
            onKeyPress={buildHandleEnterKeyPress(onPrev)}
            onFocus={() => setIsNavFocused(true)}
            onBlur={() => setIsNavFocused(false)}
          />
        )}
      </DialogContent>
    </DialogOverlay>
  )
}

export default Dialog
