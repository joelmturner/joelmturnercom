import * as React from "react"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Layout, SEO, Dialog, Flexbox, Gallery, GallerySizes } from "../components"
import { useLightboxNav } from "../hooks"
import { FaTh, FaThLarge, FaSquare } from "react-icons/fa"
import { InstaNode } from "."
import { Dropdown } from "../components"

type IllustrationProps = {
  data: {
    featuredInsta: {
      edges: InstaNode[];
    };
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

export type InstaCollections =
  | "featuredInsta"
  | "inktober2017"
  | "inktober2018"
  | "letterClash"
  | "joelmturner_abcs2017"
  | "recentInsta"
  | "insta2016"
  | null

type TabProps = {
  filter: InstaCollections;
  setFilter: (collection: InstaCollections) => void;
  collectionName: InstaCollections;
  title: string;
}

function Tab({ filter, setFilter, collectionName = null, title }: TabProps) {
  let state = "default"
  if ((filter && filter == collectionName) || (!filter && !collectionName)) {
    state = "active"
  }
  return (
    <div sx={{ variant: `filter.tab.${state}` }} onClick={() => setFilter(collectionName)}>
      {title}
    </div>
  )
}

export default ({ data }: IllustrationProps): React.ReactElement => {
  const [sketchSize, setSketchSize] = React.useState<GallerySizes>("m")
  const [filter, setFilter] = React.useState<InstaCollections>("featuredInsta")
  const {
    featuredInsta: { edges: featuredEdges = [] } = {},
    inktober2017: { edges: ink2017Edges = [] } = {},
    inktober2018: { edges: ink2018Edges = [] } = {},
    letterClash: { edges: letterClashEdges = [] } = {},
    joelmturner_abcs2017: { edges: jmt2017Edges = [] } = {},
  } = data
  const filteredEdges = () => {
    switch (filter) {
      case "featuredInsta":
        return featuredEdges
      case "inktober2017":
        return ink2017Edges
      case "inktober2018":
        return ink2018Edges
      case "letterClash":
        return letterClashEdges
      case "joelmturner_abcs2017":
        return jmt2017Edges
      default:
        return [...featuredEdges, ...ink2017Edges, ...ink2018Edges, ...letterClashEdges, ...jmt2017Edges]
    }
  }

  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(filteredEdges())
  const galleryOptions = [
    { value: "featuredInsta", label: "Featured" },
    { value: "inktober2017", label: "Inktober 2017" },
    { value: "inktober2018", label: "Inktober 2018" },
    { value: "letterClash", label: "LetterClash" },
    { value: "joelmturner_abcs2017", label: "#HandletteredABCs 2017" },
  ]
  return (
    <Layout>
      <SEO title="Illustration" />
      <Flexbox vertical>
        <Styled.h2>Explorations of Handlettering and Illustration</Styled.h2>
        <Flexbox between middle>
          <Dropdown
            options={galleryOptions}
            selected={galleryOptions.find(opt => opt.value === filter)}
            onChange={selected => setFilter(selected.value)}
            sx={{ display: ["block", "block", "block", "none"] }}
          />
          <Flexbox
            left
            middle
            sx={{
              flexDirection: ["column", "row"],
              display: ["none", "none", "none", "flex"],
              " & > * + *": {
                mt: [2, 0],
                ml: [0, 2],
                alignSelf: ["flex-start", "center"],
              },
            }}
          >
            <Tab title="Featured" setFilter={setFilter} collectionName="featuredInsta" filter={filter} />
            <Tab title="Inktober 2017" setFilter={setFilter} collectionName="inktober2017" filter={filter} />
            <Tab title="Inktober 2018" setFilter={setFilter} collectionName="inktober2018" filter={filter} />
            <Tab title="#LetterClash" setFilter={setFilter} collectionName="letterClash" filter={filter} />
            <Tab
              title="#HandletteredABCs 2017"
              setFilter={setFilter}
              collectionName="joelmturner_abcs2017"
              filter={filter}
            />
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
      </Flexbox>
      <Gallery size={sketchSize} imageEdges={filteredEdges()} setLightbox={setLightbox} sx={{ my: 3 }} />

      {showLightbox && (
        <Dialog onClose={() => setLightbox(null)} onPrev={() => setDir("prev")} onNext={() => setDir("next")}>
          {!!selectedImage && <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />}
        </Dialog>
      )}
    </Layout>
  )
}

export const IllustrationPageQuery = graphql`
  query IllustrationPageQuery {
    ...featuredInsta
    ...inktober2017
    ...inktober2018
    ...letterClash
    ...joelmturner_abcs2017
  }
`
