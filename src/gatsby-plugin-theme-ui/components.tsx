/** @jsx jsx */
import { jsx } from "theme-ui";
import { Fragment, memo, ReactElement } from "react";
import ThemeUIPrism from "@theme-ui/prism";
import { preToCodeBlock } from "mdx-utils";
import { Grid, Flexbox, Series, Avatar } from "../components";
import Link from "gatsby-link";
import PostGallery from "../components/PostGallery";
import Note from "../components/note";
import loadable from "@loadable/component";
const Code = loadable(() => import("../components/code"));

const components = {
  pre: (preProps: any) => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  wrapper: ({ children }: { children: any }) => <Fragment>{children}</Fragment>,
};

const Image = memo(function Image({
  src,
  width,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  width: string | "s" | "m" | "l";
}): ReactElement {
  let w;
  switch (width) {
    case "s":
      w = "30%";
      break;
    case "m":
      w = "65%";
      break;
    case "l":
      w = "100%";
      break;
    default:
      w = width;
      break;
  }
  return <img sx={{ width: w }} src={src} {...props} alt={alt} />;
});

export default {
  ...components,
  code: ThemeUIPrism,
  Avatar,
  Grid,
  Flexbox,
  Link: (props: any) => (
    <Link {...props} sx={{ variant: "post.link" }} activeClassName="active" partiallyActive={true} />
  ),
  Series,
  Image,
  PostGallery,
  Note,
};
