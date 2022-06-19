import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { BlogArchive } from "../../components/BlogArchive";
import { getPosts } from "../../lib/posts";
import { FrontMatter } from "../../lib/types";

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
  return <BlogArchive posts={posts} title="Blog" />;
}

export async function getStaticProps({}) {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}
