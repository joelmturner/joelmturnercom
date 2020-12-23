/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Img, { FluidObject } from "gatsby-image";
import { Link } from "gatsby";
import { ReactElement, ReactNode } from "react";

type PostCardProps = {
  slug: string;
  title: string;
  image: FluidObject;
  className?: string;
  excerpt?: string;
};

function Linked({
  slug,
  title,
  className,
  children,
}: Pick<PostCardProps, "slug" | "title" | "className"> & { children: ReactNode }) {
  return (
    <Link sx={{ variant: "link", textDecoration: "none" }} to={`${slug}`} key={title} className={className}>
      {children}
    </Link>
  );
}

function PostCard({ title, slug, image, className, excerpt }: PostCardProps): ReactElement {
  return (
    <div>
      <Linked slug={slug} title={title} className={className}>
        <Img fluid={image} sx={{ variant: "postCard.img" }} />
      </Linked>
      <Linked slug={slug} title={title} className={className}>
        <Styled.h2 sx={{ variant: "postCard.title" }} key={title}>
          {title}
        </Styled.h2>
      </Linked>
      <Styled.p sx={{ variant: "postCard.excerpt" }}>{excerpt}</Styled.p>
    </div>
  );
}

export default PostCard;
