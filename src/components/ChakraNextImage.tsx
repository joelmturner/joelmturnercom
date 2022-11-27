import * as React from 'react';
import NextImage from 'next/image';
import { Box, BoxProps } from '@chakra-ui/react';

export function ChakraNextImage(props: BoxProps & { src: string; alt: string; nextSize?: number }) {
  const { src, alt, nextSize, ...rest } = props;

  const resolvedNextSize = React.useMemo(() => {
    if (nextSize) {
      return {
        width: nextSize,
        height: nextSize,
      };
    }

    return {};
  }, [nextSize]);

  return (
    <Box position="relative" {...rest}>
      <NextImage
        layout={nextSize ? 'responsive' : 'fill'}
        src={src}
        alt={alt}
        {...resolvedNextSize}
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}
