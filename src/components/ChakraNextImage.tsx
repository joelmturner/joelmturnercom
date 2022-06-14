import * as React from "react";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";

export function ChakraNextImage(props) {
  const { src, alt, ...rest } = props;
  return (
    <Box position="relative" {...rest}>
      <NextImage objectFit="cover" layout="fill" src={src} alt={alt} />
    </Box>
  );
}
