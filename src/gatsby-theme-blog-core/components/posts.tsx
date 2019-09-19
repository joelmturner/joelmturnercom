import { jsx } from "theme-ui"
import Posts from "../../gatsby-theme-ui-blog/posts"

export default props => {
  const posts = props.data.allMdx.edges.map(e => e.node)

  return jsx(Posts, {
    ...props,
    posts,
  })
}
