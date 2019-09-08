import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FixedObject } from "gatsby-image"

type AvatarProps = {
  url?: string;
  altText?: string;
  title?: string;
  user?: "monster1" | "monster2";
}

type ChildImage = {
  childImageSharp: {
    fixed: FixedObject;
  };
}

type Data = {
  monster1: ChildImage;
  monster2: ChildImage;
}

function Avatar(props: AvatarProps) {
  const data = useStaticQuery<Data>(graphql`
    query {
      monster1: file(relativePath: { eq: "monster-01-headshot.png" }) {
        childImageSharp {
          fixed(width: 75, height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      monster2: file(relativePath: { eq: "monster-02-headshot.png" }) {
        childImageSharp {
          fixed(width: 75, height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const { url, altText, title, user } = props
  const styles = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
  }

  if (url) {
    return <img style={styles} src={url} alt={altText} title={title} />
  }

  return <Img style={styles} fixed={user && data[user].childImageSharp.fixed} alt={altText} title={title} />
}

export default Avatar
