import { Divider, Flex, Heading, Input } from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import { useCallback, useMemo, useState } from "react";
import { FrontMatter } from "../lib/types";
import { PostList } from "./PostList";
import SEO from "./SEO";

export function BlogArchive({ posts, title }) {
  const [search, setSearch] = useState<string>("");
  const handleSearch = useCallback(
    function (event) {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const filteredPosts: FrontMatter[] = useMemo(
    () =>
      search
        ? matchSorter(posts, search, {
            keys: ["title", "category", "tags"],
          })
        : posts,
    [search, posts]
  );

  return (
    <>
      <SEO title={title} />
      <Flex justify="space-between" alignItems="flex-end">
        <Heading as="h1">{title}</Heading>
        <Input onChange={handleSearch} placeholder="Search..." value={search} data-testid="blog-search" w="30%" />
      </Flex>

      <Divider marginTop="5" />
      <PostList posts={filteredPosts} />
    </>
  );
}
