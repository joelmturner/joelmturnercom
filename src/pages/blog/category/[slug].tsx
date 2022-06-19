import { getAllCategories, getPostsByCategory } from "../../../lib/posts";
import { BlogArchive } from "../../../components/BlogArchive";

export default function CategoryArchive({ posts, category }) {
  return <BlogArchive posts={posts} title={`Category: ${category}`} />;
}

export async function getStaticPaths() {
  const paths = getAllCategories();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByCategory(params.slug);

  return {
    props: {
      posts,
      category: params.slug,
    },
  };
}
