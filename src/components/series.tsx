/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Flexbox } from "."
import { Link } from "gatsby"

type SeriesProps = {
  links: Array<{ slug: string; title: string }>;
  title: string;
}

export default ({ links, title, ...props }: SeriesProps) => (
  <Flexbox {...props} vertical sx={{ p: 2, my: 3, border: "1px solid", borderColor: "muted", borderRadius: ".25rem" }}>
    <Styled.p sx={{ mb: 2, fontSize: 2, color: "textMuted" }}>
      This post is part of the <strong>{title}</strong> series
    </Styled.p>
    {links.map(link => (
      <Link
        key={link.slug}
        to={link.slug}
        sx={{ variant: "post.link" }}
        activeClassName="active"
        partiallyActive={true}
      >
        {link.title}
      </Link>
    ))}
  </Flexbox>
)