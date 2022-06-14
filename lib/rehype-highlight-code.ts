import rangeParser from "parse-numeric-range";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import { refractor } from "refractor";
import highlightLine from "./rehype-highlight-line";
import jsx from "refractor/lang/jsx.js";
import tsx from "refractor/lang/tsx.js";

refractor.register(jsx);
refractor.register(tsx);

export default function (options = {}) {
  return (tree) => {
    visit(tree, "element", visitor);
  };

  function visitor(node, index, parentNode) {
    if (parentNode.tagName === "pre" && node.tagName === "code") {
      // syntax highlight
      const lang = node.properties.className ? node.properties.className[1].split("-")[1] : "md";
      let result = refractor.highlight(toString(node), lang);

      // line highlight
      const linesToHighlight = rangeParser(node.properties.line || "0");
      result = highlightLine(result, linesToHighlight);

      //   // word highlight
      //   result = highlightWord(result);

      node.children = result;
    }
  }
}
