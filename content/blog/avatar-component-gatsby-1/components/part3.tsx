import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

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
  const data = useStaticQuery<Data>(graphql`{
  monster1: file(relativePath: {eq: "monster-01-headshot.png"}) {
    childImageSharp {
      gatsbyImageData(width: 75, height: 75, layout: FIXED)
    }
  }
  monster2: file(relativePath: {eq: "monster-02-headshot.png"}) {
    childImageSharp {
      gatsbyImageData(width: 75, height: 75, layout: FIXED)
    }
  }
}
`)

  const { url, altText, title, user = 'monster1' } = props
  const styles = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
  }

  if (url) {
    return <img style={styles} src={url} alt={altText} title={title} />
  }

  return (
    <GatsbyImage
      image={data[user].childImageSharp.gatsbyImageData}
      style={styles}
      alt={altText}
      title={title} />
  );
}

export default Avatar
