import Link from 'next/link';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Text } from '../Text';
import { IconButton } from '../IconButton';
import { SOCIAL_LINKS } from './constants';

export function AppFooter() {
  return (
    <div
      className={css({
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: 'bg.emphasized',
        w: 'full',
        py: 8,
      })}
    >
      <div
        className={css({
          mx: 'auto',
          maxW: '4xl',
          px: 4,
        })}
      >
        <Flex justifyContent="space-between" w="100%" alignItems="center">
          <Text>
            © 2012-{new Date().getFullYear()}, built with{' '}
            <Link href="https://nextjs.org/" title="Next.js">
              Next.js
            </Link>
            {', '}
            <Link href="https://panda-css.com/" title="Panda CSS">
              Panda CSS
            </Link>
            {`, and `}
            <Link href="https://park-ui.com/" title="Park UI">
              Park UI
            </Link>
          </Text>

          <Flex gap={2} wrap="wrap" justify="flex-end" maxW={{ base: '40vw', md: 'auto' }}>
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <IconButton variant="ghost" key={href}>
                <Link href={href}>{icon}</Link>
              </IconButton>
            ))}
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
