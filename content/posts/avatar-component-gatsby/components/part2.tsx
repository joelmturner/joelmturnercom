/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

type Part2Props = { user: string; className?: string };

const Part2: React.FC<Part2Props> = (props) => {
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
        bg: "gray",
      }}
    />
  )
}

export default Part2;