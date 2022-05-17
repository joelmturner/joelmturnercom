/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { graphql } from "gatsby";
import { Layout, SEO, Flexbox, Gallery } from "../components";
import { FaTh, FaThLarge, FaSquare } from "react-icons/fa";
import { InstaNode } from ".";
import { RouteComponentProps } from "@reach/router";
import { GallerySizes } from "../components/gallery";
import { handleEnterKeyPress } from "../utils/a11y";
import { FC, useCallback, useMemo, useState } from "react";
import loadable from "@loadable/component";
const Dropdown = loadable(() => import("../components"), { resolveComponent: (components) => components.Dropdown });
const Dialog = loadable(() => import("../components"), { resolveComponent: (components) => components.Dialog });

const GALLERY_MENU_OPTIONS = [
  { value: "featuredInsta", label: "Featured" },
  { value: "inktober2017", label: "Inktober 2017" },
  { value: "inktober2018", label: "Inktober 2018" },
  { value: "inktober2019", label: "Inktober 2019" },
  { value: "inktober2021", label: "Inktober 2021" },
  { value: "letterClash", label: "LetterClash" },
  { value: "joelmturner_abcs2017", label: "#HandletteredABCs 2017" },
];

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
    inktober2021: {
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
  | "inktober2021"
  | "letterClash"
  | "joelmturner_abcs2017"
  | "recentInsta"
  | "insta2016"
  | null;

const Illustration: FC<IllustrationProps> = ({ data, location }) => {
  const [sketchSize, setSketchSize] = useState<GallerySizes>("m");
  const [offset, setOffset] = useState(-1);
  const hash: InstaCollections = location?.hash
    ? (location.hash.replace("#", "") as InstaCollections)
    : ("featuredInsta" as InstaCollections);

  const [filter, setFilter] = useState<InstaCollections>(hash);
  const {
    featuredInsta: { nodes: featuredEdges = [] } = {},
    inktober2017: { nodes: ink2017Edges = [] } = {},
    inktober2018: { nodes: ink2018Edges = [] } = {},
    inktober2019: { nodes: ink2019Edges = [] } = {},
    inktober2021: { nodes: ink2021Edges = [] } = {},
    letterClash: { nodes: letterClashEdges = [] } = {},
    joelmturner_abcs2017: { nodes: jmt2017Edges = [] } = {},
  } = data;

  const filteredEdges = useMemo(
    function () {
      switch (filter) {
        default:
        case "featuredInsta":
          return featuredEdges;
        case "inktober2017":
          return ink2017Edges;
        case "inktober2018":
          return ink2018Edges;
        case "inktober2019":
          return ink2019Edges;
        case "inktober2021":
          return ink2021Edges;
        case "letterClash":
          return letterClashEdges;
        case "joelmturner_abcs2017":
          return jmt2017Edges;
      }
    },
    [filter, featuredEdges, ink2017Edges, ink2018Edges, ink2019Edges, ink2021Edges, letterClashEdges, jmt2017Edges]
  );

  const handleSetOffset = useCallback(
    (edge: InstaNode) => {
      setOffset(filteredEdges.indexOf(edge));
    },
    [setOffset, filteredEdges]
  );

  const handleClose = useCallback(() => {
    setOffset(-1);
  }, [setOffset]);

  const handleChange = useCallback(
    (selected: { value: InstaCollections; label: string }) => {
      setFilter(selected.value);
    },
    [setFilter]
  );

  const selectedMenuOption = useMemo(() => GALLERY_MENU_OPTIONS.find((opt) => opt.value === filter), [filter]);

  return (
    <Layout>
      <SEO title="Illustration" />
      <Flexbox vertical>
        <Themed.h2>Explorations of Handlettering and Illustration</Themed.h2>
        <Flexbox between middle>
          <Dropdown
            options={GALLERY_MENU_OPTIONS}
            selected={selectedMenuOption}
            onChange={handleChange}
            aria-label="select filter for instagram images"
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
      <Gallery size={sketchSize} imageEdges={filteredEdges} setLightbox={handleSetOffset} sx={{ my: 3 }} />

      {offset > -1 && (
        <Dialog
          imageEdges={filteredEdges}
          offset={offset}
          onClose={handleClose}
          aria-label="Gallery of my sketches on Instagram"
        />
      )}
    </Layout>
  );
};

export const IllustrationPageQuery = graphql`
  query IllustrationPageQuery {
    ...featuredInsta
    ...inktober2017
    ...inktober2018
    ...inktober2019
    ...inktober2021
    ...letterClash
    ...joelmturner_abcs2017
  }
`;

export default Illustration;
