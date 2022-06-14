import { Box, chakra, Divider, Flex, HStack, Link } from "@chakra-ui/react";
import { getMDXComponent } from "mdx-bundler/client";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useMemo } from "react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { FrontMatter } from "../../lib/types";
import { MDXComponents } from "../../src/components/MDXComponents";

function getJustification(next, prev) {
  if (next && prev) {
    return "space-between";
  } else if (next && !prev) {
    return "flex-end";
  } else {
    return "flex-start";
  }
}

export default function Post({
  title,
  id,
  content,
  next,
  prev,
}: { id: string; content: string; next: FrontMatter; prev: FrontMatter } & FrontMatter) {
  const Post = useMemo(() => getMDXComponent(content), [content]);

  //   dynamic import because not ESM compatible
  const embeds = dynamic(() => import("mdx-embed"));
  const { CodePen, CodeSandbox } = embeds;

  const components = {
    CodePen,
    CodeSandbox,
    ...MDXComponents,
  };

  return (
    <>
      <components.h1>{title}</components.h1>
      <chakra.article>
        <Post components={components} />
      </chakra.article>
      <Divider my={4} />
      <Flex justifyContent={getJustification(next, prev)} py={4} gap={6}>
        {prev && (
          <Box justifyContent="flex-start">
            <NextLink href={`/blog/${prev.slug}`}>
              <Link color="orange.200">{`<-- ${prev.title}`}</Link>
            </NextLink>
          </Box>
        )}
        {next && (
          <Box justifyContent="flex-end">
            <NextLink href={`/blog/${next.slug}`}>
              <Link color="orange.200">{`${next.title} -->`}</Link>
            </NextLink>
          </Box>
        )}
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      ...postData,
    },
  };
}
