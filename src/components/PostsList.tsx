/** @jsx jsx */
import { jsx } from "theme-ui";
import { memo } from "react";
import _camelCase from "just-camel-case";
import PostCard from "./postCard";
import { slugify } from "../utils/utils";
import { MDXNode } from "../pages";

export const PostsList = memo(({ edges }: { edges: MDXNode[] }) => {
  return (
    <div sx={{ variant: "collection.post", mt: 2 }}>
      {edges?.map(
        ({
          node: {
            frontmatter: { title, tags },
            slug,
            excerpt,
          },
        }) => (
          <PostCard key={title} slug={slugify(slug, `/blog`)} title={title} excerpt={excerpt} tags={tags} />
        )
      )}
    </div>
  );
});
