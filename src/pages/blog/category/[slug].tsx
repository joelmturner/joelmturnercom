import { getAllCategories, getPostsByCategory } from '../../../lib/posts';
import { BlogArchive } from '../../../components/BlogArchive';
import { InferGetStaticPropsType } from 'next';

export default function CategoryArchive({
  posts,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
  const slug: string = params.slug;
  const posts = await getPostsByCategory(slug);

  return {
    props: {
      posts,
      category: slug,
    },
  };
}
