import { jsx } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Post from "../../gatsby-theme-ui-blog/post"


const PostRenderer: React.FC<any> = (props) => {
  const { body } = props.data.mdx
  const children = jsx(MDXRenderer, { children: body })

  return jsx(Post, {
    ...props,
    ...props.data.mdx,
    children,
  })
}

export default PostRenderer;