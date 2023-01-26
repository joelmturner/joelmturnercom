import {
  Flex,
  Text,
  Link,
  Container,
  Box,
  useColorModeValue,
  chakra,
  VisuallyHidden,
} from '@chakra-ui/react';
import { IoLogoInstagram, IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io';
import { FaDev, FaMastodon } from 'react-icons/fa';
import { ReactNode } from 'react';

function SocialButton({
  children,
  label,
  href,
  rel,
}: {
  children: ReactNode;
  label: string;
  href: string;
  rel?: string;
}) {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      rel={rel}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}

export function Footer() {
  return (
    <Box
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      w="full"
      py={8}
    >
      <chakra.div mx="auto" maxW="4xl" px={4}>
        <Flex justifyContent="space-between" w="100%" alignItems="center">
          <Flex justifyContent="flex-start" gap={2}>
            <Text>
              © 2012-{new Date().getFullYear()}, built with{' '}
              <Link href="https://nextjs.org/" title="Next.js">
                Next.js
              </Link>{' '}
              and{' '}
              <Link href="https://chakra-ui.com/" title="Chakra UI">
                Chakra UI
              </Link>
            </Text>
          </Flex>
          <Flex gap={2} wrap="wrap" justifyContent="flex-end" maxW={['40vw', 'auto']}>
            <SocialButton href="https://www.instagram.com/joelmturner/" label="Instagram">
              <IoLogoInstagram />
            </SocialButton>
            <SocialButton href="https://twitter.com/joelmturner" label="twitter">
              <IoLogoTwitter />
            </SocialButton>
            <SocialButton href="https://linkedin.com/in/joelmturner" label="linkedIn">
              <IoLogoLinkedin />
            </SocialButton>
            <SocialButton href="https://github.com/joelmturner" label="github">
              <IoLogoGithub />
            </SocialButton>
            <SocialButton href="https://dev.to/joelmturner" label="joelmturner's DEV Profile">
              <FaDev />
            </SocialButton>
            <SocialButton
              rel="me"
              href="https://mas.to/@joelmturner"
              label="joelmturner's Mastodon Profile"
            >
              <FaMastodon />
            </SocialButton>
          </Flex>
        </Flex>
      </chakra.div>
    </Box>
  );
}
