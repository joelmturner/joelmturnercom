/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactElement } from "react"

type GridProps = {
  children: ReactElement;
  gap: string | number;
  columns: string;
  rows: string;
}
export default ({ children, gap = 0, columns = "none", rows = "none" }: GridProps) => {
  return (
    <div
      sx={{
        display: "grid",
        gridGap: gap,
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
      }}
    >
      {children}
    </div>
  )
}
