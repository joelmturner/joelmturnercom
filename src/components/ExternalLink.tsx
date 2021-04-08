/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { ReactNode } from "react";

type ExternalLinkProps = {
  children: ReactNode;
  tabIndex?: number;
  title: string;
  href: string;
};

export function ExternalLink({ children, tabIndex = 0, title, href }: ExternalLinkProps) {
  return (
    <Themed.a tabIndex={tabIndex} href={href} target="_blank" rel="noopener noreferrer" title={title}>
      {children}
    </Themed.a>
  );
}
