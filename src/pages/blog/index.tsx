import { BlogArchive } from "../../components/BlogArchive";
import { getPosts } from "../../lib/posts";
import { FrontMatter } from "../../lib/types";

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
