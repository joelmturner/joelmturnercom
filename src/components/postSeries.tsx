/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import Flexbox from "./flexbox2";
import { Link } from "gatsby";
import { slugify } from "../utils/utils";
import { FC, memo } from "react";

type PostSeriesProps = {
  series: string;
  order: number;
  postsInSeries?: { title: string; slug: string }[];
};

const PostSeries: FC<PostSeriesProps> = ({ series, order, postsInSeries }) => {
  if (!series) return null;
  return (
    <Flexbox vertical sx={{ borderColor: "textMuted", borderWidth: "1px", borderStyle: "dotted", my: 3 }}>
      <Themed.h4
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
      </Themed.h4>
      <Themed.ol sx={{ m: 0, listStyle: "none" }}>
        {postsInSeries?.map((post, index) => {
          if (index === order) {
            return (
              <Themed.li
                sx={{ bg: "backgroundSubtle", p: 1, pl: 3, m: 0, fontSize: 1, letterSpacing: "1px" }}
                key={post.slug}
              >
                {`${index + 1}) ${post.title}`}
              </Themed.li>
            );
          }
          return (
            <Link key={post.slug} to={slugify(post.slug, "/blog")} sx={{ variant: "link" }}>
              <Themed.li sx={{ p: 1, pl: 3, m: 0, fontSize: 1, letterSpacing: "1px" }}>{`${index + 1}) ${
                post.title
              }`}</Themed.li>
            </Link>
          );
        })}
      </Themed.ol>
    </Flexbox>
  );
};

PostSeries.displayName = "PostSeries";
export default memo(PostSeries);
