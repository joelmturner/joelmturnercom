/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Img, { FluidObject } from "gatsby-image"
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
      <Img fluid={image} sx={{ variant: "postCard.img" }} />
      <Styled.h2 sx={{ variant: "postCard.title" }} key={title}>
        {title}
      </Styled.h2>
    </Link>
  )
}
