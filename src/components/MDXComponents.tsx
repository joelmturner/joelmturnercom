import {
  Alert,
  Box,
  chakra,
  Code,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { Note } from "./Note";

const CustomImage = (props: any) => {
  return <Image width={props.width} height={props.height} src={props.src} alt={props.alt} />;
};

const CustomLink = (props: any) => {
  const { colorMode } = useColorMode();
  const color = {
    light: "blue.500",
    dark: "blue.300",
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal {...props} />;
};

const Quote = (props: any) => {
  const { colorMode } = useColorMode();
  const bgColor = {
    light: "blue.50",
    dark: "blue.900",
  };

  return (
    <Alert
      mt={4}
      w="98%"
      bg={bgColor[colorMode]}
      variant="left-accent"
      status="info"
      css={{
        "> *:first-of-type": {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  );
};

const DocsHeading = (props: any) => (
  <Heading
    css={{
      scrollMarginTop: "100px",
      scrollSnapMargin: "100px", // Safari
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]:before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`,
      },
      "&[id]:hover a": { opacity: 1 },
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: "outline",
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
);

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: "gray.200",
    dark: "gray.600",
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

export const MDXComponents = {
  h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props: any) => <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props: any) => <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props: any) => <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props: any) => <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props: any) => <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />,
  br: (props: any) => <Box height="24px" {...props} />,
  p: (props: any) => <Text as="p" my={6} lineHeight="tall" {...props} />,
  ul: (props: any) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props: any) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
  image: CustomImage,
  hr: Hr,
  a: CustomLink,
  Link: CustomLink,
  code: (props: any) => {
    if (!props.className) {
      // inline code
      return <Code colorScheme="orange" fontSize="0.84em" {...props} />;
    }

    const { filename, line, ...rest } = props;

    return (
      <chakra.code
        data-filename={filename}
        display="block"
        border="1px solid"
        borderColor={useColorModeValue("orange.100", "gray.700")}
        fontSize="0.84em"
        w="100%"
        overflowX="auto"
        py={2}
        my={4}
        sx={{
          "&[data-filename]::before": {
            content: "attr(data-filename)",
            padding: 2,
            background: useColorModeValue("gray.200", "gray.700"),
            display: "block",
            fontSize: "smaller",
            marginBottom: "0.5rem",
          },
          "&[data-filename]": {
            paddingTop: 0,
          },
          ".highlight-line": {
            position: "relative",
            borderLeft: "5px solid transparent",
            pl: 8,
            pr: 2,

            "&::before": {
              content: "attr(data-line)",
              position: "absolute",
              top: 0,
              left: 1,
              color: useColorModeValue("gray.500", "gray.600"),
            },
          },
        }}
        {...rest}
      />
    );
  },
  Note,
  Flex,
};
