require("dotenv").config();
module.exports = {
  flags: {
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    PARALLEL_QUERY_RUNNING: true,
    DETECT_NODE_MUTATIONS: true,
  },
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
    // `gatsby-plugin-ts-config`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "nightOwl",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `page-partials`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `til`,
        path: `${__dirname}/content/til`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        prefix: `illustration/`,
        tags: true,
        maxResults: 1000,
      },
    },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 948,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
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
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: ***REMOVED***,
        sampleRate: 0.7,
        tracesSampleRate: 1,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://joelmturner.com",
        sitemap: "https://joelmturner.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    // throwing TypeError: Cannot read property 'nodes' of undefined
    // {
    //   resolve: `gatsby-plugin-sitemap`,
    //   options: {
    //     output: `/sitemap.xml`,
    //     // Exclude specific pages or groups of pages using glob parameters
    //     // See: https://github.com/isaacs/minimatch
    //     // The example below will exclude the single `path/to/page` and all routes beginning with `category`
    //     excludes: [`category/*`, `tag/*`, `til/null/*`],
    //     query: `
    //     {
    //       site {
    //         siteMetadata {
    //           siteUrl
    //         }
    //       }
    //       allSitePage {
    //         nodes {
    //           path
    //         }
    //       }
    //   }`,
    //     resolveSiteUrl: ({ site }) => {
    //       //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
    //       return site.siteMetadata.siteUrl;
    //     },
    //     serialize: ({ site, allSitePage }) =>
    //       allSitePage.nodes.map((node) => {
    //         return {
    //           url: `${site.siteMetadata.siteUrl}${node.path}`,
    //           changefreq: `daily`,
    //           priority: 0.7,
    //         };
    //       }),
    //   },
    // },
    // throwing error for some reason
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
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
                  //   custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `
                {
                    allMdx(
                        sort: {order: DESC, fields: frontmatter___date}
                        filter: { fileAbsolutePath: {regex: "/\/content/blog\/g"}}
                      ) {
                        nodes {
                          excerpt
                          frontmatter {
                            title
                            date
                            category
                          }
                          slug
                        }
                      }
                }
              `,
            output: "/rss.xml",
            title: "joelmturner.com's RSS Feed",
            site_url: "https://joelmturner.com",
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GA_TRACKING_ID,
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
    `gatsby-plugin-mdx-embed`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
};
