import { matchSorter } from 'match-sorter';
import { PostCard } from '../lib/types';
import { PostList } from './PostList';
import { SearchParams } from 'next-usequerystate/parsers';
import { Flex } from 'styled-system/jsx';
import { Divider } from './Divider';
import { Heading } from './Heading';
import { SearchPosts } from './search/SearchPosts';

function getFilteredPosts(search: string, posts: PostCard[]): PostCard[] {
  return search
    ? matchSorter(posts, search, {
        keys: ['title', 'category', 'tags'],
      })
    : posts;
}

export function BlogArchive({
  posts,
  title,
  postType = 'blog',
  searchParams,
}: {
  posts: PostCard[];
  title: string;
  postType?: 'blog' | 'til';
  searchParams: SearchParams;
}) {
  console.log('searchParams', searchParams);
  const search = (searchParams?.[''] as string) ?? '';
  console.log('search', search);
  const filteredPosts = getFilteredPosts(search, posts);

  return (
    <>
      {/* <SEO title={title} /> */}
      <Flex justify="space-between" alignItems="flex-end">
        <Heading as="h1" textStyle="3xl">
          {title}
        </Heading>
        <SearchPosts />
      </Flex>

      <Divider marginTop="5" />
      <PostList posts={filteredPosts} root={postType} />
    </>
  );
}
