/** @jsx jsx */
import { jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

type Part2Props = { user: string; className?: string };

const Part2: React.FC<Part2Props> = (props) => {
  const data = useStaticQuery(graphql`
    {
      monster1: file(relativePath: { eq: "monster-01-headshot.png" }) {
        childImageSharp {
          gatsbyImageData(width: 75, layout: FIXED)
        }
      }
      monster2: file(relativePath: { eq: "monster-02-headshot.png" }) {
        childImageSharp {
          gatsbyImageData(width: 75, layout: FIXED)
        }
      }
    }
  `);

  const image = data && data[props.user] && data[props.user].childImageSharp.gatsbyImageData;

  return (
    <GatsbyImage
      image={image}
      Tag="div"
      className={props.className}
      sx={{
        width: "75px",
        height: "75px",
        borderRadius: "50%",
        bg: "gray",
      }}
    />
  );
};

export default Part2;
