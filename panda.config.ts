import { defineConfig, defineGlobalStyles, defineSemanticTokens } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';
import { nightOwlDark, nightOwlLight } from './src/lib/themes';

const globalCss = defineGlobalStyles({
  ...nightOwlLight,
  ...nightOwlDark,
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'orange',
      grayColor: 'sage',
      borderRadius: 'sm',
    }),
  ],

  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
  },

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            100: { value: '#FFE5A3' },
            200: { value: '#FFCBA5' },
            300: { value: '#FFA8A3' },
            400: { value: '#f76942' },
            500: { value: '#CBF6FF' },
            600: { value: '#97CDFF' },
            700: { value: '#B7A5FF' },
          },
        },
      },
    },
  },

  globalCss,

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
});
