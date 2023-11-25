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
      <body className={cx(inter.className, css({ bg: 'bg.default' }))}>
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
};
