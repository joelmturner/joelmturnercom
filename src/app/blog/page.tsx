import _pick from 'lodash/pick';
import { BlogArchive } from '../../components/BlogArchive';
import { getAllPostsSorted } from '../../lib/posts';
import { Blog } from 'contentlayer/generated';

export default async function PostIndex() {
  const posts = await getPostData();

  return <BlogArchive posts={posts} title="Blog" />;
}

async function getPostData(): Promise<Blog[]> {
  const posts = getAllPostsSorted();
  const truncatedPosts = posts.map((post) =>
    _pick(post, 'title', 'slug', 'cover', 'date', 'category', 'tags', 'excerpt')
  );
  //   await generateRssFeed();
  return truncatedPosts as Blog[];
}

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on dev and life.',
};
