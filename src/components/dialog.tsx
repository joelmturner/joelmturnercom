/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import * as React from "react"
import { Dialog as ReachDialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import css from "@styled-system/css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

type DialogProps = {
  className?: any
  children: any
  maxWidth?: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

const Dialog = ({
  className,
  children,
  onClose,
  maxWidth,
  onPrev,
  onNext,
}: DialogProps) => (
  <ReachDialog
    className={className}
    sx={{
      variant: "dialog.overlay",
      maxWidth: maxWidth ? maxWidth : "60vw",
    }}
    onDismiss={onClose}
  >
    <span>{children}</span>
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
        }}
        onClick={onNext}
        data-reach-dialog-nav="next"
      />
    )}
    {onPrev && (
      <FaChevronLeft
        sx={{
          variant: "dialog.nav",
          left: -4,
        }}
        onClick={onPrev}
        data-reach-dialog-nav="prev"
      />
    )}
  </ReachDialog>
)

export default Dialog
