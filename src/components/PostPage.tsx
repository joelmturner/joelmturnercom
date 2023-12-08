import { Blog } from 'contentlayer/generated';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { slugify } from '../utils/utils';
import { PostTags } from './PostTags';
import { css } from 'styled-system/css';
import { Flex, styled } from 'styled-system/jsx';
import { Divider } from './Divider';
import { Text } from './Text';
import { Badge } from './Badge';
import { Article } from './Article';
import { Heading } from './Heading';

function getJustification(next: Blog, prev: Blog) {
  if (next && prev) {
    return 'space-between';
  } else if (next && !prev) {
    return 'flex-end';
  } else {
    return 'flex-start';
  }
}

export function PostPage({
  title,
  next,
  prev,
  tags,
  category,
  postType = 'blog',
  body,
  slug,
}: {
  next: Blog;
  prev: Blog;
  postType: 'blog' | 'til';
} & Blog) {
  return (
    <>
      <Heading as="h1" textStyle="3xl">
        {title}
      </Heading>
      <styled.article
        css={{
          "& img[src*='#center']": {
            display: 'block',
            margin: 'auto',
          },
        }}
      >
        <Article body={body} />
      </styled.article>

      <Flex direction="column" gap={4} alignItems="flex-start">
        <Divider my={4} />
        <styled.a
          href={`https://mobile.twitter.com/search?q=${encodeURI(
            'https://joelmturner.com/blog/' + slug
          )}`}
          target="_blank"
          title="Twitter discussion"
          alignSelf="flex-end"
          className={css({
            color: {
              _light: 'brand.400',
              _dark: 'brand.600',
            },
          })}
        >
          Discuss this article on Twitter
        </styled.a>
        {category ? (
          <Flex gap={[1, 2]} wrap="wrap">
            <Text fontSize="md">Category: </Text>
            <Badge
              size={{ base: 'md', lg: 'sm' }}
              variant="subtle"
              background={{ _light: 'accent.2', _dark: 'iris.3' }}
              color={{ _light: 'brand.300', _dark: 'brand.500' }}
            >
              <styled.a href={`/${postType}/category/${slugify(category)}`}>{category}</styled.a>
            </Badge>
          </Flex>
        ) : null}
        {tags?.length ? <PostTags tags={tags} postType={postType} /> : null}
      </Flex>

      <Flex justifyContent={getJustification(next, prev)} py={4} gap={6}>
        {prev && (
          <Flex justifyContent="flex-start">
            <Link
              href={`/${postType}/${prev.slug}`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                color: {
                  _light: 'brand.400',
                  _dark: 'brand.600',
                },
              })}
            >
              <FaChevronLeft />
              {prev.title}
            </Link>
          </Flex>
        )}
        {next && (
          <Flex justifyContent="flex-end">
            <Link
              href={`/${postType}/${next.slug}`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                color: {
                  _light: 'brand.400',
                  _dark: 'brand.600',
                },
              })}
            >
              {next.title}
              <FaChevronRight />
            </Link>
          </Flex>
        )}
      </Flex>
    </>
  );
}
