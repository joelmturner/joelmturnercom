/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Flexbox from "./flexbox";
import { Link } from "gatsby";

type PostSeriesProps = {
  series: string;
  order: number;
  postsInSeries?: { title: string; slug: string }[];
};

const PostSeries: React.FC<PostSeriesProps> = ({ series, order, postsInSeries }) => {
  if (!series) return null;
  return (
    <Flexbox vertical sx={{ borderColor: "textMuted", borderWidth: "1px", borderStyle: "dotted", my: 3 }}>
      <Styled.h4
        sx={{
          m: 0,
          p: 2,
          color: "textMuted",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "textMuted",
          fontSize: 1,
        }}
      >
        {`This is part ${order + 1} of the `}
        <span sx={{ color: "text" }}>{series}</span>
        {` series`}
      </Styled.h4>
      <Styled.ol sx={{ m: 0, listStyle: "none" }}>
        {postsInSeries?.map((post, index) => {
          if (index === order) {
            return (
              <Styled.li
                sx={{ bg: "backgroundSubtle", p: 1, pl: 3, m: 0, fontSize: 1, letterSpacing: "1px" }}
                key={post.slug}
              >
                {`${index + 1}) ${post.title}`}
              </Styled.li>
            );
          }
          return (
            <Link key={post.slug} to={`/blog/${post.slug}`} sx={{ variant: "link" }}>
              <Styled.li sx={{ p: 1, pl: 3, m: 0, fontSize: 1, letterSpacing: "1px" }}>{`${index + 1}) ${
                post.title
              }`}</Styled.li>
            </Link>
          );
        })}
      </Styled.ol>
    </Flexbox>
  );
};

PostSeries.displayName = "PostSeries";
export default PostSeries;
