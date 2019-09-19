import { jsx } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Post from "../../gatsby-theme-ui-blog/post"

export default (props: any) => {
  const { body } = props.data.mdx
  const children = jsx(MDXRenderer, { children: body })

  return jsx(Post, {
    ...props,
    ...props.data.mdx,
    children,
  })
}
