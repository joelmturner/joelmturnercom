// exports.createSchemaCustomization = require("./scripts/createSchemaCustomization").createSchemaCustomization
// exports.createPages = require("./scripts/createPages").createPages
// exports.onCreateNode = require("./scripts/onCreateNode").onCreateNode
exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: "category",
      value: node.frontmatter.category,
    })
    createNodeField({
      node,
      name: "ogImage",
      value: node.frontmatter.ogImage,
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
      ogImage: String
    }
  `)

  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      fields: {
        category: {
          type: `String`,
        },
        ogImage: {
          type: `String`,
        },
      },
      interfaces: [`Node`, `BlogPost`],
    })
  )
}
