/** @jsx jsx */
import { jsx } from "theme-ui";
import Flexbox from "./flexbox";
import { Link } from "gatsby";
import { useState, Fragment, useCallback, memo } from "react";

const navLinks = [
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/blog",
    label: "Blog",
  },
  {
    to: "/illustration",
    label: "Illustration",
  },
  {
    to: "/til",
    label: "TIL",
  },
];

const MainNav = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const toggleNav = useCallback(() => setShowNav((prevState) => !prevState), [setShowNav]);

  return (
    <Fragment>
      <Flexbox
        right
        middle
        sx={{
          variant: `nav.wrapper${showNav ? "Active" : ""}`,
        }}
        as="nav"
        role="navigation"
        aria-label="main navigation"
      >
        {navLinks.map((navLink) => (
          <span sx={{ variant: "nav.link" }} key={navLink.label}>
            <Link
              to={navLink.to}
              activeClassName="active"
              partiallyActive={true}
              sx={{
                "&.active": {
                  color: "text",
                },
              }}
            >
              {navLink.label}
            </Link>
          </span>
        ))}
      </Flexbox>
      <button sx={{ variant: "nav.button" }} onClick={toggleNav} aria-label="theme switcher">
        <div
          sx={{
            width: "24px",
            height: "2px",
            position: "absolute",
            left: "0px",
            bg: showNav ? "transparent" : "text",
            transition: "all 250ms cubic-bezier(0.86, 0, 0.07, 1) 0s",
            "&:before": {
              content: '""',
              width: "24px",
              height: "2px",
              position: "absolute",
              left: "0px",
              transform: showNav ? "rotate(45deg)" : "rotate(0deg)",
              top: showNav ? "0px" : "-8px",
              bg: "text",
              transition: "all 250ms cubic-bezier(0.86, 0, 0.07, 1) 0s",
            },
            "&:after": {
              content: '""',
              width: "24px",
              height: "2px",
              position: "absolute",
              left: "0px",
              transform: showNav ? "rotate(-45deg)" : "rotate(0deg)",
              top: showNav ? "0px" : "8px",
              bg: "text",
              transition: "all 250ms cubic-bezier(0.86, 0, 0.07, 1) 0s",
            },
          }}
        />
      </button>
    </Fragment>
  );
};

export default memo(MainNav);
