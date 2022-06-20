import '@fontsource/fira-sans';
import '@fontsource/fira-code';
import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider, useColorMode } from '@chakra-ui/react';
import Layout from '../layouts/Layout';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '../components/MDXComponents';
import { css, Global } from '@emotion/react';
import { nightOwl, nightOwlLight } from '../lib/themes';
import theme from '../lib/theme';
import Script from 'next/script';
import SEO from '../components/SEO';

function GlobalStyle() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? nightOwlLight : nightOwl}
        `}
      />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <SEO title="Howdy 👋🏻" />
      <ColorModeProvider
        options={{
          initialColorMode: 'dark',
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
