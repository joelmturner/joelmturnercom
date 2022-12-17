import React, { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
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
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';

function NavLink({ slug, label }: { slug: string; label: string }) {
  return <Link href={`/${slug}`}>{label}</Link>;
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
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};
  const { scrollY } = useViewportScroll();
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const handleMobileNavClick = useCallback(() => {
    mobileNav.onClose();
  }, []);

  const logo = useMemo(() => {
    return colorMode === 'light'
      ? `https://res.cloudinary.com/joelmturner/image/upload/v1671288060/jmt-logo-light_pa8izj.svg`
      : `https://res.cloudinary.com/joelmturner/image/upload/v1671288060/jmt-logo-dark_e6yn1w.svg`;
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
    [mobileNav.isOpen]
  );

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
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
        <Flex w="full" h="full" px="6" alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <Link href="/">
              <HStack cursor="pointer">
                <CldImage
                  src={logo}
                  alt="joelmturner pyramid logo"
                  width={232}
                  height={40}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </HStack>
            </Link>
          </Flex>
          <Flex>
            <HStack spacing="5" display={{ base: 'none', md: 'flex' }}></HStack>
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
              <Button
                key={link.id}
                bg={bg}
                color={useColorModeValue('brand.light.300', 'brand.dark.100')}
                display="inline-flex"
                alignItems="center"
                fontSize="md"
                _hover={{ color: useColorModeValue('brand.light.200', 'brand.dark.200') }}
                _focus={{ boxShadow: 'none' }}
              >
                {link.component}
              </Button>
            ))}
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color={useColorModeValue('brand.light.300', 'brand.dark.100')}
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
