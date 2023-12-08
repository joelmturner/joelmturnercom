'use client';

import { matchSorter } from 'match-sorter';
import { PostCard } from '../lib/types';
import { PostList } from './PostList';
import { Flex } from 'styled-system/jsx';
import { Divider } from './Divider';
import { Heading } from './Heading';
import { useQueryState } from 'next-usequerystate';
import { Input } from './Input';
import { useCallback } from 'react';

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
}: {
  posts: PostCard[];
  title: string;
  postType?: 'blog' | 'til';
}) {
  const [search, setSearch] = useQueryState('');
  const filteredPosts = getFilteredPosts(search as any, posts);

  const handleSearch = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement>) {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  return (
    <>
      <Flex justify="space-between" alignItems="flex-end">
        <Heading as="h1" textStyle="3xl">
          {title}
        </Heading>
        <Input
          onChange={handleSearch}
          placeholder="Search..."
          value={search ?? ''}
          data-testid="blog-search"
          w="30%"
        />
      </Flex>

      <Divider marginTop="5" />
      <PostList posts={filteredPosts} root={postType} />
    </>
  );
}
