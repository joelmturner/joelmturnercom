/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { memo, ReactElement, ReactNode } from "react";

type PostCardProps = {
  slug: string;
  title: string;
  image: FluidObject;
  className?: string;
  excerpt?: string;
};

const Linked = memo(function Linked({
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
});

function PostCard({ title, slug, image, className, excerpt }: PostCardProps): ReactElement {
  return (
    <article>
      <Linked slug={slug} title={title} className={className}>
        <GatsbyImage image={image} sx={{ variant: "postCard.img" }} alt={title} />
      </Linked>
      <Linked slug={slug} title={title} className={className}>
        <Themed.h2 sx={{ variant: "postCard.title" }} key={title}>
          {title}
        </Themed.h2>
      </Linked>
      <Themed.p sx={{ variant: "postCard.excerpt" }}>{excerpt}</Themed.p>
    </article>
  );
}

export default memo(PostCard);
