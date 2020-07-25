import base from "gatsby-theme-ui-blog/src/gatsby-plugin-theme-ui"
import prism from "@theme-ui/prism/presets/theme-ui"
import merge from "lodash.merge"
import typography from "./typography"
import { Theme } from "theme-ui"

const baseMerged = merge(base, typography)
const iconStyles = {
  ml: 2,
  fill: "text",
  color: "text",
  cursor: "pointer",
  transition: "fill 300ms, opacity 300ms",
  ":hover": {
    fill: "primary",
    color: "primary",
    opacity: 1,
  },
}

const switchIcon = {
  top: "50%",
  position: "absolute",
  transition: "transform 0.3s ease-in",
  alignItems: "center",
  display: "flex",
  width: "13px",
  height: "13px",
  svg: {
    fill: "textMuted",
    cursor: "pointer",
  },
}

const tabDefaults = {
  fontSize: 2,
  fontFamily: "body",
  color: "textMuted",
  bg: "backgroundSubtle",
  px: 2,
  py: 1,
  cursor: "pointer",
}

export default {
  initialColorMode: "light",
  useCustomProperties: true,
  ...baseMerged,
  fonts: {
    ...baseMerged.fonts,
    heading: "Roboto, sans-serif",
  },
  colors: {
    ...baseMerged.colors,
    text: "#575757",
    textMuted: "#777",
    background: "#ffffff",
    backgroundSubtle: "#f9f9f9",
    muted: "#eaeaea",
    primary: "#e7aa61",
    primaryHighlight: "#ffc689",
    secondary: "#a462ab",
    gray: "#777",
    accent: "#728fcb",
    overlay: "rgba(255,255,255,0.8)",
    highlightLine: "rgba(114, 143, 203, 0.075)",
    modes: {
      dark: {
        text: "#f2f2f2",
        textMuted: "#aaa",
        background: "#121212",
        backgroundSubtle: "#212121",
        muted: "#313131",
        primary: "#fc9",
        secondary: "#bab0ea",
        primaryHighlight: "#f9da9c",
        gray: "#aaa",
        accent: "#5cc6fa",
        overlay: "rgba(0,0,0,0.8)",
        highlightLine: "rgba(92, 198, 250, 0.075)",
      },
    },
  },
  styles: {
    ...baseMerged.styles,
    lineHeights: {
      ...baseMerged.styles.lineHeights,
      body: 1.7,
    },
    h1: {
      ...baseMerged.styles.h1,
      margin: "0",
    },
    h2: {
      ...baseMerged.styles.h2,
    //   margin: "0",
    mt: 3,
    mb: 2
    },
    h3: {
      ...baseMerged.styles.h3,
      color: "primary",
      mt: 3,
      mb: 2
    //   margin: "0 0 1em 0",
    },
    h5: {
      ...baseMerged.styles.h5,
      color: "primary",
      a: {
        color: "primary",
      },
    },
    h6: {
      ...baseMerged.styles.h6,
      mb: 1,
    },
    p: {
      ...baseMerged.styles.p,
      fontSize: 3,
      mb: 2,
    },
    li: {
      ...baseMerged.styles.li,
      fontSize: 3,
      "&.task-list-item": {
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        input: {
          fontSize: 3,
          mr: 2,
        },
      },
    },
    img: {
      ...baseMerged.styles.img,
    },
    a: {
      ...baseMerged.styles.a,
      transition: "color 300ms ease-in",
      ":hover": {
        color: "accent",
      },
    },
    root: {
      ...baseMerged.styles.root,
      "& *": {
        boxSizing: "border-box",
      },
      "main > div > a": {
        marginRight: "1rem",
        textDecoration: "none",
      },
    },
    blockquote: {
      ...baseMerged.styles.blockquote,
      borderLeft: "2px solid",
      borderColor: "accent",
      paddingLeft: 2,
      mt: 3,
    },
    pre: {
      ...prism,
      p: [1, 2],
      bg: "muted",
      float: "left",
      minWidth: "100%",
      overflow: "initial",
      mb: 3,
    },
    inlineCode: {
      ...baseMerged.styles.code,
      bg: "muted",
      color: "secondary",
      px: 1,
      py: "2px",
      fontSize: 1,
      borderRadius: "3px",
    },
    hr: {},
  },
  collection: {
    image: {
      s: {
        display: "grid",
        gridTemplateColumns: ["repeat(3, 1fr)", "repeat(auto-fill, minmax(142px, 1fr))"],
        gridGap: "0.25rem",
      },
      m: {
        display: "grid",
        gridTemplateColumns: ["repeat(2, 1fr)", "repeat(auto-fill, minmax(300px, 1fr))"],
        gridGap: "0.5rem",
      },
      l: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: [".5rem", "1rem"],
      },
    },
    post: {
      display: "grid",
      gridTemplateColumns: ["1fr", "repeat(auto-fill, minmax(350px, 1fr))"],
      gridGap: ["1rem", "2rem"],
    },
  },
  postCard: {
    title: {
      mb: 0,
      mt: 1,
      px: 1,
      py: 2,
      "a &": {
        color: "text",
        textDecoration: "none",
      },
    },
    img: {
      display: "flex",
      alignItems: "center",
      height: "auto",
    },
    excerpt: {
      px: 1,
      py: 1,
    },
  },
  buttons: {
    primary: {
      bg: "primary",
      boxShadow: (theme: Theme) => theme && theme.colors && `2px 2px 2px ${theme.colors.primary}`,
      px: 3,
      py: 2,
      color: "muted",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "monospace",
      fontSize: 1,
      border: (theme: Theme) => theme && theme.colors && `1px solid ${theme.colors.primaryHighlight}`,
      ":hover": {
        bg: "primaryMuted",
      },
    },
  },
  link: {
    color: "primary",
    transition: "color 300ms ease-in",
    ":hover": {
      color: "accent",
    },
  },
  nav: {
    button: {
      zIndex: "30",
      top: "1.5rem",
      right: "1rem",
      position: "absolute",
      bg: "transparent",
      width: "24px",
      height: "24px",
      border: "none",
      cursor: "pointer",
      display: ["block", "none"],
    },
    wrapper: {
      padding: [1, 2],
      margin: `0 auto`,
      maxWidth: 960,
      position: ["absolute", "relative"],
      zIndex: "20",
      left: ["0px", "initial"],
      top: ["0px", "initial"],
      width: ["100vw", "auto"],
      height: ["100vh", "auto"],
      alignItems: "center",
      flexDirection: ["column", "row"],
      justifyContent: ["center", "flex-end"],
      bg: ["muted", "rgba(0,0,0,0)"],
      display: ["none", "flex"],
    },
    wrapperActive: {
      variant: "nav.wrapper",
      display: ["flex", "flex"],
    },
    link: {
      mr: [0, 3],
      my: [3, 0],
      fontFamily: "body",
      fontSize: [4, 2],
      letterSpacing: 2,
      a: {
        textDecoration: "none",
        color: "textMuted",
      },
      "a:hover": {
        color: "accent",
      },
    },
  },
  dialog: {
    overlay: {
      bg: "overlay",
      zIndex: 100,
    },
    content: {
      //   margin: "10vh auto",
      background: "transparent",
      padding: 0,
      position: "relative",
      //   width: ["85vw", "75vh"],
      left: "50%",
      top: "50%",
      width: "100%",
      height: '100%',
      margin: 0,
      maxWidth: ["85vw", "960px"],
      maxHeight: ["85vw", "960px"],
      transform: "translate3d(-50%, -50%, 0)",
      ":hover [data-reach-dialog-nav]": {
        opacity: 1,
      },
    },
    nav: {
      //   bg: "muted",
      border: "none",
      padding: "0",
      margin: "0 0 1rem",
      width: "1.9rem",
      height: "1.9rem",
      fontSize: ".75rem",
      color: "text",
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      borderRadius: "50%",
      opacity: 0,
      transition: "opacity 300ms",
    },
  },
  icon: {
    ...iconStyles,
    opacity: 0.65,
    active: {
      ...iconStyles,
      opacity: 1,
    },
  },
  filter: {
    tab: {
      default: {
        ...tabDefaults,
      },
      active: {
        ...tabDefaults,
        color: "text",
        bg: "muted",
      },
    },
  },
  themeSwitch: {
    wrapper: {
      position: "relative",
      width: "55px",
      userSelect: "none",
      mr: [4, 0],
    },
    switch: {
      display: "none",
      ":checked + div": {
        bg: "muted",
        borderColor: "muted",
      },
      ":checked + div:before": {
        borderColor: "muted",
        transform: "translate3d(33px,-50%,0)",
      },
      ":checked svg": {
        display: "block",
        transform: "translate3d(3px,-50%,0)",
        top: "50%",
        position: "absolute",
        transition: "transform 0.3s ease-in",
        fill: "primary",
        color: "primary",
      },
    },
    label: {
      display: "block",
      overflow: "hidden",
      cursor: "pointer",
      height: "20px",
      padding: "0",
      lineHeight: "20px",
      border: (theme: Theme) => theme && theme.colors && `2px solid ${theme.colors.muted}`,
      borderRadius: "20px",
      bg: "muted",
      transition: "background 0.3s ease-in, border 0.3s ease-in",
      ":before": {
        content: '""',
        display: "block",
        width: "20px",
        height: "20px",
        margin: "0px",
        background: "#FFFFFF",
        position: "absolute",
        top: "50%",
        bottom: 0,
        transform: "translate3d(-5px,-50%,0)",
        border: (theme: Theme) => theme && theme.colors && `2px solid ${theme.colors.muted}`,
        borderRadius: "20px",
        transition: "background 0.3s ease-in, border 0.3s ease-in 0s, transform 0.3s ease-in",
      },
    },
    icon: {
      light: {
        ...switchIcon,
        transform: "translate3d(10px,-50%,0)",
      },
      dark: {
        ...switchIcon,
        transform: "translate3d(30px, -50%, 0)",
      },
    },
  },
  content: {
    wrapper: {
      py: 2,
      px: 1,
      mx: `auto`,
      maxWidth: 960,
    },
  },
  post: {
    ".gatsby-highlight": {
      position: "relative",
      webkitOverflowScrolling: "touch",
    },
    '.gatsby-highlight pre[class*="language-"]': {
      webkitOverflowScrolling: "touch",
    },
    '.gatsby-highlight pre[class*="language-"]::before': {
      background: "black",
      borderRadius: "0 0 0.25rem 0.25rem",
      color: "white",
      fontSize: "12px",
      letterSpacing: "0.025rem",
      padding: "0.1rem 0.5rem",
      position: "absolute",
      right: "1rem",
      textAlign: "right",
      textTransform: "uppercase",
      top: "1rem",
    },
    '.gatsby-highlight pre[class~="language-js"]::before': {
      content: '"js"',
      bg: "primaryHighlight",
      color: "background",
    },
    '.gatsby-highlight pre[class~="language-jsx"]::before': {
      content: '"jsx"',
      bg: "primary",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-bash"]::before': {
      content: '"bash"',
      bg: "accent",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-typescript"]::before': {
      content: '"typescript"',
      bg: "secondary",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-graphql"]::before': {
      content: '"graphql"',
      bg: "gray",
      color: "background",
    },
    '.gatsby-highlight pre[class~="language-css"]::before': {
      content: '"css"',
      bg: "accent",
      color: "muted",
    },
    link: {
      ...baseMerged.styles.a,
      fontSize: 3,
      transition: "color 200ms",
      ":hover": {
        color: "accent",
      },
      "&.active": {
        textDecoration: "none",
        color: "textMuted",
        ":hover": {
          color: "textMuted",
        },
        ":after": {
          content: '"<--"',
          ml: 2,
        },
      },
    },
  },
}
