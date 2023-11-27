'use client';
import { Drawer } from '../Drawer';
import { Menu, XIcon } from 'lucide-react';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { Portal } from '@ark-ui/react';
import { css } from 'styled-system/css';
import { NAV_LINKS } from './constants';
import Link from 'next/link';
import { Flex } from 'styled-system/jsx';
import ThemeSwitch from '../ThemeSwitch';

export function MobileMenu() {
  return (
    <div className={css({ display: { base: 'block', lg: 'none' } })}>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <IconButton variant="ghost">
            <Menu />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>
                  <ThemeSwitch />
                </Drawer.Title>
                <Drawer.CloseTrigger asChild position="absolute" top="3" right="4">
                  <IconButton variant="ghost">
                    <XIcon />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <Flex direction="column" alignItems="flex-end" gap={4}>
                  {NAV_LINKS.map((link) => (
                    <Text
                      fontWeight="semibold"
                      textStyle="3xl"
                      className={css({
                        color: { _light: 'brand.300', _dark: 'brand.500' },
                      })}
                      key={link.id}
                    >
                      <Link href={link.id}>{link.label}</Link>
                    </Text>
                  ))}
                </Flex>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </div>
  );
}
