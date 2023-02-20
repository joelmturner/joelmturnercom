import {
  Alert,
  Box,
  chakra,
  Code as ChakraCode,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { InPostGallery } from './InPostGallery';
import { Note } from './Note';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';
import { isCloudinaryUrl } from '../utils/strings';
import { PostImage } from './CCImage';

const CustomImage = ({
  src,
  alt = '',
  width = 630,
  height = 400,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  const [imageDetails, setImageDetails] = useState({ width: 0, height: 0 });
  console.log('imageDetails', imageDetails);
  const srcSegments = src.split('/');
  const uploadIndex = srcSegments.indexOf('upload');
  // parameter to get image info
  srcSegments.splice(uploadIndex + 1, 0, 'fl_getinfo');
  const newSrc = srcSegments.join('/');

  useEffect(() => {
    async function getImageDetails() {
      const url = new URL(newSrc);
      const response = await fetch(url);
      const json = await response.json();
      setImageDetails(json.output);
    }
    if (isCloudinaryUrl(src)) {
      getImageDetails();
    }
  }, [newSrc, src]);

  const resolvedWidth = imageDetails.width ? Math.min(960, imageDetails.width) : null;

  if (isCloudinaryUrl(src)) {
    return imageDetails.width && imageDetails.height ? (
      <PostImage
        width={resolvedWidth}
        height={(resolvedWidth / imageDetails.width) * imageDetails.height}
        src={src}
        alt={alt}
        style={{ aspectRatio: `${imageDetails.width} / ${imageDetails.height}` }}
      />
    ) : (
      <NextImage width={width} height={height} src={src} alt={alt} />
    );
  } else {
    return <NextImage width={width} height={height} fill src={src} alt={alt} />;
  }
};

const CustomLink = (props: any) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'brand.light.400',
    dark: 'brand.dark.200',
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref {...props}>
        <Text
          as="span"
          color={color[colorMode]}
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {props.children}
        </Text>
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal {...props} />;
};

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

const CustomHeading = ({ id, ...props }: any) => {
  const color = useColorModeValue('brand.light.400', 'brand.dark.100');

  return (
    <NextLink href={`#${id}`}>
      <Heading
        id={id}
        lineHeight={'1em'}
        mb="1em"
        mt="2em"
        sx={{
          scrollMarginTop: '10px',
          scrollSnapMargin: '10px', // Safari
        }}
        {...props}
        _hover={{
          color,
          textDecoration: 'underline',
          _before: {
            content: '"#"',
            position: 'relative',
            marginLeft: '-1.4ch',
            paddingRight: '0.5ch',
            color,
            textDecoration: 'none',
          },
        }}
      />
    </NextLink>
  );
};

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
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
  hr: Hr,
  a: CustomLink,
  Link: CustomLink,
  code: Code,
  Note,
  Flex,
};
