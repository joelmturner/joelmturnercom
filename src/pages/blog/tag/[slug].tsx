import { BlogArchive } from "../../../components/BlogArchive";
import { getAllTags, getPostsByTag } from "../../../lib/posts";

export default function TagArchive({ posts, tag }) {
  return <BlogArchive posts={posts} title={`Tag: ${tag}`} />;
}

export async function getStaticPaths() {
  const paths = getAllTags();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getPostsByTag(params.slug);

  return {
    props: {
      posts,
      tag: params.slug,
    },
  };
}
