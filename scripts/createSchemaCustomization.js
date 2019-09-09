exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  console.log("schema", schema)

  createTypes(`
    type MdxFrontmatter {
      category: String
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
        console.log("source", source)
        console.log("info", info)
        return String(source[info.fieldName])
      },
    }),
  })
}
