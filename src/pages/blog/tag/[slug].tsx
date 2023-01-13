import { InferGetStaticPropsType } from 'next';
import { BlogArchive } from '../../../components/BlogArchive';
import { getAllTags, getPostsByTag } from '../../../lib/posts';
import { slugify } from '../../../utils/utils';

export default function TagArchive({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
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
  let posts;
  try {
    posts = getPostsByTag(slugify(params.slug));
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      tag: params.slug,
    },
  };
}
