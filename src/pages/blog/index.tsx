import { InferGetStaticPropsType } from 'next';
import { BlogArchive } from '../../components/BlogArchive';
import { getPosts } from '../../lib/posts';
import { generateRssFeed } from '../../lib/rss';

export default function PostIndex({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogArchive posts={posts} title="Blog" />;
}

export async function getStaticProps() {
  const posts = getPosts();
  await generateRssFeed();
  return {
    props: {
      posts,
    },
  };
}
