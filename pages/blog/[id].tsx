import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { FrontMatter } from "../../lib/types";
import { MDXComponents } from "../../src/components/MDXComponents";
import { Box, chakra } from "@chakra-ui/react";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeMetaAttribute from "../../lib/rehype-meta-attribute";
import rehypeHighlightCode from "../../lib/rehype-highlight-code";

export default function Post({ title, id, content }: { id: string; content: string } & FrontMatter) {
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
  const postData = getPostData(params.id);
  const content = await bundleMDX({
    source: postData.content,
    mdxOptions: function (options, frontmatter) {
      (options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeExternalLinks,
        rehypeHighlight,
        rehypeMetaAttribute,
        rehypeHighlightCode,
      ]),
        (options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm, remarkFrontmatter]);
      return options;
    },
  });
  return {
    props: {
      ...postData,
      content: content.code,
    },
  };
}
