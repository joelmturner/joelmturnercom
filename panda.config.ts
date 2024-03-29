import { defineConfig } from "@pandacss/dev";
import typographyPreset from "pandacss-preset-typography";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  lightningcss: true,

  presets: [
    "animated-pandacss",
    typographyPreset({ recipe: { notProse: true } }),
    "@pandacss/dev/presets",
  ],

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx,astro,svelte}",
    "./pages/**/*.{js,jsx,ts,tsx,astro,svelte}",
  ],

  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },

  globalCss: {
    body: {
      fontFamily: "var(--font-fira-sans)",
      margin: 0,
      padding: 0,
      textAlign: "left",
      backgroundSize: "100% 600px",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      color: "primary",
      fontSize: "md",
      lineHeight: "normal",
      bg: {
        _light: "orange.50",
        _dark: "slate.900",
      },
    },
    "h1, h2, h3, h4, h5, h6": {
      margin: "0 0 0.5rem 0",
      color: "primary",
      lineHeight: "1.2",
    },
    h1: {
      fontSize: "4xl",
      fontWeight: "700",
    },
    h2: {
      fontSize: "3xl",
      fontWeight: "700",
    },
    h3: {
      fontSize: "2xl",
      fontWeight: "700",
    },
    h4: {
      fontSize: "xl",
      fontWeight: "700",
    },
    h5: {
      fontSize: "l",
      fontWeight: "700",
    },
    h6: {
      fontSize: "m",
      fontWeight: "700",
    },
    "strong, b": {
      fontWeight: "700",
    },
    "p, ul, ol": {
      m: 0,
      mb: 3,
    },
    ".prose a": {
      color: "brand.400",
      textDecoration: "underline",
      _hover: {
        textDecoration: "none",
      },
    },
    code: {
      py: 1,
      px: 2,
      bg: {
        _light: "rose.100",
        _dark: "gray.700",
      },
      borderRadius: "md",
      fontFamily: "var(--font-fira-code)",
    },
    pre: {
      padding: 5,
      borderRadius: "md",
    },
    "pre > code": {
      all: "unset",
    },
    ".expressive-code + .expressive-code": {
      mt: 8,
    },
  },

  outExtension: "js",

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          firaCode: { value: "var(--font-fira-code)" },
          firaSans: { value: "var(--font-fira-sans)" },
        },
      },
      semanticTokens: {
        shadows: {
          round: {
            value: {
              _light: `inset 0 0 0.5px 1px hsla(10, 60%, 100%, 0.075),
                          /* shadow ring 👇 */
                          0 0 0 1px hsla(10, 60%, 60%, 0.05),
                          /* multiple soft shadows 👇 */
                          0 0.3px 0.4px hsla(10, 60%, 60%, 0.02),
                          0 0.9px 1.5px hsla(10, 60%, 60%, 0.045),
                          0 3.5px 6px hsla(10, 60%, 60%, 0.09);`,
              _dark: `inset 0 0 0.5px 1px hsla(210, 70%, 100%, 0.15),
                        /* shadow ring 👇 */
                        0 0 0 1px hsla(210, 70%, 50%, 0.1),
                        /* multiple soft shadows 👇 */
                        0 0.3px 0.4px hsla(210, 70%, 50%, 0.04),
                        0 0.9px 1.5px hsla(210, 70%, 50%, 0.09),
                        0 3.5px 6px hsla(210, 70%, 50%, 0.18);`,
            },
          },
        },
        colors: {
          primary: {
            value: { _light: "black", _dark: "white" },
          },
          accent: {
            value: { _light: "#f76942", _dark: "#97CDFF" },
          },
          brand: {
            100: {
              value: { _light: "#FFE5A3", _dark: "#CBF6FF" },
            },
            200: {
              value: { _light: "#FFCBA5", _dark: "#97CDFF" },
            },
            300: {
              value: { _light: "#FFA8A3", _dark: "#B7A5FF" },
            },
            400: {
              value: { _light: "#f76942", _dark: "#f76942" },
            },
          },
          // Or whatever name you've set as the semantic tokens
          // prefix or recipe name
          prose: {
            body: {
              value: {
                _light: "{colors.slate.700}",
                _dark: "{colors.slate.300}",
              },
            },
            heading: {
              value: {
                _light: "{colors.slate.900}",
                _dark: "{colors.slate.100}",
              },
            },
            lead: {
              value: {
                _light: "{colors.slate.600}",
                _dark: "{colors.slate.300}",
              },
            },
            link: {
              value: "{colors.accent}",
            },
            bold: {
              value: {
                _light: "{colors.slate.900}",
                _dark: "{colors.slate.100}",
              },
            },
            counter: {
              value: {
                _light: "{colors.slate.500}",
                _dark: "{colors.slate.400}",
              },
            },
            bullet: {
              value: {
                _light: "{colors.slate.300}",
                _dark: "{colors.slate.600}",
              },
            },
            hrBorder: {
              value: {
                _light: "{colors.slate.200}",
                _dark: "{colors.slate.600}",
              },
            },
            quote: {
              value: {
                _light: "{colors.slate.900}",
                _dark: "{colors.slate.100}",
              },
            },
            quoteBorder: {
              value: {
                _light: "{colors.slate.200}",
                _dark: "{colors.slate.800}",
              },
            },
            caption: {
              value: {
                _light: "{colors.slate.500}",
                _dark: "{colors.slate.400}",
              },
            },
            kbd: {
              value: {
                _light: "{colors.slate.900}",
                _dark: "{colors.slate.100}",
              },
            },
            kbdShadow: {
              // Expects an RGB value
              value: { _light: "0 0 0", _dark: "255 255 255" },
            },
            code: {
              value: {
                _light: "{colors.slate.900}",
                _dark: "{colors.violet.300}",
              },
            },
            preCode: {
              value: {
                _light: "{colors.slate.200}",
                _dark: "{colors.slate.800}",
              },
            },
            preBg: {
              value: {
                _light: "{colors.slate.800}",
                _dark: "{colors.slate.200}",
              },
            },
            thBorder: {
              value: {
                _light: "{colors.slate.300}",
                _dark: "{colors.slate.600}",
              },
            },
            tdBorder: {
              value: {
                _light: "{colors.slate.200}",
                _dark: "{colors.slate.800}",
              },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
