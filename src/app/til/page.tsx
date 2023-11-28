import _pick from 'lodash/pick';
import { getAllPostsSorted } from '~/lib/posts';
import { PostList } from '@components/PostList';
import { Heading } from '@components/Heading';

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

export async function getPostData() {
  const posts = getAllPostsSorted('til');
  const truncatedPosts = posts.map((post) =>
    _pick(post, 'title', 'slug', 'cover', 'date', 'category', 'tags', 'excerpt')
  );
  return truncatedPosts;
}
