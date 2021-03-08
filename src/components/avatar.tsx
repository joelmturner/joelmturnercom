/** @jsx jsx */
import { jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

type AvatarProps = {
  user?: "monster1" | "monster2";
  className?: string;
  size?: "s" | "l";
};

const Avatar: React.FC<AvatarProps> = ({ user, className, size = "s" }) => {
  const data = useStaticQuery(graphql`
    {
      joel: file(relativePath: { eq: "joel-turner-headshot-web.jpg" }) {
        childImageSharp {
          gatsbyImageData(height: 55, width: 55, placeholder: NONE, layout: FIXED)
        }
      }
      joelLarge: file(relativePath: { eq: "joel-turner-headshot-web.jpg" }) {
        childImageSharp {
          gatsbyImageData(height: 300, width: 300, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const sized = size === "s" ? "joel" : "joelLarge";

  const image = data?.[user || sized]?.childImageSharp.gatsbyImageData;

  return (
    <GatsbyImage
      image={image}
      className={className}
      loading="eager"
      alt="avatar"
      data-testid="avatar"
      sx={{
        bg: "backgroundSubtle",
        width: "75px",
        height: "75px",
        m: 0,
        borderRadius: "50%",
        // fix for safari rounded images with transitions
        zIndex: 10,
        img: {
          zIndex: -10,
        },
      }}
    />
  );
};

export default Avatar;
