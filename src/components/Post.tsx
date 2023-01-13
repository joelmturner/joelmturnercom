import { Box, chakra, Flex, Heading, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { CldImage } from 'next-cloudinary';
import NextLink from 'next/link';
import { memo, useCallback, useState } from 'react';
import { getDateString } from '../utils/strings';
import { PostImage } from './CCImage';
import { PostTags } from './PostTags';

export function PostTitle({ title, url }) {
  return (
    <Heading fontSize="xl" marginTop="2">
      <NextLink href={url} style={{ textDecoration: 'none' }}>
        {title}
      </NextLink>
    </Heading>
  );
}

const MemoizedPostTitle = memo(PostTitle);

export function Post({ post, root = 'blog', index }) {
  const postUrl = `/${root}/${post.slug}`;
  return (
    <Wrap key={post.slug} spacing="30px" marginTop="5" w="100%">
      <WrapItem w="100%">
        <Box w="100%">
          {post.cover ? (
            <Box borderRadius="lg" overflow="hidden">
              <NextLink href={postUrl} style={{ textDecoration: 'none' }}>
                <PostImage
                  transform="scale(1.0)"
                  width={736}
                  height={468}
                  src={post.cover}
                  alt={post.title}
                  objectFit="cover"
                  transition="0.3s ease-in-out"
                  borderRadius="lg"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                  sizes="(max-width: 480px) 100vw, 50vw"
                  maxHeight={'50vw'}
                  priority={index < 2}
                />
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
