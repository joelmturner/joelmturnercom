import { css, cx } from "styled-system/css";

export const selectInput = css({
  bgColor: "gray.50",
  borderWidth: "1px",
  borderColor: "gray.300",
  color: "gray.900",
  fontSize: "sm",
  lineHeight: "sm",
  rounded: "md",
  _focus: {
    borderColor: "blue.500",
    _dark: { borderColor: "blue.500" },
  },
  display: "block",
  w: "full",
  p: 2,
  _dark: {
    bgColor: "gray.700",
    borderColor: "gray.600",
    color: "white",
  },
});

export const fadeIn = css({
  animationName: "fadeIn",

  // Optional attributes
  animationRepeat: "1", // can also be a number
  animationDuration: "1s",
  animationDelay: "1s",
});
