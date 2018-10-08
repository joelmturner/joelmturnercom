// import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/';

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    about: {
      name: 'Joel M. Turner',
      title: 'Frontend Developer',
      bio:
        'Not to be confused with Joel Turner, the rather talented, Australian beat-boxer. /n I spent many of my summers living on glaciers in Alaska.Living in a remote camp with a bunch of other interesting people was great.You never know where the conversations will go and what kind of friends you’ll make. /n I received my BA with a graphic design emphasis in December of 2005. Most of my free time in college was spent playing in the Symphony Orchestra and playing basketball. /n I was born in Laramie, Wyoming.I now live with my wife, Suzanne Turner and our two dogs in Portland, Oregon.',
    },
    social: [
      {
        network: 'twitter',
        link: 'https://twitter.com/joelmturner',
        // component: Twitter,
      },
      {
        network: 'instagram',
        link: 'https://www.instagram.com/joelmturner/',
      },
      {
        network: 'github',
        link: 'https://github.com/joelmturner',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    /*
         * Gatsby's data processing layer begins with “source”
         * plugins. Here the site sources its data from Wordpress.
         */
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        /*
                 * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
                 * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
                 */
        baseUrl: 'mtgraph.net/joelmturner',
        // The protocol. This can be http or https.
        protocol: 'https',
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the assumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on Wordpress.com.
        // Defaults to true.
        useACF: true,
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        // Set how many pages are retrieved per API request.
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: 'https://mtgraph.net/joelmturner/wp-content/uploads',
          replacementUrl: 'https://res.cloudinary.com/joelmturner/blog',
        },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        excludedRoutes: ['/*/*/comments', '/yoast/**'],
        // use a custom normalizer which is applied after the built-in ones.
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-mdx',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
  ],
}
