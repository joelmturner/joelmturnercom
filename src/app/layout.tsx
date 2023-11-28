import './globals.css';
import { Metadata } from 'next';
import { LightboxContextProvider } from 'src/hooks/useLightBox';
import { Inter } from 'next/font/google';
import { css, cx } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { AppHeader } from 'src/components/appHeader/AppHeader';
import { Providers } from './Providers';
import { AppFooter } from 'src/components/appFooter/AppFooter';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body
        className={cx(inter.className, css({ bg: { _light: 'bg.canvas', _dark: 'bg.default' } }))}
      >
        <Providers>
          <LightboxContextProvider>
            <Flex direction="column" gap="12" className={css({ w: 'full', h: 'full' })}>
              <AppHeader />
              <div className={css({ mx: 'auto', maxW: '3xl', px: { base: 4, md: 2, lg: 1 } })}>
                {children}
              </div>
              <AppFooter />
            </Flex>
          </LightboxContextProvider>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: '%s | Joel M Turner',
    default: 'Howdy 👋🏻',
  },
  description: 'Welcome to joelmturner',
  twitter: {
    card: 'summary_large_image',
    title: 'Joel M Turner',
    description: 'Welcome to joelmturner',
    site: '@joelmturner',
    creator: '@joelmturner',
    images: [
      {
        url: 'https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};
