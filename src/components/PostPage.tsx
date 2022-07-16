import {
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Tag,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { getMDXComponent } from 'mdx-bundler/client';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useMemo } from 'react';
import { renderToString } from 'react-dom/server';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FrontMatter } from '../lib/types';
import { MDXComponents } from './MDXComponents';
import { PostTags } from './PostTags';
import SEO from './SEO';

function getJustification(next, prev) {
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
  content,
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
}: {
  id: string;
  content: string;
  next: FrontMatter;
  prev: FrontMatter;
  postType: 'blog' | 'til';
} & FrontMatter) {
  const { colorMode } = useColorMode();
  const Post = useMemo(() => getMDXComponent(content), [content]);

  //   dynamic import because not ESM compatible
  const embeds = dynamic(() => import('mdx-embed') as any, { ssr: false });
  const { CodePen, CodeSandbox } = embeds as any;

  const components = {
    CodePen,
    CodeSandbox,
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
        <Post components={components} />
      </chakra.article>
      <VStack spacing={4} alignItems="flex-start">
        <Divider my={4} />
        {category ? (
          <HStack spacing={2}>
            <Text fontSize="md">Category: </Text>
            <Tag size="sm" variant="subtle" colorScheme={colorMode === 'light' ? 'red' : 'blue'}>
              <Link href={`/blog/category/${category.toLowerCase()}`}>{category}</Link>
            </Tag>
          </HStack>
        ) : null}
        {tags?.length ? <PostTags tags={tags} /> : null}
      </VStack>
      <Flex justifyContent={getJustification(next, prev)} py={4} gap={6}>
        {prev && (
          <Box justifyContent="flex-start">
            <NextLink href={`/${postType}/${prev.slug}`}>
              <Link
                color={useColorModeValue('brand.light.400', 'brand.dark.200')}
                sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
              >
                <FaChevronLeft />
                {prev.title}
              </Link>
            </NextLink>
          </Box>
        )}
        {next && (
          <Box justifyContent="flex-end">
            <NextLink href={`/${postType}/${next.slug}`}>
              <Link
                color={useColorModeValue('brand.light.400', 'brand.dark.200')}
                sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
              >
                {next.title}
                <FaChevronRight />
              </Link>
            </NextLink>
          </Box>
        )}
      </Flex>
    </>
  );
}
