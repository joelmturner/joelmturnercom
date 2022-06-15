import { Box, useColorModeValue } from "@chakra-ui/react";

export function Note({ children }) {
  return (
    <Box
      mb={2}
      px={3}
      pt={0.025}
      pb={0.25}
      bg={useColorModeValue("gray.100", "gray.700")}
      sx={{
        borderLeftStyle: "solid",
        borderLeftWidth: "5px",
        borderLeftColor: useColorModeValue("gray.300", "gray.500"),
      }}
    >
      {children}
    </Box>
  );
}
