import { CreateSchemaCustomizationArgs } from "gatsby"

export default ({ actions, schema }: CreateSchemaCustomizationArgs) => {
  const { createTypes, createFieldExtension } = actions as any

  console.log("schema", schema)

  createTypes(`
    type MdxFrontmatter {
      category: String
    }
  `)

  // createNodeField({
  //   node,
  //   name: "category",
  //   value: (node as any).frontmatter.category || "",
  // })
  createFieldExtension({
    name: "category",
    extend: () => ({
      resolve(source: any, args: any, context: any, info: any) {
        console.log("source", source)
        console.log("info", info)
        return String(source[info.fieldName])
      },
    }),
  })
}
