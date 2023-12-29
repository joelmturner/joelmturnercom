import { css } from "styled-system/css";

export const selectInput = css({
  bgColor: { _light: "orange.100", _dark: "slate.700" },
  borderWidth: "1px",
  borderColor: { _light: "gray.300", _dark: "gray.600" },
  color: { _light: "gray.900", _dark: "gray.100" },
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
});

export const fadeIn = css({
  animationName: "fadeIn",

  // Optional attributes
  animationRepeat: "1", // can also be a number
  animationDuration: "1s",
  animationDelay: "1s",
});
