/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default props => {
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

  const image = data && data[props.user || "joel"] && data[props.user || "joel"].childImageSharp.fixed

  return (
    <Img
      Tag="div"
      className={props.className}
      fixed={image}
      style={{
        width: "75px",
        height: "75px",
        margin: 0,
        borderRadius: "50%",
      }}
      sx={{
        bg: "text",
      }}
    />
  )
}
