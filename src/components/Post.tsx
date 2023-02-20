import { Box, Flex, Heading, Text, Wrap, WrapItem, Image } from '@chakra-ui/react';
import NextLink from 'next/link';
import { memo } from 'react';
import { PostCard } from '../lib/types';
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

export function Post({
  post,
  root = 'blog',
  index,
}: {
  post: PostCard;
  root?: 'blog' | 'til';
  index?: number;
}) {
  const postUrl = `/${root}/${post.slug}`;
  return (
    <Wrap key={post.slug} spacing="30px" marginTop="5" w="100%">
      <WrapItem w="100%">
        <Box w="100%">
          {post.cover ? (
            <Box borderRadius="lg" overflow="hidden">
              <NextLink href={postUrl} style={{ textDecoration: 'none' }}>
                {
                  // CldImage is throwing a invalid cloudinary url error on pre transformed url
                  // TODO JT check if this is still an issue
                  post.cover.includes('blog_post_card_blank') ? (
                    <Image
                      transform="scale(1.0)"
                      src={post.cover}
                      alt={post.title}
                      width={736}
                      height={385}
                      objectFit="cover"
                      transition="0.3s ease-in-out"
                      borderRadius="lg"
                      _hover={{
                        transform: 'scale(1.05)',
                      }}
                      sizes="(max-width: 480px) 100vw, 50vw"
                      maxHeight={['200px', '210']}
                    />
                  ) : (
                    <PostImage
                      transform="scale(1.0)"
                      width={736}
                      height={385}
                      src={post.cover}
                      alt={post.title}
                      objectFit="cover"
                      transition="0.3s ease-in-out"
                      borderRadius="lg"
                      _hover={{
                        transform: 'scale(1.05)',
                      }}
                      sizes="(max-width: 480px) 100vw, 50vw"
                      maxHeight={['200px', '260px']}
                      priority={index < 2}
                      style={{ aspectRatio: '731 / 464' }}
                    />
                  )
                }
              </NextLink>
            </Box>
          ) : null}
          {!post.cover ? <MemoizedPostTitle title={post.title} url={postUrl} /> : null}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginTop="3"
            display={['none', 'flex']}
          >
            {post.tags?.length ? <PostTags tags={post.tags} postType={root} /> : null}
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
