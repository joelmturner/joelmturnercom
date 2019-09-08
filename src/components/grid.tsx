/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactElement } from "react"

type GridProps = {
  children: ReactElement | ReactElement[];
  gap?: string | number;
  columns?: string | string[];
  rows?: string | string[];
  className?: string;
}
export default ({ children, gap = 0, columns = "none", rows = "none", className }: GridProps) => {
  return (
    <div
      className={className}
      sx={{
        display: "grid",
        gridGap: gap,
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        pre: {
          mb: 0,
        },
      }}
    >
      {children}
    </div>
  )
}
