import { InferGetStaticPropsType } from 'next';
import { BlogArchive } from '../../../components/BlogArchive';
import { getAllPostsByTag, getAllTags } from '../../../lib/posts';
import { slugify } from '../../../utils/utils';

export default function TagArchive({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogArchive posts={posts} title={`TIL Tag: ${tag}`} postType="til" />;
}

export async function getStaticPaths() {
  const paths = getAllTags('til');
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let posts;
  try {
    posts = getAllPostsByTag(slugify(params.slug), 'til');
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
