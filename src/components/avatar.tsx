/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

type AvatarProps = {
  user?: "monster1" | "monster2";
  className?: string;
}

export default ({ user, className }: AvatarProps) => {
  const data = useStaticQuery(graphql`
    query {
      ...monsters
      joel: file(relativePath: { eq: "joel-turner-headshot-web.jpg" }) {
        childImageSharp {
          fixed(height: 55, width: 55) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const image = data && data[user || "joel"] && data[user || "joel"].childImageSharp.fixed

  return (
    <Img
      Tag="div"
      className={className}
      fixed={image}
      sx={{
        bg: "text",
        width: "75px",
        height: "75px",
        m: 0,
        borderRadius: "50%",
      }}
    />
  )
}
