import { GatsbyNode } from "gatsby";
import { createBlogPages } from "./createBlogPages";
import { createTILPages } from "./createTILPages";

// Create blog pages dynamically
export const createPages: GatsbyNode["createPages"] = async (options) => {
  await createBlogPages(options);
  await createTILPages(options);
};
