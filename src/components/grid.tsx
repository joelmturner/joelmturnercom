/** @jsx jsx */
import { jsx } from "theme-ui";
import { memo, ReactElement } from "react";

type GridProps = {
  children: ReactElement | ReactElement[];
  gap?: string | number;
  columns?: string | string[];
  rows?: string | string[];
  className?: string;
};

const Grid: React.FC<GridProps> = ({ children, gap = 0, columns = "none", rows = "none", className }) => {
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
  );
};

export default memo(Grid);
