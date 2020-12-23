import { jsx } from "theme-ui";
import { FC, useCallback } from "react";
import Posts from "../../../../components/posts";
import { graphql } from "gatsby";
import { slugify } from "../../../../utils/utils";

const PostsTagsRenderer: FC<any> = (props) => {
  const tagsFilter = useCallback(
    (edge) => {
      if (!Array.isArray(edge.node.frontmatter.tags)) {
        return slugify(edge.node.frontmatter.tags) === props.params.frontmatter__tags;
      }
      return edge.node.frontmatter.tags.map((tag: string) => slugify(tag)).includes(props.params.frontmatter__tags);
    },
    [props.params.frontmatter__tags]
  );

  const filteredProps = {
    ...props,
    data: {
      allBlogPosts: {
        edges: props.data.allBlogPosts.edges.filter(tagsFilter),
      },
      recentBlogPosts: {
        edges: props.data.recentBlogPosts.edges.filter(tagsFilter),
      },
    },
  };

  return jsx(Posts, {
    ...filteredProps,
  });
};

export default PostsTagsRenderer;

export const postsTagsQuery = graphql`
  query PostsTagsQuery {
    ...allBlogPosts
    ...recentBlogPosts
  }
`;
