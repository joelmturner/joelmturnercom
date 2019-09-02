/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "joel-turner-headshot-web.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageData = data.placeholderImage.childImageSharp.fluid
  return (
    imageData && (
      <BackgroundImage
        Tag="div"
        className={props.className}
        fluid={imageData}
        sx={{
          width: "4rem",
          height: "4rem",
          margin: 0,
          borderRadius: "50%",
          clipPath: "circle(50%)",
        }}
      />
    )
  )
}
