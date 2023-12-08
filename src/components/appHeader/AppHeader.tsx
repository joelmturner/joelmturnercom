import Link from 'next/link';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Text } from '../Text';
import { Logo } from '../Logo';
import ThemeSwitch from '../ThemeSwitch';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from './constants';

export function AppHeader() {
  return (
    <Flex
      className={css({
        width: '100%',
        borderTop: '6px solid',
        borderTopColor: { _light: 'brand.100', _dark: 'brand.500' },
        p: 4,
      })}
    >
      <Flex
        className={css({ mx: 'auto', w: 'full', maxW: '4xl', justifyContent: 'space-between' })}
      >
        <Link href="/">
          <div className={css({ w: { base: '40vw', lg: '14vw' } })}>
            <Logo />
          </div>
        </Link>

        {/* desktop */}
        <div
          className={css({
            alignItems: 'center',
            gap: '2',
            justifyContent: 'space-between',
            display: { base: 'none', lg: 'flex' },
          })}
        >
          {NAV_LINKS.map((link) => (
            <Text
              fontWeight="semibold"
              className={css({
                color: { _light: 'brand.300', _dark: 'brand.500' },
              })}
              key={link.id}
            >
              <Link href={`/${link.id}`}>{link.label}</Link>
            </Text>
          ))}
          <ThemeSwitch />
        </div>
      </Flex>

      <MobileMenu />
    </Flex>
  );
}
