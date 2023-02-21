import _pick from 'lodash/pick';
import { InferGetStaticPropsType } from 'next';
import { BlogArchive } from '../../components/BlogArchive';
import { getAllPostsSorted } from '../../lib/posts';
import { generateRssFeed } from '../../lib/rss';

export default function PostIndex({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogArchive posts={posts} title="Blog" />;
}

export async function getStaticProps() {
  const posts = getAllPostsSorted();
  const truncatedPosts = posts.map((post) =>
    _pick(post, 'title', 'slug', 'cover', 'date', 'category', 'tags', 'excerpt')
  );
  await generateRssFeed();
  return {
    props: {
      posts: truncatedPosts,
    },
  };
}
