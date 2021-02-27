/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { memo, ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IoLogoInstagram, IoLogoGithub, IoLogoTwitter } from "react-icons/io";
import { FaDev } from "react-icons/fa";
import Header from "./header";
import { Flexbox } from ".";
import Global from "./global";

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
    <Styled.root className={className}>
      <Global />
      <Header siteTitle={title ? title : data.site.siteMetadata.title} />
      <main id="mainContent" sx={{ variant: "content.wrapper" }}>
        {children}
      </main>
      <footer sx={{ mt: 2 }}>
        <Flexbox middle sx={{ variant: "content.wrapper", borderTop: "1px solid", borderColor: "muted", py: 3 }}>
          <Flexbox left gap={2}>
            <Styled.p sx={{ fontSize: 2, mb: 0 }}>
              © 2012-{new Date().getFullYear()}, Proudly built with{` `}
              <Styled.a tabIndex={0} href="https://www.gatsbyjs.org">
                Gatsby
              </Styled.a>{" "}
              and{" "}
              <Styled.a tabIndex={0} href="https://theme-ui.com">
                Theme UI
              </Styled.a>
            </Styled.p>
          </Flexbox>
          <Flexbox gap={2} right>
            <Styled.a tabIndex={0} href="https://www.instagram.com/joelmturner/" target="_blank" title="instagram">
              <IoLogoInstagram />
            </Styled.a>
            <Styled.a tabIndex={0} href="https://twitter.com/joelmturner" target="_blank" title="twitter">
              <IoLogoTwitter />
            </Styled.a>
            <Styled.a tabIndex={0} href="https://github.com/joelmturner" target="_blank" title="github">
              <IoLogoGithub />
            </Styled.a>
            <Styled.a tabIndex={0} href="https://dev.to/joelmturner" target="_blank" title="joelmturner's DEV Profile">
              <FaDev />
            </Styled.a>
          </Flexbox>
        </Flexbox>
      </footer>
    </Styled.root>
  );
};

export default memo(Layout);
