import * as React from "react";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";

export function ChakraNextImage(props) {
  const { src, alt, nextSize, ...rest } = props;
  console.log("nextSize", nextSize);

  const resolvedNextSize = React.useMemo(() => {
    if (nextSize) {
      return {
        width: nextSize,
        height: nextSize,
      };
    }

    return {};
  }, [nextSize]);
  console.log("resolvedNextSize", resolvedNextSize);
  return (
    <Box position="relative" {...rest}>
      <NextImage objectFit="cover" layout="fill" src={src} alt={alt} {...resolvedNextSize} />
    </Box>
  );
}
