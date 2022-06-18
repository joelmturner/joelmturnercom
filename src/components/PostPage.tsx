import { Box, chakra, Divider, Flex, Link } from "@chakra-ui/react";
import { getMDXComponent } from "mdx-bundler/client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FrontMatter } from "../../lib/types";
import { MDXComponents } from "./MDXComponents";
import NextLink from "next/link";
import Head from "next/head";

function getJustification(next, prev) {
  if (next && prev) {
    return "space-between";
  } else if (next && !prev) {
    return "flex-end";
  } else {
    return "flex-start";
  }
}

export function PostPage({
  title,
  id,
  content,
  next,
  prev,
  postType = "blog",
}: { id: string; content: string; next: FrontMatter; prev: FrontMatter; postType: "blog" | "til" } & FrontMatter) {
  const Post = useMemo(() => getMDXComponent(content), [content]);

  //   dynamic import because not ESM compatible
  const embeds = dynamic(() => import("mdx-embed") as any, { ssr: false });
  const { CodePen, CodeSandbox } = embeds as any;

  const components = {
    CodePen,
    CodeSandbox,
    ...MDXComponents,
  };

  return (
    <>
      <Head>
        <title>{`${title} | Joel M Turner`}</title>
      </Head>
      <components.h1>{title}</components.h1>
      <chakra.article>
        <Post components={components} />
      </chakra.article>
      <Divider my={4} />
      <Flex justifyContent={getJustification(next, prev)} py={4} gap={6}>
        {prev && (
          <Box justifyContent="flex-start">
            <NextLink href={`/${postType}/${prev.slug}`}>
              <Link color="orange.200" sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <FaChevronLeft />
                {prev.title}
              </Link>
            </NextLink>
          </Box>
        )}
        {next && (
          <Box justifyContent="flex-end">
            <NextLink href={`/${postType}/${next.slug}`}>
              <Link color="orange.200" sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
