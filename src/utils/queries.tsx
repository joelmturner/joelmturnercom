import { graphql } from "gatsby";

export const query = graphql`
  fragment monsters on Query {
    monster1: file(relativePath: { eq: "monster-01-headshot.png" }) {
      childImageSharp {
        gatsbyImageData(width: 75, placeholder: NONE, layout: FIXED)
      }
    }
    monster2: file(relativePath: { eq: "monster-02-headshot.png" }) {
      childImageSharp {
        gatsbyImageData(width: 75, placeholder: NONE, layout: FIXED)
      }
    }
  }

  fragment InstaNodes on CloudinaryMedia {
    id
    url
  }

  fragment PostCard on MdxConnection {
    edges {
      node {
        slug
        excerpt
        frontmatter {
          title
          cover {
            childImageSharp {
              gatsbyImageData(width: 731, height: 464, placeholder: NONE, layout: CONSTRAINED)
            }
          }
          series
          order
          category
          tags
        }
      }
    }
  }

  fragment allBlogPosts on Query {
    allBlogPosts: allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { draft: { eq: false } }, fileAbsolutePath: { regex: "/content/blog/" } }
    ) {
      ...PostCard
    }
  }

  fragment recentBlogPosts on Query {
    recentBlogPosts: allMdx(
      limit: 2
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: { frontmatter: { draft: { eq: false } }, fileAbsolutePath: { regex: "/content/blog/" } }
    ) {
      ...PostCard
    }
  }

  fragment allTil on Query {
    allTil: allMdx(sort: { fields: slug, order: DESC }, filter: { fileAbsolutePath: { regex: "/content/til/" } }) {
      nodes {
        body
        frontmatter {
          category
          slug
          tags
          title
        }
      }
    }
  }

  fragment inktober2017 on Query {
    inktober2017: allCloudinaryMedia(
      filter: { tags: { in: "inktober2017" } }
      sort: { fields: public_id, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment inktober2018 on Query {
    inktober2018: allCloudinaryMedia(
      filter: { tags: { in: "inktober2018" } }
      sort: { fields: public_id, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment inktober2019 on Query {
    inktober2019: allCloudinaryMedia(
      filter: { tags: { in: "inktober2019" } }
      sort: { fields: public_id, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment letterClash on Query {
    letterClash: allCloudinaryMedia(filter: { tags: { in: "letterclash" } }, sort: { fields: public_id, order: ASC }) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment joelmturner_abcs2017 on Query {
    joelmturner_abcs2017: allCloudinaryMedia(
      filter: { tags: { in: "joelmturner_abcs2017" } }
      sort: { fields: public_id, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment featuredInsta on Query {
    featuredInsta: allCloudinaryMedia(
      filter: { tags: { in: "joelmturner_featured" } }
      sort: { fields: public_id, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment featuredInstaRecent on Query {
    featuredInstaRecent: allCloudinaryMedia(filter: { tags: { in: "joelmturner_featured" } }, limit: 6) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment insta2016 on Query {
    insta2016: allCloudinaryMedia(
      filter: { tags: { in: "handletteredabcs2016" } }
      sort: { fields: public_id, order: ASC }
    ) {
      nodes {
        ...InstaNodes
      }
    }
  }

  fragment recentInsta on Query {
    recentInsta: allCloudinaryMedia(sort: { fields: public_id, order: DESC }, limit: 18) {
      nodes {
        ...InstaNodes
      }
    }
  }
`;
