/** @jsx jsx */
import { jsx, Themed, useColorMode } from "theme-ui";
import * as React from "react";
import { Link } from "gatsby";
import Flexbox from "./flexbox";
import ThemeSwitch from "./themeSwitch";
import MainNav from "./mainNav";
import { memo, useRef } from "react";

type HeaderProps = {
  siteTitle: string;
};

const Header: React.FC<HeaderProps> = ({ siteTitle = "" }) => {
  const skipRef = useRef<HTMLAnchorElement>(null);

  const setFocused = React.useCallback(
    function () {
      if (skipRef?.current) {
        skipRef.current.style.top = "0%";
      }
    },
    [skipRef.current]
  );

  const unsetFocused = React.useCallback(
    function () {
      if (skipRef?.current) {
        skipRef.current.style.top = "-500%";
      }
    },
    [skipRef.current]
  );

  return (
    <header sx={{ mb: 2, position: "relative" }}>
      <a
        ref={skipRef}
        href="#mainContent"
        tabIndex={0}
        sx={{
          position: "absolute",
          top: "-500%",
          color: "primary",
        }}
        onFocus={setFocused}
        onBlur={unsetFocused}
      >
        Skip to main content
      </a>
      <div sx={{ variant: "content.wrapper" }}>
        <Flexbox between middle>
          <Themed.h1
            sx={{
              mb: 0,
              fontSize: 3,
            }}
          >
            <Link to="/" tabIndex={0} sx={{ color: "textMuted", textDecoration: "none" }}>
              {siteTitle}
            </Link>
          </Themed.h1>

          <MainNav />

          <ThemeSwitch />
        </Flexbox>
      </div>
    </header>
  );
};

export default memo(Header);
