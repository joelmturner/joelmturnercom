import {
  Box,
  chakra,
  Divider,
  Flex,
  HStack,
  Link,
  Tag,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Blog } from 'contentlayer/generated';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { slugify } from '../utils/utils';
import { MDXComponents } from './MDXComponents';
import { PostTags } from './PostTags';
import SEO from './SEO';

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
  cover,
  date,
  lastmod,
  excerpt,
  description,
  body,
  slug,
}: {
  next: Blog;
  prev: Blog;
  postType: 'blog' | 'til';
} & Blog) {
  useLiveReload();
  const { colorMode } = useColorMode();
  const linkColor = useColorModeValue('brand.light.400', 'brand.dark.200');
  const MDXContent = useMDXComponent(body.code);

  //   dynamic import because not ESM compatible
  const embeds = dynamic(() => import('mdx-embed') as any, { ssr: false });
  const { CodePen, CodeSandbox, YouTube } = embeds as any;

  const components = {
    CodePen,
    CodeSandbox,
    YouTube,
    ...MDXComponents,
  };

  return (
    <>
      <SEO
        title={title}
        image={cover}
        imageAlt={title}
        isBlogPost
        datePublished={`${date}`}
        dateModified={`${lastmod}`}
        description={description ?? excerpt}
        keywords={tags}
      />
      <components.h1>{title}</components.h1>
      <chakra.article
        sx={{
          "img[src*='#center']": {
            display: 'block',
            margin: 'auto',
          },
        }}
      >
        <MDXContent components={components} />
      </chakra.article>
      <VStack spacing={4} alignItems="flex-start">
        <Divider my={4} />
        <Link
          href={`https://mobile.twitter.com/search?q=${encodeURI(
            'https://joelmturner.com/blog/' + slug
          )}`}
          target="_blank"
          title="Twitter discussion"
          alignSelf="flex-end"
          color={linkColor}
        >
          Discuss this article on Twitter
        </Link>
        {category ? (
          <HStack gap={[1, 2]} wrap="wrap">
            <Text fontSize="md">Category: </Text>
            <Tag
              size={['md', 'sm']}
              variant="subtle"
              colorScheme={colorMode === 'light' ? 'red' : 'blue'}
            >
              <Link href={`/${postType}/category/${slugify(category)}`}>{category}</Link>
            </Tag>
          </HStack>
        ) : null}
        {tags?.length ? <PostTags tags={tags} postType={postType} /> : null}
      </VStack>
      <Flex justifyContent={getJustification(next, prev)} py={4} gap={6}>
        {prev && (
          <Box justifyContent="flex-start">
            <NextLink
              href={`/${postType}/${prev.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                color: linkColor,
              }}
            >
              <FaChevronLeft />
              {prev.title}
            </NextLink>
          </Box>
        )}
        {next && (
          <Box justifyContent="flex-end">
            <NextLink
              href={`/${postType}/${next.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                color: linkColor,
              }}
            >
              {next.title}
              <FaChevronRight />
            </NextLink>
          </Box>
        )}
      </Flex>
    </>
  );
}
