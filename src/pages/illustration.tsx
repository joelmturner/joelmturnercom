import * as React from "react"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useLightboxNav } from "../hooks"
import Dialog from "../components/dialog"
import { InstaNode } from "."
import Flexbox from "../components/flexbox"
import { FaTh, FaThLarge, FaSquare } from "react-icons/fa"
import Gallery, { GallerySizes } from "../components/gallery"

type IllustrationProps = {
  data: {
    inktober2017: {
      edges: InstaNode[];
    };
    inktober2018: {
      edges: InstaNode[];
    };
    letterClash: {
      edges: InstaNode[];
    };
    joelmturner_abcs2017: {
      edges: InstaNode[];
    };
  };
}

type InstaCollections =
  | "inktober2017"
  | "inktober2018"
  | "letterClash"
  | "joelmturner_abcs2017"
  | null

type TabProps = {
  filter: InstaCollections;
  setFilter: (edge: any) => void;
  collectionName: InstaCollections;
  title: string;
}

function Tab({ filter, setFilter, collectionName = null, title }: TabProps) {
  let state = "default"
  if ((filter && filter == collectionName) || (!filter && !collectionName)) {
    state = "active"
  }
  return (
    <div
      sx={{ variant: `filter.tab.${state}` }}
      onClick={() => setFilter(collectionName)}
    >
      {title}
    </div>
  )
}

export default ({ data }: IllustrationProps): React.ReactElement => {
  const [sketchSize, setSketchSize] = React.useState<GallerySizes>("m")
  const [filter, setFilter] = React.useState<InstaCollections>("inktober2017")
  const { inktober2017: { edges: ink2017Edges = [] } = {} } = data
  const { inktober2018: { edges: ink2018Edges = [] } = {} } = data
  const { letterClash: { edges: letterClashEdges = [] } = {} } = data
  const { joelmturner_abcs2017: { edges: jmt2017Edges = [] } = {} } = data
  const filteredEdges = () => {
    switch (filter) {
      case "inktober2017":
        return ink2017Edges
      case "inktober2018":
        return ink2018Edges
      case "letterClash":
        return letterClashEdges
      case "joelmturner_abcs2017":
        return jmt2017Edges
      default:
        return [
          ...ink2017Edges,
          ...ink2018Edges,
          ...letterClashEdges,
          ...jmt2017Edges,
        ]
    }
  }

  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(
    filteredEdges()
  )

  return (
    <Layout>
      <SEO title="Illustration" />
      <Flexbox between middle>
        <Flexbox vertical>
          <Styled.h2>Illustrations</Styled.h2>
          <Flexbox
            left
            sx={{
              mt: 2,
              mb: 4,
              flexDirection: ["column", "row"],
              " & > * + *": {
                mt: [2, 0],
                ml: [0, 2],
                alignSelf: ["flex-start", "center"],
              },
            }}
          >
            <Tab
              title="Inktober 2017"
              setFilter={setFilter}
              collectionName="inktober2017"
              filter={filter}
            />
            <Tab
              title="Inktober 2018"
              setFilter={setFilter}
              collectionName="inktober2018"
              filter={filter}
            />
            <Tab
              title="#LetterClash"
              setFilter={setFilter}
              collectionName="letterClash"
              filter={filter}
            />
            <Tab
              title="#HandletteredABCs 2017"
              setFilter={setFilter}
              collectionName="joelmturner_abcs2017"
              filter={filter}
            />
          </Flexbox>
        </Flexbox>
        <Flexbox right>
          <FaTh
            sx={{ variant: sketchSize === "s" ? "icon.active" : "icon" }}
            onClick={() => setSketchSize("s")}
            size={24}
          />
          <FaThLarge
            sx={{ variant: sketchSize === "m" ? "icon.active" : "icon" }}
            onClick={() => setSketchSize("m")}
            size={24}
          />
          <FaSquare
            sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
            onClick={() => setSketchSize("l")}
            size={24}
          />
        </Flexbox>
      </Flexbox>
      <Gallery
        size={sketchSize}
        imageEdges={filteredEdges()}
        setLightbox={setLightbox}
      />

      {showLightbox && (
        <Dialog
          onClose={() => setLightbox(null)}
          maxWidth="700px"
          onPrev={() => setDir("prev")}
          onNext={() => setDir("next")}
        >
          {selectedImage && (
            <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />
          )}
        </Dialog>
      )}
    </Layout>
  )
}

export const query = graphql`
  fragment InstaNodes on InstagramContentEdge {
    node {
      id
      localImage {
        childImageSharp {
          fluid(maxWidth: 1248, maxHeight: 1248) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      images {
        standard_resolution {
          width
          height
          url
        }
      }
    }
  }
`

export const IllustrationPageQuery = graphql`
  query IllustrationPageQuery {
    inktober2017: allInstagramContent(
      filter: { tags: { glob: "ink*2017" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
    inktober2018: allInstagramContent(
      filter: { tags: { glob: "ink*2018" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
    letterClash: allInstagramContent(
      filter: { tags: { eq: "letterclash" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
    joelmturner_abcs2017: allInstagramContent(
      filter: { tags: { glob: "j*2017" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
`
