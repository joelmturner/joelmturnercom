import { Grid, GridItem } from '@chakra-ui/react';
import { PostCard } from '../lib/types';
import { Post } from './Post';

export function PostList({ posts, root = 'blog' }: { posts: PostCard[]; root?: 'blog' | 'til' }) {
  return (
    <Grid paddingTop={['0', '20px']} templateColumns={['1fr', 'repeat(2, 1fr)']} gap={6}>
      {posts?.map((post, index) => (
        <GridItem w="100%" key={post.slug}>
          <Post post={post} root={root} index={index} />
        </GridItem>
      ))}
    </Grid>
  );
}
