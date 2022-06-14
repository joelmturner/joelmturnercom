/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { Fragment, memo } from "react";
import Flexbox from "./flexbox2";
import Link from "./link";
import { slugify } from "../utils/utils";
import Grid from "./grid";
import { usePostNav } from "../hooks/usePostNav";

export const PostNav = memo(function PostNav({ slug }: { slug: string }) {
  const { previous, next } = usePostNav(slug);

  return (
    <Grid columns="1fr 1fr" gap={2}>
      <Fragment>
        {previous && (
          <Flexbox left>
            <Themed.p>
              <Link to={slugify(previous.slug, `/blog`)}>{`<-- ${previous.frontmatter.title}`}</Link>
            </Themed.p>
          </Flexbox>
        )}
        {next && (
          <Flexbox right>
            <Themed.p>
              <Link to={slugify(next.slug, `/blog`)}>{`${next.frontmatter.title} -->`}</Link>
            </Themed.p>
          </Flexbox>
        )}
      </Fragment>
    </Grid>
  );
});
