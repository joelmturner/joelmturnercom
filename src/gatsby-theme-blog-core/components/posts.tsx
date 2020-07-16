import { jsx } from "theme-ui"
import Posts from "../../gatsby-theme-ui-blog/posts"

const PostsRenderer: React.FC<any> = (props) => {
  const posts = props.data.allBlogPost.edges.map((e: any) => e.node)

  return jsx(Posts, {
    ...props,
    posts,
  })
}

export default PostsRenderer;