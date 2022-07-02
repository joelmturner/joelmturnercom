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
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

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
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ColorModeProvider
        options={{
          initialColorMode: 'dark',
          useSystemColorMode: true,
        }}
      >
        <MDXProvider components={MDXComponents}>
          <DefaultSeo
            title="Howdy 👋🏻"
            titleTemplate="%s | Joel M Turner"
            defaultTitle="Joel M Turner"
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'https://joelmturner.com/',
              site_name: 'Joel M. Turner',
              images: [
                {
                  url: 'https://res.cloudinary.com/joelmturner/joel-turner.jpg',
                  secureUrl: 'https://res.cloudinary.com/joelmturner/joel-turner.jpg',
                },
              ],
            }}
            twitter={{
              handle: '@joelmturner',
              site: '@joelmturner',
              cardType: 'summary_large_image',
            }}
          />
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
