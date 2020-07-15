// exports.createSchemaCustomization = require("./scripts/createSchemaCustomization").createSchemaCustomization
// exports.createPages = require("./scripts/createPages").createPages
// exports.onCreateNode = require("./scripts/onCreateNode").onCreateNode
const path = require(`path`)
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { fileAbsolutePath: { glob: "**/posts/**" } }
        ) {
          nodes {
            id
            frontmatter {
              slug
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
  const blogPostTemplate = path.resolve(`./src/gatsby-theme-blog-core/templates/post-query.tsx`)
  const nodes = result.data.allMdx.nodes
  nodes.forEach((node, index) => {
    if (!node) return
    const previous = index === nodes.length - 1 ? null : nodes[index + 1]
    const next = index === 0 ? null : nodes[index - 1]
    const slug = node.frontmatter.slug

    createPage({
      path: `/blog/${slug}`,
      component: blogPostTemplate,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        id: node.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
      },
    })
  })
}

exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: "category",
      value: node.frontmatter.category,
    })
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes(`
    type MdxBlogPost implements BlogPost {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      category: String
    }
  `)

  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      fields: {
        category: {
          type: `String`,
        },
      },
      interfaces: [`Node`, `BlogPost`],
    })
  )
}

// Replacing '/' would result in empty string which is invalid
// const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
// // Implement the Gatsby API “onCreatePage”. This is
// // called after every page is created.
// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   const oldPage = Object.assign({}, page)
//   // Remove trailing slash unless page is /
//   page.path = replacePath(page.path)
//   if (page.path !== oldPage.path) {
//     // Replace new page with old page
//     deletePage(oldPage)
//     createPage(page)
//   }
// }

const LoadablePlugin = require('@loadable/webpack-plugin')
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()]
  })
}