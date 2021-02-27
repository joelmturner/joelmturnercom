/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { FC, memo } from "react";

type LinkProps = GatsbyLinkProps<HTMLAnchorElement>;

const Link: FC<LinkProps> = ({ ref, ...props }) => {
  return <GatsbyLink {...props} sx={{ variant: "link" }} />;
};

Link.displayName = "Link";
export default memo(Link);
