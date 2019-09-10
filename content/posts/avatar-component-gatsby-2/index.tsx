/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default (props: { user: string; className?: string }) => {
  const data = useStaticQuery(graphql`
    query {
      ...monsters
    }
  `)

  const image = data && data[props.user] && data[props.user].childImageSharp.fixed

  return (
    <Img
      Tag="div"
      className={props.className}
      fixed={image}
      sx={{
        width: "75px",
        height: "75px",
        borderRadius: "50%",
        bg: "muted",
      }}
    />
  )
}
