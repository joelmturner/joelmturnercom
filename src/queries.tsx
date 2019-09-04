import { graphql } from "gatsby"

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
  fragment inktober2017 on Query {
    inktober2017: allInstagramContent(
      filter: { tags: { glob: "ink*2017" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
  fragment inktober2018 on Query {
    inktober2018: allInstagramContent(
      filter: { tags: { glob: "ink*2018" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
  fragment letterClash on Query {
    letterClash: allInstagramContent(
      filter: { tags: { eq: "letterclash" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
  fragment joelmturner_abcs2017 on Query {
    joelmturner_abcs2017: allInstagramContent(
      filter: { tags: { glob: "j*2017" } }
      sort: { fields: created_time, order: ASC }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
  fragment featuredInsta on Query {
    featuredInsta: allInstagramContent(
      filter: { tags: { eq: "joelmturner_featured" } }
      sort: { fields: likes___count, order: DESC }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
  fragment insta2016 on Query {
    insta2016: allInstagramContent(
      sort: { fields: created_time, order: DESC }
      filter: { created_time: { regex: "/(145|146|147|148)[0-9]+/g" }, tags: { glob: "handletteredabcs_2016" } }
    ) {
      edges {
        ...InstaNodes
      }
    }
  }
  fragment recentInsta on Query {
    recentInsta: allInstagramContent(sort: { fields: created_time, order: DESC }, limit: 18) {
      edges {
        ...InstaNodes
      }
    }
  }
`
