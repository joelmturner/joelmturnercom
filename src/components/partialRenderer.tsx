/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";

type PartialRendererProps = {
  mdx: {
    body: any;
  };
};

function PartialRenderer({ mdx }: PartialRendererProps) {
  return jsx(MDXRenderer, { children: mdx.body });
}

export default PartialRenderer;
