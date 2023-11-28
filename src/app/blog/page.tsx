import _pick from 'lodash/pick';
import { BlogArchive } from '../../components/BlogArchive';
import { getAllPostsSorted } from '../../lib/posts';

export default async function PostIndex({ searchParams }) {
  const posts = await getPostData();

  return <BlogArchive posts={posts} title="Blog" searchParams={searchParams} />;
}

export async function getPostData() {
  const posts = getAllPostsSorted();
  const truncatedPosts = posts.map((post) =>
    _pick(post, 'title', 'slug', 'cover', 'date', 'category', 'tags', 'excerpt')
  );
  //   await generateRssFeed();
  return truncatedPosts;
}
