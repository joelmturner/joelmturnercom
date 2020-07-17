type HandleKeyPress = (
  onClick: React.EventHandler<React.MouseEvent | React.KeyboardEvent>
) => React.KeyboardEventHandler<HTMLElement | SVGElement>

// attach to a onKeyPress to handle Enter keyboard clicks in the same way as onClicks
export const handleEnterKeyPress: HandleKeyPress = onClick => event => {
    event.preventDefault();
  if (event.key === "Enter") {
    onClick(event)
  }
}
