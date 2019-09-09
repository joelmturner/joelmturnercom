import { CreateNodeArgs } from "gatsby"

export default ({ node, actions, getNode, createNodeId }: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) {
    return
  }

  const { createNodeField } = actions
  console.log("node", node)

  // createNodeField({
  //   node,
  //   name: "category",
  //   value: (node as any).frontmatter.category || "",
  // })
}
