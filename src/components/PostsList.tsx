/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import React, { memo } from "react";
import PostCard from "./postCard";
import { slugify } from "../utils/utils";
import { MDXNode } from "../pages";

export const PostsList = memo(({ edges }: { edges: MDXNode[] }) => {
  return (
    <div sx={{ variant: "collection.post", mt: 2 }}>
      {edges?.map(
        ({
          node: {
            frontmatter: { title, cover },
            slug,
            excerpt,
          },
        }) => (
          <PostCard
            key={title}
            slug={slugify(slug, `/blog`)}
            title={title}
            image={cover?.childImageSharp?.gatsbyImageData}
            excerpt={excerpt}
          />
        )
      )}
    </div>
  );
});
