import React from "react";
import Link from "next/link";
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
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";

import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export function Header() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef<HTMLHeadElement>();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();

  const MobileNavContent = React.useMemo(
    () => (
      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
      >
        <CloseButton aria-label="Close menu" justifySelf="self-start" onClick={mobileNav.onClose} />
        <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
          <Link href="/">Dashboard</Link>
        </Button>
        <Button w="full" variant="solid" colorScheme="brand" leftIcon={<AiOutlineInbox />}>
          Inbox
        </Button>
        <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
          Videos
        </Button>
      </VStack>
    ),
    [mobileNav.isOpen]
  );

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s"
      bg={bg}
      borderTop="6px solid"
      borderTopColor="brand.400"
      w="full"
      overflowY="hidden"
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue("gray.200", "gray.900")}
    >
      <chakra.div h="4.5rem" mx="auto" maxW="1200px">
        <Flex w="full" h="full" px="6" alignItems="center" justifyContent="space-between">
          <Flex align="flex-start">
            <Link href="/">
              <HStack>
                {/* <Logo /> */}
                <div>Joel M Turner</div>
              </HStack>
            </Link>
          </Flex>
          <Flex>
            <HStack spacing="5" display={{ base: "none", md: "flex" }}></HStack>
          </Flex>
          <Flex justify="flex-end" align="center" color="gray.400">
            <Button
              bg={bg}
              color="gray.500"
              display="inline-flex"
              alignItems="center"
              fontSize="md"
              _hover={{ color: cl }}
              _focus={{ boxShadow: "none" }}
            >
              <Link href="/about">About</Link>
            </Button>
            <Button
              bg={bg}
              color="gray.500"
              display="inline-flex"
              alignItems="center"
              fontSize="md"
              _hover={{ color: cl }}
              _focus={{ boxShadow: "none" }}
            >
              <Link href="/blog">Blog</Link>
            </Button>
            <Button
              bg={bg}
              color="gray.500"
              display="inline-flex"
              alignItems="center"
              fontSize="md"
              _hover={{ color: cl }}
              _focus={{ boxShadow: "none" }}
            >
              <Link href="/illustration">Illustration</Link>
            </Button>
            <Button
              bg={bg}
              color="gray.500"
              display="inline-flex"
              alignItems="center"
              fontSize="md"
              _hover={{ color: cl }}
              _focus={{ boxShadow: "none" }}
            >
              <Link href="/til">TIL</Link>
            </Button>
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue("gray.800", "inherit")}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Flex>
        </Flex>
        {MobileNavContent}
      </chakra.div>
    </chakra.header>
  );
}
