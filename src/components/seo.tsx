import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Schema } from "."

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: Array<{
    name: string;
    content: string;
    property: string;
  }>;
  title?: string;
  image?: string; // full path to image
  isBlogPost?: boolean;
  datePublished?: string;
  dateModified?: string;
}

function SEO({
  description,
  lang,
  meta = [],
  title = "",
  image,
  isBlogPost = false,
  datePublished,
  dateModified,
}: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const metaImage = image ? image : `https://res.cloudinary.com/joelmturner/joel-turner.jpg`

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            name: `image`,
            content: metaImage,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: isBlogPost ? `article` : `website`,
          },
          {
            property: `og:image`,
            content: metaImage,
          },
          {
            property: "og:image:alt",
            content: `joel m turner portrait`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:image`,
            content: metaImage,
          },
          {
            property: "twitter:image:alt",
            content: `joel m turner portrait`,
          },
        ].concat(meta as any)}
      />
      <Schema
        isBlogPost={isBlogPost}
        url={site.siteMetadata.url}
        title={title}
        image={metaImage}
        description={metaDescription}
        datePublished={datePublished || ""}
        dateModified={dateModified || ""}
        canonicalUrl={site.siteMetadata.url}
        author={site.siteMetadata.author}
        defaultTitle={title}
      />
    </>
  )
}

export default SEO
