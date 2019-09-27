/** @jsx jsx */
import { jsx } from "theme-ui"
import Flexbox from "./flexbox"
import { Link } from "gatsby"
import { useState, Fragment } from "react"

const MainNav = () => {
  const [showNav, setShowNav] = useState<boolean>(false)
  return (
    <Fragment>
      <Flexbox
        right
        middle
        sx={{
          variant: `nav.wrapper${showNav ? "Active" : ""}`,
        }}
      >
        <h3 sx={{ variant: "nav.link" }}>
          <Link
            to="/illustration"
            activeClassName="active"
            partiallyActive={true}
            sx={{
              "&.active": {
                color: "text",
              },
            }}
          >
            Illustration
          </Link>
        </h3>
        <h3 sx={{ variant: "nav.link" }}>
          <Link
            to="/blog"
            activeClassName="active"
            partiallyActive={true}
            sx={{
              "&.active": {
                color: "text",
              },
            }}
          >
            Blog
          </Link>
        </h3>
        <h3 sx={{ variant: "nav.link" }}>
          <Link
            to="/notes"
            activeClassName="active"
            partiallyActive={true}
            sx={{
              "&.active": {
                color: "text",
              },
            }}
          >
            Notes
          </Link>
        </h3>
      </Flexbox>
      <button sx={{ variant: "nav.button" }} onClick={() => setShowNav(!showNav)}>
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
  )
}

export default MainNav
