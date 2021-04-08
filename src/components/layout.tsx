/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { memo, ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IoLogoInstagram, IoLogoGithub, IoLogoTwitter } from "react-icons/io";
import { FaDev } from "react-icons/fa";
import Header from "./header";
import { Flexbox } from ".";
import Global from "./global";
import { ExternalLink } from "./ExternalLink";

type LayoutProps = {
  children: ReactNode | ReactNode[];
  title?: string;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title = "", className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Themed.root className={className}>
      <Global />
      <Header siteTitle={title ? title : data.site.siteMetadata.title} />
      <main id="mainContent" sx={{ variant: "content.wrapper" }} role={"main"}>
        {children}
      </main>
      <footer sx={{ mt: 2 }}>
        <Flexbox middle sx={{ variant: "content.wrapper", borderTop: "1px solid", borderColor: "muted", py: 3 }}>
          <Flexbox left gap={2}>
            <Themed.p sx={{ fontSize: 2, mb: 0 }}>
              © 2012-{new Date().getFullYear()}, Proudly built with{` `}
              <ExternalLink href="https://www.gatsbyjs.org" title="Gatsby.js">
                Gatsby
              </ExternalLink>{" "}
              and{" "}
              <ExternalLink href="https://theme-ui.com" title="Theme UI">
                Theme UI
              </ExternalLink>
            </Themed.p>
          </Flexbox>
          <Flexbox gap={2} right>
            <ExternalLink href="https://www.instagram.com/joelmturner/" title="instagram">
              <IoLogoInstagram />
            </ExternalLink>
            <ExternalLink href="https://twitter.com/joelmturner" title="twitter">
              <IoLogoTwitter />
            </ExternalLink>
            <ExternalLink href="https://github.com/joelmturner" title="github">
              <IoLogoGithub />
            </ExternalLink>
            <ExternalLink href="https://dev.to/joelmturner" title="joelmturner's DEV Profile">
              <FaDev />
            </ExternalLink>
          </Flexbox>
        </Flexbox>
      </footer>
    </Themed.root>
  );
};

export default memo(Layout);
