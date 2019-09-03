/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import * as React from "react"
import { Link } from "gatsby"
import Flexbox from "./flexbox"
import ThemeSwitch from "./themeSwitch"

type HeaderProps = {
  siteTitle: string;
}
const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode()
  const [showNav, setShowNav] = React.useState<boolean>(true)
  return (
    <header
      sx={{
        mb: "3",
      }}
    >
      <div
        sx={{
          padding: [3, 4],
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <Flexbox between middle>
          <Styled.h1>
            <Link to="/" sx={{ color: "text", textDecoration: "none" }}>
              {siteTitle}
            </Link>
          </Styled.h1>
          {showNav && (
            <Flexbox right middle sx={{ variant: "nav.wrapper" }}>
              <h3 sx={{ variant: "nav.link" }}>
                <Link to="/illustration">Illustration</Link>
              </h3>
              <h3 sx={{ variant: "nav.link" }}>
                <Link to="/blog">Blog</Link>
              </h3>
            </Flexbox>
          )}
          <ThemeSwitch
            checked={colorMode === "light"}
            onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
          />
        </Flexbox>
      </div>
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
