import { Box, Link, Image, useColorModeValue, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { PostTags } from "./PostTags";

export function FeaturedPost({ post }) {
  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
        <Box width={{ base: "100%", sm: "85%" }} zIndex="2" marginLeft={{ base: "0", sm: "5%" }} marginTop="5%">
          <NextLink href={`/blog/${post.slug}`}>
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image borderRadius="lg" src={post.cover} alt="some good alt text" objectFit="contain" />
            </Link>
          </NextLink>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(orange.600 1px, transparent 1px)",
              "radial(orange.300 1px, transparent 1px)"
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box display="flex" flex="1" flexDirection="column" justifyContent="center" marginTop={{ base: "3", sm: "0" }}>
        <PostTags tags={post.tags} size="md" />
        <Heading marginTop="1">
          <NextLink href={`/blog/${post.slug}`}>
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {post.title}
            </Link>
          </NextLink>
        </Heading>
        <Text as="p" marginTop="2" color={useColorModeValue("gray.700", "gray.200")} fontSize="lg">
          {post.excerpt}
        </Text>
      </Box>
    </Box>
  );
}
