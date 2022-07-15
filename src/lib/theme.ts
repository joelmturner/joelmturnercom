import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Fira Sans", sans-serif',
  },
  colors: {
    brand: {
      dark: {
        100: '#CBF6FF',
        200: '#97CDFF',
        300: '#B7A5FF',
      },
      light: {
        100: '#FFE5A3',
        200: '#FFCBA5',
        300: '#FFA8A3',
        400: '#f76942',
      },
    },
  },
});

export default theme;
