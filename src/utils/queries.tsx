import { graphql } from "gatsby"

export const query = graphql`
  fragment monsters on Query {
    monster1: file(relativePath: { eq: "monster-01-headshot.png" }) {
      childImageSharp {
        fixed(width: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    monster2: file(relativePath: { eq: "monster-02-headshot.png" }) {
      childImageSharp {
        fixed(width: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
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
  fragment inktober2019 on Query {
    inktober2019: allInstagramContent(
      filter: { tags: { glob: "ink*2019" } }
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
  fragment featuredInstaRecent on Query {
    featuredInstaRecent: allInstagramContent(
      filter: { tags: { eq: "joelmturner_featured" } }
      sort: { fields: likes___count, order: DESC }
      limit: 6
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
  fragment PostCard on MdxConnection {
    edges {
      node {
        frontmatter {
          title
          cover {
            childImageSharp {
              fluid(maxWidth: 731, maxHeight: 464) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          category
          tags
        }
        childMdxBlogPost {
          excerpt(pruneLength: 150)
          slug
        }
      }
    }
  }
  fragment allBlogPosts on Query {
    allBlogPosts: allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      ...PostCard
    }
  }
  fragment recentBlogPosts on Query {
    recentBlogPosts: allMdx(
      limit: 2
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      ...PostCard
    }
  }
`
