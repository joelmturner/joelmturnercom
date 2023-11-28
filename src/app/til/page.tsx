import _pick from 'lodash/pick';
import { getAllPostsSorted } from '~/lib/posts';
import { PostList } from '@components/PostList';
import { Heading } from '@components/Heading';
import { Blog } from 'contentlayer/generated';

export default async function PostIndex() {
  const tils = await getPostData();

  return (
    <>
      <Heading as="h1" textStyle="3xl">
        Things I'm Curious About
      </Heading>
      <PostList posts={tils} root="til" />
    </>
  );
}

async function getPostData(): Promise<
  Pick<Blog, 'title' | 'slug' | 'cover' | 'date' | 'category' | 'tags' | 'excerpt'>[]
> {
  const posts = getAllPostsSorted('til');
  const truncatedPosts = posts.map((post) =>
    _pick(post, 'title', 'slug', 'cover', 'date', 'category', 'tags', 'excerpt')
  );
  return truncatedPosts as Blog[];
}

export const metadata = {
  title: 'Today I Learned',
  description: 'Things I am curious about.',
};
