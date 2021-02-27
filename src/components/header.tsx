/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui";
import * as React from "react";
import { Link } from "gatsby";
import Flexbox from "./flexbox";
import ThemeSwitch from "./themeSwitch";
import MainNav from "./mainNav";
import { memo } from "react";

type HeaderProps = {
  siteTitle: string;
};

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode();
  const [isSkipFocused, setIsSkipFocused] = React.useState<boolean>(false);
  const setFocused = React.useCallback(function () {
    setIsSkipFocused(true);
  }, []);
  const unsetFocused = React.useCallback(function () {
    setIsSkipFocused(false);
  }, []);
  const setColor = React.useCallback(
    function () {
      setColorMode(colorMode === "light" ? "dark" : "light");
    },
    [setColorMode, colorMode]
  );

  return (
    <header sx={{ mb: 2, position: "relative" }}>
      <a
        href="#mainContent"
        tabIndex={0}
        sx={{
          position: "absolute",
          top: isSkipFocused ? "0%" : "-500%",
          color: "primary",
        }}
        onFocus={setFocused}
        onBlur={unsetFocused}
      >
        Skip to main content
      </a>
      <div sx={{ variant: "content.wrapper" }}>
        <Flexbox between middle>
          <Styled.h1
            sx={{
              mb: 0,
              fontSize: 3,
            }}
          >
            <Link to="/" tabIndex={0} sx={{ color: "textMuted", textDecoration: "none" }}>
              {siteTitle}
            </Link>
          </Styled.h1>

          <MainNav />

          <ThemeSwitch checked={colorMode === "light"} onClick={setColor} />
        </Flexbox>
      </div>
    </header>
  );
};

Header.defaultProps = {
  siteTitle: ``,
};

export default memo(Header);
