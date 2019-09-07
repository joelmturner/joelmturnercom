/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FluidObject } from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import { Link } from "gatsby"

type PostCardProps = {
  slug: string;
  title: string;
  image: FluidObject;
  className?: string;
}

export default ({ title, slug, image, className }: PostCardProps): JSX.Element => {
  return (
    <Link sx={{ variant: "link", textDecoration: "none" }} to={`${slug}`} key={title} className={className}>
      <BackgroundImage Tag="div" fluid={image} sx={{ variant: "postCard.background" }} />
      <Styled.h2 sx={{ variant: "postCard.title" }} key={title}>
        {title}
      </Styled.h2>
    </Link>
  )
}
