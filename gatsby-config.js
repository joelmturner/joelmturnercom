module.exports = {
  siteMetadata: {
    title: `Joel M. Turner`,
    description: `I'm a kombucha lovin' Front-End Dev at Sprinklr. Love lettering, love design, love development, love Portland.`,
    author: `@joelmturner`,
    siteUrl: "https://joelmturner.com",
    social: [
      { name: "Twitter", url: "https://twitter.com/joelmturner" },
      { name: "Instagram", url: "https://www.instagram.com/joelmturner" },
      { name: "GitHub", url: "https://github.com/joelmturner" },
    ],
    keywords: [
      "react",
      "reactjs",
      "javascript",
      "typescript",
      "developer",
      "css",
      "illustration",
      "sketch",
      "handlettering",
      "portland",
      "gatsby",
      "gatsbyjs",
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Joel M. Turner`,
        short_name: `Joel M. Turner`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#121212`,
        display: `standalone`,
        icon: `src/images/joel-turner-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-catch-links`,
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-theme-ui-blog",
      options: {
        basePath: "/blog/",
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allBlogPost } }) => {
              return allBlogPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.body }],
                })
              })
            },
            query: `
                {
                  allBlogPost(sort: {fields: [title, date], order: DESC}) {
                    edges {
                      node {
                        title
                        slug
                        excerpt
                        body
                        date
                      }
                    }
                  }
                }
              `,
            output: "/rss.xml",
            title: "joelmturner.com RSS feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: "***REMOVED***",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/category`, `/tags`],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-theme-notes`,
      options: {
        // basePath defaults to `/`
        basePath: `/notes`,
        mdx: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
