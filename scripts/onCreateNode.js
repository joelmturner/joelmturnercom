exports.onCreateNode = ({ node }) => {
  if (node.internal.type !== `Mdx`) {
    return
  }

  console.log("node", node)

  // createNodeField({
  //   node,
  //   name: "category",
  //   value: (node as any).frontmatter.category || "",
  // })
}
