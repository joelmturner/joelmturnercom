import React from "react"
import { Series } from "../../../../src/components"

function Avatar() {
  const styles = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
  }

  return (
    <img
      style={styles}
      src="https://res.cloudinary.com/joelmturner/b_rgb:e7e5e5/monster-01.png"
      alt="Monster P. Whittington portrait"
      title="Monster P. Whittington"
    />
  )
}

export const SeriesBlock = () => (
  <Series
    title="Create an Avatar Component in Gatsby with TypeScript"
    links={[
      { slug: "/blog/avatar-component-gatsby-1", title: `Part 1: We'll build the simple react component` },
      { slug: "/blog/avatar-component-gatsby-2", title: `Part 2: We'll start hooking up Gatsby image` },
      { slug: "/blog/avatar-component-gatsby-3", title: `Part 3: We'll type it with TypeScript` },
    ]}
  />
)

export default Avatar
