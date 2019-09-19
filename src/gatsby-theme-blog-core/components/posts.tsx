import { jsx } from "theme-ui"
import Posts from "../../gatsby-theme-ui-blog/posts"

export default (props: any) => {
  const posts = props.data.allBlogPost.edges.map((e: any) => e.node)

  return jsx(Posts, {
    ...props,
    posts,
  })
}
