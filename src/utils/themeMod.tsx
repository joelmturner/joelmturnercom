import theme from "../gatsby-plugin-theme-ui/index"
import { PrismTheme } from "prism-react-renderer"

const newTheme = (colorMode: "light" | "dark"): PrismTheme => {
  const colors = colorMode === "dark" ? theme.colors.modes[colorMode] : theme.colors
  return {
    plain: {
      backgroundColor: `var(--theme-ui-colors-primary, ${colors.backgroundSubtle})`,
      color: `var(--theme-ui-colors-accent, ${colors.accent})`,
    },
    styles: [
      {
        types: [
          "boolean",
          "entity",
          "url",
          "attr-value",
          "keyword",
          "control",
          "directive",
          "unit",
          "statement",
          "regex",
          "at-rule",
          "placeholder",
          "variable",
        ],
        style: {
          color: `var(--theme-ui-colors-primary, ${colors.primary})`,
        },
      },
      {
        types: ["comment", "prolog", "doctype", "cdata", "punctuation", "operator"],
        style: {
          color: `var(--theme-ui-colors-gray, ${colors.gray})`,
        },
      },
      {
        types: ["namespace"],
        style: {
          opacity: 0.7,
        },
      },
      {
        types: ["tag", "number"],
        style: {
          color: `var(--theme-ui-colors-primary, ${colors.primary})`,
        },
      },
      {
        types: ["property", "function", "template-string", "string"],
        style: {
          color: `var(--theme-ui-colors-secondary, ${colors.secondary})`,
        },
      },
      {
        types: ["tag-id", "selector", "atrule-id"],
        style: {
          color: `var(--theme-ui-colors-secondary, ${colors.secondary})`,
        },
      },
      {
        types: ["attr-name"],
        style: {
          color: `var(--theme-ui-colors-secondary, ${colors.secondary})`,
        },
      },
      {
        types: ["deleted"],
        style: {
          textDecorationLine: "line-through",
        },
      },
      {
        types: ["inserted"],
        style: {
          textDecorationLine: "underline",
        },
      },
      {
        types: ["italic"],
        style: {
          fontStyle: "italic",
        },
      },
      {
        types: ["important", "bold"],
        style: {
          fontWeight: "bold",
        },
      },
      {
        types: ["important"],
        style: {
          color: `var(--theme-ui-colors-secondary, ${colors.secondary})`,
        },
      },
    ],
  }
}
export default newTheme
