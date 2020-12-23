/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";

type LinkProps = GatsbyLinkProps<HTMLAnchorElement>;

const Link: React.FC<LinkProps> = ({ ref, ...props }) => {
  return <GatsbyLink {...props} sx={{ variant: "link" }} />;
};

Link.displayName = "Link";
export default Link;
