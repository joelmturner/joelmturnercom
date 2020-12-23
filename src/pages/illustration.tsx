/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import { Layout, SEO, Dialog, Flexbox, Gallery } from "../components";
import { FaTh, FaThLarge, FaSquare } from "react-icons/fa";
import { InstaNode } from ".";
import { Dropdown } from "../components";
import { RouteComponentProps } from "@reach/router";
import { GallerySizes } from "../components/gallery";
import { handleEnterKeyPress } from "../utils/a11y";
import { useCallback, useState } from "react";

type IllustrationProps = {
  location: RouteComponentProps["location"];
  data: {
    featuredInsta: {
      nodes: InstaNode[];
    };
    inktober2017: {
      nodes: InstaNode[];
    };
    inktober2018: {
      nodes: InstaNode[];
    };
    inktober2019: {
      nodes: InstaNode[];
    };
    letterClash: {
      nodes: InstaNode[];
    };
    joelmturner_abcs2017: {
      nodes: InstaNode[];
    };
  };
};

export type InstaCollections =
  | "featuredInsta"
  | "inktober2017"
  | "inktober2018"
  | "inktober2019"
  | "letterClash"
  | "joelmturner_abcs2017"
  | "recentInsta"
  | "insta2016"
  | null;

const Illustration: React.FC<IllustrationProps> = ({ data, location }) => {
  const [sketchSize, setSketchSize] = useState<GallerySizes>("m");
  const [offset, setOffset] = useState(-1);
  const hash: InstaCollections =
    location && location.hash ? (location.hash.replace("#", "") as InstaCollections) : "featuredInsta";
  const [filter, setFilter] = useState<InstaCollections>(hash);
  const {
    featuredInsta: { nodes: featuredEdges = [] } = {},
    inktober2017: { nodes: ink2017Edges = [] } = {},
    inktober2018: { nodes: ink2018Edges = [] } = {},
    inktober2019: { nodes: ink2019Edges = [] } = {},
    letterClash: { nodes: letterClashEdges = [] } = {},
    joelmturner_abcs2017: { nodes: jmt2017Edges = [] } = {},
  } = data;

  const filteredEdges = useCallback(
    function () {
      switch (filter) {
        case "featuredInsta":
          return featuredEdges;
        case "inktober2017":
          return ink2017Edges;
        case "inktober2018":
          return ink2018Edges;
        case "inktober2019":
          return ink2019Edges;
        case "letterClash":
          return letterClashEdges;
        case "joelmturner_abcs2017":
          return jmt2017Edges;
        default:
          return [
            ...featuredEdges,
            ...ink2017Edges,
            ...ink2018Edges,
            ...ink2019Edges,
            ...letterClashEdges,
            ...jmt2017Edges,
          ];
      }
    },
    [filter, featuredEdges, ink2017Edges, ink2018Edges, ink2019Edges, letterClashEdges, jmt2017Edges]
  );

  const handleSetOffset = useCallback(
    (edge) => {
      setOffset(filteredEdges().indexOf(edge));
    },
    [setOffset, filteredEdges]
  );

  const galleryOptions = [
    { value: "featuredInsta", label: "Featured" },
    { value: "inktober2017", label: "Inktober 2017" },
    { value: "inktober2018", label: "Inktober 2018" },
    { value: "inktober2019", label: "Inktober 2019" },
    { value: "letterClash", label: "LetterClash" },
    { value: "joelmturner_abcs2017", label: "#HandletteredABCs 2017" },
  ];

  const handleClose = useCallback(() => {
    setOffset(-1);
  }, [setOffset]);

  return (
    <Layout>
      <SEO title="Illustration" />
      <Flexbox vertical>
        <Styled.h2>Explorations of Handlettering and Illustration</Styled.h2>
        <Flexbox between middle>
          <Dropdown
            options={galleryOptions}
            selected={galleryOptions.find((opt) => opt.value === filter)}
            onChange={(selected) => setFilter(selected.value)}
          />
          <Flexbox right>
            <FaTh
              sx={{ variant: sketchSize === "s" ? "icon.active" : "icon" }}
              onClick={() => setSketchSize("s")}
              size={24}
              role="switch"
              aria-checked={sketchSize === "s"}
              tabIndex={0}
              onKeyPress={handleEnterKeyPress(() => setSketchSize("s"))}
            />
            <FaThLarge
              sx={{ variant: sketchSize === "m" ? "icon.active" : "icon" }}
              onClick={() => setSketchSize("m")}
              size={24}
              role="switch"
              aria-checked={sketchSize === "m"}
              tabIndex={0}
              onKeyPress={handleEnterKeyPress(() => setSketchSize("m"))}
            />
            <FaSquare
              sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
              onClick={() => setSketchSize("l")}
              size={24}
              role="switch"
              aria-checked={sketchSize === "l"}
              tabIndex={0}
              onKeyPress={handleEnterKeyPress(() => setSketchSize("l"))}
            />
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Gallery size={sketchSize} imageEdges={filteredEdges()} setLightbox={handleSetOffset} sx={{ my: 3 }} />

      {/* {showLightbox && ( */}
      {offset > -1 && (
        <Dialog
          imageEdges={filteredEdges()}
          offset={offset}
          onClose={handleClose}
          aria-label="Gallery of my sketches on Instagram"
        />
      )}
      {/* )} */}
    </Layout>
  );
};

export const IllustrationPageQuery = graphql`
  query IllustrationPageQuery {
    ...featuredInsta
    ...inktober2017
    ...inktober2018
    ...inktober2019
    ...letterClash
    ...joelmturner_abcs2017
  }
`;

export default Illustration;
