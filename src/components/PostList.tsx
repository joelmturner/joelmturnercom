import { VStack } from '@chakra-ui/react';
import { Post } from './Post';

export function PostList({ posts, root = 'blog' }) {
  return (
    <VStack paddingTop="40px" spacing="50" alignItems="flex-start">
      {posts?.map((post) => (
        <Post key={post.slug} post={post} root={root} />
      ))}
    </VStack>
  );
}
