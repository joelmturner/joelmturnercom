import { css, cva } from "styled-system/css";

export const galleryGrid = cva({
  base: {
    display: "grid",
    gap: 2,
    w: "full",
    containIntrinsicSize: "160px",
    contentVisibility: "auto",
  },
  variants: {
    cols: {
      3: { gridTemplateColumns: "repeat(3, 1fr)" },
      2: { gridTemplateColumns: "repeat(2, 1fr)" },
      1: { gridTemplateColumns: "repeat(1, minmax(200px, 1fr))" },
    },
  },
});

export const gridButtonStyles = css({
  "& > svg": {
    h: "6",
    w: "6",
    mb: "1.5",
  },
  cursor: "pointer",
  color: { _light: "gray.700", _dark: "gray.400" },
  _hover: {
    color: "accent",
  },
  "&.active": {
    color: "accent",
  },
});
