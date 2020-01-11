type HandleKeyPress = (onClick: () => void) => ({ key }: React.KeyboardEvent<HTMLElement | SVGElement>) => void;

export const buildHandleEnterKeyPress: HandleKeyPress = (onClick: () => void) => ({ key }) => {
  if (key === "Enter") {
    onClick()
  }
}
