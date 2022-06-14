import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider, useColorMode } from "@chakra-ui/react";
import Layout from "../layouts/Layout";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "../src/components/MDXComponents";
import { css, Global } from "@emotion/react";
import { nightOwl, nightOwlLight } from "../lib/themes";

function GlobalStyle() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Global
        styles={css`
          ${colorMode === "light" ? nightOwlLight : nightOwl}
        `}
      />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true,
        }}
      >
        <MDXProvider components={MDXComponents}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
