import NextLink from "next/link";
import { matchSorter } from "match-sorter";
import { getPosts } from "../../lib/posts";
import React, { useCallback, useMemo, useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import { FrontMatter } from "../../lib/types";
import { getDateString } from "../../src/utils/strings";
import { Post } from "../../src/components/Post";
import { PostList } from "../../src/components/PostList";
import Head from "next/head";

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
  const [search, setSearch] = useState<string>("");
  const handleSearch = useCallback(
    function (event) {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const featured = useMemo(() => posts.filter((post) => post.featured)?.[0], [posts]);
  const filteredPosts: FrontMatter[] = useMemo(
    () =>
      search
        ? matchSorter(posts, search, {
            keys: ["title", "category", "tags"],
          })
        : posts,
    [search, posts]
  );

  return (
    <>
      <Head>
        <title>Blog | Joel M Turner</title>
      </Head>
      <Flex justify="space-between" alignItems="flex-end">
        <Heading as="h1">Blog</Heading>
        <Input onChange={handleSearch} placeholder="Search..." value={search} data-testid="blog-search" w="30%" />
      </Flex>
      {/* {featured ? (
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
      </Heading> */}

      <Divider marginTop="5" />
      <PostList posts={filteredPosts} />
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
