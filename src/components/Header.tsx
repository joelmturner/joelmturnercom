import React, { useCallback } from 'react';
import Link from 'next/link';
import {
  Button,
  chakra,
  CloseButton,
  Flex,
  Heading,
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

const NAV_LINKS = [
  { id: 'about', component: <Link href="/about">About</Link> },
  { id: 'blog', component: <Link href="/blog">Blog</Link> },
  { id: 'illustration', component: <Link href="/illustration">Illustration</Link> },
  { id: 'til', component: <Link href="/til">TIL</Link> },
];

export function Header() {
  const { toggleColorMode: toggleMode } = useColorMode();
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
      borderTopColor="orange.200"
      w="full"
      overflowY="hidden"
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <chakra.div h="4.5rem" mx="auto" maxW="4xl">
        <Flex w="full" h="full" px="6" alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <Link href="/">
              <HStack>
                {/* <Logo /> */}
                <Heading size="lg" fontWeight="300" cursor="pointer" color="gray.300">
                  Joel M Turner
                </Heading>
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
                color="gray.500"
                display="inline-flex"
                alignItems="center"
                fontSize="md"
                _hover={{ color: cl }}
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
              color="current"
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </Flex>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
            fontSize="20px"
            color={useColorModeValue('gray.800', 'inherit')}
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