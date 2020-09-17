/** @jsx jsx */
import { jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

type AvatarProps = {
  user?: "monster1" | "monster2";
  className?: string;
  size?: "s" | "l";
};

const Avatar: React.FC<AvatarProps> = ({ user, className, size = "s" }) => {
  const data = useStaticQuery(graphql`
    query {
      ...monsters
      joel: file(relativePath: { eq: "joel-turner-headshot-web.jpg" }) {
        childImageSharp {
          fixed(height: 55, width: 55) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      joelLarge: file(relativePath: { eq: "joel-turner-headshot-web.jpg" }) {
        childImageSharp {
          fixed(height: 300, width: 300) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `);

  const sized = size === "s" ? "joel" : "joelLarge";

  const image = data && data[user || sized] && data[user || sized].childImageSharp.fixed;

  return (
    <Img
      Tag="div"
      className={className}
      fixed={image}
      loading="eager"
      fadeIn={false}
      sx={{
        bg: "text",
        width: "75px",
        height: "75px",
        m: 0,
        borderRadius: "50%",
      }}
    />
  );
};

export default Avatar;
