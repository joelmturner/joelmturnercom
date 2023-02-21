import { getAllCategories, getAllPostsByCategory } from '../../../lib/posts';
import { BlogArchive } from '../../../components/BlogArchive';
import { InferGetStaticPropsType } from 'next';
import { slugify } from '../../../utils/utils';

export default function CategoryArchive({
  posts,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogArchive posts={posts} title={`TIL Category: ${category}`} postType="til" />;
}

export async function getStaticPaths() {
  const paths = getAllCategories('til');
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let posts;
  try {
    posts = getAllPostsByCategory(slugify(params.slug), 'til');
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
  const slug: string = params.slug;

  return {
    props: {
      posts,
      category: slug,
    },
  };
}
