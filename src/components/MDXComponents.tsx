import {
  Alert,
  Box,
  chakra,
  Code as ChakraCode,
  Divider,
  Flex,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Note } from './Note';
import { Heading } from './Heading';
import { CustomHeading } from './mdxComps/CustomHeading';
import { CustomLink } from './mdxComps/CustomLink';
import { CustomImage } from './mdxComps/CustomImage';
import { styled } from 'styled-system/jsx';

const Quote = (props: any) => {
  const { colorMode } = useColorMode();
  const bgColor = {
    light: 'blue.50',
    dark: 'blue.900',
  };

  return (
    <Alert
      mt={4}
      w="98%"
      bg={bgColor[colorMode]}
      variant="left-accent"
      status="info"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  );
};

function Code(props) {
  const colorScheme = useColorModeValue('orange', 'purple');
  const borderColor = useColorModeValue('orange.100', 'gray.700');
  const background = useColorModeValue('gray.200', 'gray.700');
  const lineColor = useColorModeValue('gray.500', 'gray.600');

  if (!props.className) {
    // inline code
    return <ChakraCode colorScheme={colorScheme} fontStyle="italic" fontSize="0.84em" {...props} />;
  }

  const { filename, line, ...rest } = props;

  return (
    <chakra.code
      data-filename={filename}
      display="block"
      border="1px solid"
      borderColor={borderColor}
      fontSize="0.84em"
      w="100%"
      overflowX="auto"
      py={2}
      my={4}
      sx={{
        '&[data-filename]::before': {
          content: 'attr(data-filename)',
          padding: 2,
          background,
          display: 'block',
          fontSize: 'smaller',
          marginBottom: '0.5rem',
        },
        '&[data-filename]': {
          paddingTop: 0,
        },
        '.highlight-line': {
          position: 'relative',
          borderLeft: '5px solid transparent',
          pl: 8,
          pr: 2,

          '&::before': {
            content: 'attr(data-line)',
            position: 'absolute',
            top: 0,
            left: 1,
            color: lineColor,
          },
        },
      }}
      {...rest}
    />
  );
}

export const MDXComponents = {
  h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props: any) => <CustomHeading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props: any) => <CustomHeading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props: any) => <CustomHeading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props: any) => <CustomHeading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props: any) => <CustomHeading as="h6" size="xs" fontWeight="bold" {...props} />,
  br: (props: any) => <Box height="24px" {...props} />,
  p: (props: any) => <Text as="p" my={6} lineHeight="tall" {...props} />,
  ul: (props: any) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props: any) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
  img: CustomImage,
  hr: (props) => <styled.hr borderColor="border.muted" my={4} w="100%" {...props} />,
  a: CustomLink,
  Link: CustomLink,
  code: Code,
  Note,
  Flex,
};
