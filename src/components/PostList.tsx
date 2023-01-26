import { VStack } from '@chakra-ui/react';
import { FrontMatter } from '../lib/types';
import { Post } from './Post';

export function PostList({
  posts,
  root = 'blog',
}: {
  posts: FrontMatter[];
  root?: 'blog' | 'til';
}) {
  return (
    <VStack paddingTop={['0', '20px']} spacing="50" alignItems="flex-start">
      {posts?.map((post, index) => (
        <Post key={post.slug} post={post} root={root} index={index} />
      ))}
    </VStack>
  );
}
