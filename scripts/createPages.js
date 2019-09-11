const path = require("path")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMdx(filter: { frontmatter: { category: { ne: null } } }) {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create pages for each markdown file.
  const blogPostsTemplate = path.resolve(`src/gatsby-theme-ui-blog/posts.tsx`)
  result.data.allMdx.edges.forEach(({ node }) => {
    // console.log("node", node)
    const category = node.frontmatter.category
    const newPath = `/blog/category/${category}`
    createPage({
      path: newPath,
      component: blogPostsTemplate,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        isArchive: true,
        newPath,
      },
    })
  })
}
