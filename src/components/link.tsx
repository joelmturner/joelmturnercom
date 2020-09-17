import React from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";

type LinkProps = GatsbyLinkProps<any> & {};

const Link: React.FC<LinkProps> = (props) => {
  return <GatsbyLink {...props} sx={{ variant: "link" }} />;
};

Link.displayName = "Link";
export default Link;
