import nightOwl from "@theme-ui/prism/presets/night-owl.json";
import merge from "lodash/merge";
import typography from "./typography";
import { Theme } from "theme-ui";

const diffHighlight = merge({}, nightOwl, {
  ".changed": {
    color: "hsl(70.5,76.9%,42.4%)",
  },
  ".deleted": {
    color: "deleted",
    textDecoration: "none!important",
  },
  ".inserted": {
    color: "inserted",
    textDecoration: "none!important",
  },
});

const baseMerged = merge({}, typography);
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
};

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
};

const tabDefaults = {
  fontSize: 2,
  fontFamily: "body",
  color: "textMuted",
  bg: "backgroundSubtle",
  px: 2,
  py: 1,
  cursor: "pointer",
};

export default {
  initialColorModeName: "light",
  useCustomProperties: true,
  useColorSchemeMediaQuery: true,
  ...baseMerged,
  fonts: {
    ...baseMerged.fonts,
    heading: "Roboto, sans-serif",
  },
  colors: {
    ...baseMerged.colors,
    text: "hsl(0, 0%, 34%)",
    textMuted: "hsl(0, 0%, 27%)",
    background: "hsl(0, 0%, 100%)",
    backgroundSubtle: "hsl(0, 0%, 98%)",
    muted: "hsl(0, 0%, 92%)",
    primary: "hsl(19, 83%, 44%)",
    primaryHighlight: "hsl(19, 83%, 44%)",
    secondary: "hsl(294, 27%, 45%)",
    gray: "hsl(0, 0%, 47%)",
    accent: "hsl(221, 28%, 50%)",
    overlay: "hsl(0,0%,100%, 80%)",
    highlightLine: "hsl(72.3,97.2%,28.4%, 7.5%)",
    modes: {
      dark: {
        text: "hsl(0, 0%, 95%)",
        textMuted: "hsl(0, 0%, 67%)",
        background: "hsl(0, 0%, 7%)",
        backgroundSubtle: "hsl(0, 0%, 13%)",
        muted: "hsl(0, 0%, 19%)",
        primary: "hsl(30, 100%, 80%)",
        deleted: "hsl(0, 85%, 32%)",
        inserted: "hsl(120, 85%, 32%)",
        secondary: "hsl(250, 58%, 80%)",
        primaryHighlight: "hsl(40, 89%, 79%)",
        gray: "hsl(0, 0%, 67%)",
        accent: "hsl(200, 94%, 67%)",
        overlay: "hsl(0, 0%, 0%, 80%)",
        highlightLine: "hsl(200, 94%, 67%, 8%)",
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
      mb: 2,
    },
    h3: {
      ...baseMerged.styles.h3,
      color: "primary",
      mt: 3,
      mb: 2,
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
      a: {
        ...baseMerged.styles.a,
        color: "primary",
        transition: "color 300ms ease-in",
        ":hover": {
          color: "accent",
        },
      },
    },
    li: {
      ...baseMerged.styles.li,
      fontSize: 3,
      mb: 1,
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
      color: "primary",
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
      ...diffHighlight,
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
        contentVisibility: "auto",
        containIntrinsicSize: "160px",
      },
      m: {
        display: "grid",
        gridTemplateColumns: ["repeat(2, 1fr)", "repeat(auto-fill, minmax(300px, 1fr))"],
        gridGap: "0.5rem",
        contentVisibility: "auto",
        containIntrinsicSize: "310px",
      },
      l: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: [".5rem", "1rem"],
        contentVisibility: "auto",
        containIntrinsicSize: "946px",
      },
    },
    post: {
      display: "grid",
      gridTemplateColumns: ["1fr", "repeat(auto-fill, minmax(350px, 1fr))"],
      gridGap: ["1rem", "2rem"],
      contentVisibility: "auto",
      containIntrinsicSize: "550px",
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
    ...baseMerged.styles.a,
    color: "primary",
    transition: "color 300ms ease-in",
    ":hover": {
      color: "accent",
    },
  },
  nav: {
    button: {
      zIndex: "30",
      top: ".9rem",
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
      bg: ["muted", "hsl(0, 0%, 0%, 0%)"],
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
      fontWeight: "bold",
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
      height: "100%",
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
      mt: 0,
    },
    '.gatsby-highlight pre[class*="language-"]::after': {
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
      top: 0,
    },
    '.gatsby-highlight pre[class~="language-js"]::after': {
      content: '"js"',
      bg: "primaryHighlight",
      color: "background",
    },
    '.gatsby-highlight pre[class~="language-jsx"]::after': {
      content: '"jsx"',
      bg: "primary",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-bash"]::after': {
      content: '"bash"',
      bg: "accent",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-typescript"]::after': {
      content: '"typescript"',
      bg: "secondary",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-graphql"]::after': {
      content: '"graphql"',
      bg: "gray",
      color: "background",
    },
    '.gatsby-highlight pre[class~="language-css"]::after': {
      content: '"css"',
      bg: "accent",
      color: "muted",
    },
    '.gatsby-highlight pre[class~="language-html"]::after': {
      content: '"html"',
      bg: "accent",
      color: "muted",
    },
    ".gatsby-highlight pre.language-html.svelte::after": {
      content: '"svelte"',
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
};
