/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { Link } from "gatsby";
import { memo, ReactElement, ReactNode } from "react";

type PostCardProps = {
  slug: string;
  title: string;
  className?: string;
  excerpt?: string;
  tags?: string[];
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

function PostCard({ title, slug, className, excerpt, tags }: PostCardProps): ReactElement {
  return (
    <article>
      <Linked slug={slug} title={title} className={className}>
        <Themed.h2 sx={{ variant: "postCard.title" }} key={title}>
          {title}
        </Themed.h2>
      </Linked>
      {tags?.length ? <Themed.p sx={{ variant: "postCard.tags" }}>{tags.join(", ")}</Themed.p> : null}
      <Themed.p sx={{ variant: "postCard.excerpt" }}>{excerpt}</Themed.p>
    </article>
  );
}

export default memo(PostCard);
