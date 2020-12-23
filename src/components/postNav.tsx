/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { Fragment } from "react";
import Flexbox from "./flexbox";
import Link from "./link";
import { slugify } from "../utils/utils";
import Grid from "./grid";
import { usePostNav } from "../hooks/usePostNav";

export function PostNav({ slug }: { slug: string }) {
  const { previous, next } = usePostNav(slug);

  return (
    <Grid columns="1fr 1fr" gap={2}>
      <Fragment>
        {previous && (
          <Flexbox left>
            <Styled.p>
              <Link to={slugify(previous.slug, `/blog`)}>{`<-- ${previous.frontmatter.title}`}</Link>
            </Styled.p>
          </Flexbox>
        )}
        {next && (
          <Flexbox right>
            <Styled.p>
              <Link to={slugify(next.slug, `/blog`)}>{`${next.frontmatter.title} -->`}</Link>
            </Styled.p>
          </Flexbox>
        )}
      </Fragment>
    </Grid>
  );
}
