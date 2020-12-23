import { jsx } from "theme-ui";
import { FC } from "react";
import { graphql } from "gatsby";
import Tils from "../../components/tils";

const TilsRenderer: FC<any> = (props) => {
  return jsx(Tils, {
    ...props,
  });
};

export default TilsRenderer;

export const tilsQuery = graphql`
  query NotesQuery {
    ...allTil
  }
`;
