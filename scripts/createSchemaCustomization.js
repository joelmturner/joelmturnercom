exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  console.log("schema", schema)

  createTypes(`
    type MdxBlogPost implements BlogPost @dontinfer {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      category: String
      ogImage: String
    }
  `)

  // createNodeField({
  //   node,
  //   name: "category",
  //   value: (node).frontmatter.category || "",
  // })
  createFieldExtension({
    name: "category",
    extend: () => ({
      resolve(source, args, context, info) {
        // console.log("source", source)
        // console.log("info", info)
        return String(source[info.fieldName])
      },
    }),
  })
  createFieldExtension({
    name: "ogImage",
    extend: () => ({
      resolve(source, args, context, info) {
        // console.log("source", source)
        // console.log("info", info)
        return String(source[info.fieldName])
      },
    }),
  })
}
