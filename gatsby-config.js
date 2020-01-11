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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node, {
                  title: node.frontmatter.title,
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + `/blog/${node.frontmatter.slug}`,
                  guid: site.siteMetadata.siteUrl + `/blog/${node.frontmatter.slug}`,
                  image: site.siteMetadata.siteUrl + node.frontmatter.cover.publicURL,
                  category: [node.frontmatter.category],
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
                {
                  allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {fileAbsolutePath: {glob: "**/posts/**"}}) {
                    nodes {
                      id
                      frontmatter {
                        slug
                        title
                        category
                        cover {
                          publicURL
                        }
                        date
                      }
                      html
                      excerpt
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
    // TODO JT try to figure this one out
    // getting the error Cannot read property 'edges' of undefined
    // {
    //   resolve: `gatsby-plugin-sitemap`,
    //   options: {
    //     exclude: [`/category/*`, `/tag/*`, `/blog`],
    //     query: `
    //     {
    //       site {
    //         siteMetadata {
    //           siteUrl
    //         }
    //       }

    //       allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {fileAbsolutePath: {glob: "**/posts/**"}}) {
    //           edges {
    //               node {
    //                 id
    //                 frontmatter {
    //                   slug
    //                 }
    //               }
    //           }
    //       }
    //   }`,
    //     serialize: ({ site, allMdx }) =>
    //       allMdx.edges.map(edge => {
    //         return {
    //           url: site.siteMetadata.siteUrl + `/blog/${edge.node.frontmatter.slug}`,
    //           changefreq: `daily`,
    //           priority: 0.7,
    //         }
    //       }),
    //   },
    // },
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "***REMOVED***",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //   optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //   experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //   variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
      },
    },
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
