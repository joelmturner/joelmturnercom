import React, { memo, useCallback, useMemo } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  Link,
  Text,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/router';

function NavLink({ slug, label }: { slug: string; label: string }) {
  return (
    <Link as={NextLink} href={`/${slug}`} _hover={{ textDecoration: 'none' }}>
      {label}
    </Link>
  );
}

const MemoizedNavLink = memo(NavLink);

const NAV_LINKS = [
  { id: 'about', component: <MemoizedNavLink slug="about" label="About" /> },
  { id: 'blog', component: <MemoizedNavLink slug="blog" label="Blog" /> },
  { id: 'illustration', component: <MemoizedNavLink slug="illustration" label="Illustration" /> },
  { id: 'til', component: <MemoizedNavLink slug="til" label="TIL" /> },
  { id: 'uses', component: <MemoizedNavLink slug="uses" label="Uses" /> },
];

export function Header() {
  const { toggleColorMode: toggleMode, colorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef<HTMLHeadElement>();
  const mobileNav = useDisclosure();
  const navLinkColor = useColorModeValue('brand.light.300', 'brand.dark.100');
  const navLinkHoverColor = useColorModeValue('brand.light.200', 'brand.dark.200');

  const router = useRouter();
  const activeRootSlug = router.route.split('/')?.[1] ?? '';

  const handleMobileNavClick = useCallback(() => {
    mobileNav.onClose();
  }, [mobileNav]);

  const logo = useMemo(() => {
    return colorMode === 'light'
      ? `https://res.cloudinary.com/joelmturner/image/upload/v1673573341/jmt-logo-light-500w_2_pmadzj.png`
      : `https://res.cloudinary.com/joelmturner/image/upload/v1673573341/jmt-logo-dark-500w_2_pxay5e.png`;
  }, [colorMode]);

  const MobileNavContent = React.useMemo(
    () => (
      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? 'flex' : 'none'}
        flexDirection="column"
        p={5}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
        zIndex={5}
      >
        <CloseButton
          aria-label="Close menu"
          justifySelf="self-start"
          alignSelf="flex-end"
          onClick={mobileNav.onClose}
        />
        {NAV_LINKS.map((link) => (
          <Button key={link.id} w="full" variant="ghost" onClick={handleMobileNavClick}>
            {link.component}
          </Button>
        ))}
      </VStack>
    ),
    [bg, handleMobileNavClick, mobileNav.isOpen, mobileNav.onClose]
  );

  return (
    <chakra.header
      ref={ref}
      transition="box-shadow 0.2s"
      bg={bg}
      borderTop="6px solid"
      borderTopColor={useColorModeValue('brand.light.100', 'brand.dark.100')}
      w="full"
      overflowY="hidden"
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <chakra.div h="4.5rem" mx="auto" maxW="4xl">
        <Flex w="full" h="full" px={4} alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <Link href="/">
              <HStack cursor="pointer">
                <Box width={['40vw', '40vw', '14vw']}>
                  <CldImage
                    src={logo}
                    alt="joelmturner pyramid logo"
                    width={464}
                    height={80}
                    loading="eager"
                    sizes="(max-width: 480px) 40vw, 14vw"
                  />
                </Box>
              </HStack>
            </Link>
          </Flex>
          <Flex>
            <HStack spacing={5} display={{ base: 'none', md: 'flex' }}></HStack>
          </Flex>
          <Flex
            justify="flex-end"
            align="center"
            color="gray.400"
            display={{
              base: 'none',
              md: 'flex',
            }}
          >
            {NAV_LINKS.map((link) => (
              <Text
                key={link.id}
                bg={bg}
                color={navLinkColor}
                display="inline-flex"
                alignItems="center"
                fontSize="md"
                fontWeight="bold"
                _hover={{ color: navLinkHoverColor }}
                transition="color 150ms"
                px={3}
                py={2}
                textDecoration={activeRootSlug === link.id ? 'underline' : 'none'}
                textUnderlineOffset="5px"
                textDecorationThickness="3px"
              >
                {link.component}
              </Text>
            ))}
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color={navLinkColor}
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </Flex>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
            fontSize="20px"
            color={useColorModeValue('brand.light.200', 'inherit')}
            variant="ghost"
            icon={<AiOutlineMenu />}
            onClick={mobileNav.onOpen}
          />
        </Flex>
        {MobileNavContent}
      </chakra.div>
    </chakra.header>
  );
}
