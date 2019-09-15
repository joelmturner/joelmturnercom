/** @jsx jsx */
import { jsx } from "theme-ui"
// eslint-disable-next-line no-unused-vars
import React from "react"
import Prism from "@theme-ui/prism"
import { preToCodeBlock } from "mdx-utils"
import { Grid, Flexbox, Series } from "../components"
import Code from "../components/code"
import Embed from "../components/embed"
import Link from "gatsby-link"

const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  wrapper: ({ children }) => <>{children}</>,
}

export default {
  ...components,
  code: Prism,
  Grid,
  Flexbox,
  Embed,
  Link: props => <Link {...props} sx={{ variant: "post.link" }} activeClassName="active" partiallyActive={true} />,
  Series,
}
