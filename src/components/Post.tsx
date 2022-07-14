import { Box, Flex, Heading, Image, Link, Text, Wrap, WrapItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { memo } from 'react';
import { getDateString } from '../utils/strings';
import { PostTags } from './PostTags';

export function PostTitle({ title, url }) {
  return (
    <Heading fontSize="xl" marginTop="2">
      <NextLink href={url}>
        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </NextLink>
    </Heading>
  );
}

const MemoizedPostTitle = memo(PostTitle);

export function Post({ post, root = 'blog' }) {
  const postUrl = `/${root}/${post.slug}`;
  return (
    <Wrap key={post.slug} spacing="30px" marginTop="5" w="100%">
      <WrapItem w="100%">
        <Box w="100%">
          {post.cover ? (
            <Box borderRadius="lg" overflow="hidden">
              <NextLink href={postUrl}>
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={post.cover}
                    alt={post.title}
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </NextLink>
            </Box>
          ) : null}
          {!post.cover ? <MemoizedPostTitle title={post.title} url={postUrl} /> : null}
          <Flex alignItems="center" justifyContent="space-between" marginTop="3">
            {post.tags?.length ? <PostTags tags={post.tags} /> : null}
            <Text as="i" display={['none', 'block']}>
              {getDateString(post.date)}
            </Text>
          </Flex>
          {post.cover ? <MemoizedPostTitle title={post.title} url={postUrl} /> : null}
          <Text as="p" fontSize="md" marginTop="2">
            {post.excerpt}
          </Text>
        </Box>
      </WrapItem>
    </Wrap>
  );
}
