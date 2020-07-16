/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Img, { FluidObject } from "gatsby-image"
import { Link } from "gatsby"

type PostCardProps = {
  slug: string;
  title: string;
  image: FluidObject;
  className?: string;
  excerpt?: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, slug, image, className, excerpt }) => {
  return (
    <Link sx={{ variant: "link", textDecoration: "none" }} to={`${slug}`} key={title} className={className}>
      <Img fluid={image} sx={{ variant: "postCard.img" }} width={441} height={280} />
      <Styled.h2 sx={{ variant: "postCard.title" }} key={title}>
        {title}
      </Styled.h2>
      <Styled.p sx={{ variant: "postCard.excerpt" }}>{excerpt}</Styled.p>
    </Link>
  )
}

export default PostCard;