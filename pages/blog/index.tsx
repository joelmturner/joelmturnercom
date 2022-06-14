import { getPosts } from "../../lib/posts";
import NextLink from "next/link";
import React, { useMemo } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Flex,
  TagProps,
} from "@chakra-ui/react";
import { FrontMatter } from "../../lib/types";
import { getDateString } from "../../src/utils/strings";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
  size?: TagProps["size"];
}

const BlogTags: React.FC<IBlogTags> = ({ marginTop, tags, size = "sm" }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={size} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export function PostTitle({ title, slug }) {
  return (
    <Heading fontSize="xl" marginTop="2">
      <NextLink href={`/blog/${slug}`}>
        <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
          {title}
        </Link>
      </NextLink>
    </Heading>
  );
}

type PostIndexProps = {
  posts: FrontMatter[];
};

export default function PostIndex({ posts }: PostIndexProps) {
  const featured = useMemo(() => posts.filter((post) => post.featured)?.[0], [posts]);
  console.log("posts", posts);

  return (
    <>
      <Heading as="h1">Blog</Heading>
      {featured ? (
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
            <Box width={{ base: "100%", sm: "85%" }} zIndex="2" marginLeft={{ base: "0", sm: "5%" }} marginTop="5%">
              <NextLink href={`/blog/${featured.slug}`}>
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image borderRadius="lg" src={featured.cover} alt="some good alt text" objectFit="contain" />
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
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <BlogTags tags={featured.tags} size="md" />
            <Heading marginTop="1">
              <NextLink href={`/blog/${featured.slug}`}>
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {featured.title}
                </Link>
              </NextLink>
            </Heading>
            <Text as="p" marginTop="2" color={useColorModeValue("gray.700", "gray.200")} fontSize="lg">
              {featured.excerpt}
            </Text>
          </Box>
        </Box>
      ) : null}

      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>

      <Divider marginTop="5" />
      <VStack paddingTop="40px" spacing="50" alignItems="flex-start">
        {posts?.map((post) => (
          <Wrap key={post.slug} spacing="30px" marginTop="5" w="100%">
            <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "100%" }}>
              <Box w="100%">
                {post.cover ? (
                  <Box borderRadius="lg" overflow="hidden">
                    <NextLink href={`/blog/${post.slug}`}>
                      <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                        <Image
                          transform="scale(1.0)"
                          src={post.cover}
                          alt="some text"
                          objectFit="contain"
                          width="100%"
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                        />
                      </Link>
                    </NextLink>
                  </Box>
                ) : null}
                {!post.cover ? <PostTitle title={post.title} slug={post.slug} /> : null}
                <Flex alignItems="center" justifyContent="space-between" marginTop="3">
                  {post.tags?.length ? <BlogTags tags={post.tags} /> : null}
                  <Text as="i">{getDateString(post.date)}</Text>
                </Flex>
                {post.cover ? <PostTitle title={post.title} slug={post.slug} /> : null}
                <Text as="p" fontSize="md" marginTop="2">
                  {post.excerpt}
                </Text>
              </Box>
            </WrapItem>
          </Wrap>
        ))}
      </VStack>
    </>
  );
}

export async function getStaticProps({}) {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}
