import { css } from "@emotion/react";

export const nightOwl = css`
  div[class*="language-"],
  code[class*="language-"],
  pre[class*="language-"] {
    color: #d6deeb;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  code[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection,
  pre[class*="language-"] ::-moz-selection,
  pre[class*="language-"]::-moz-selection {
    text-shadow: none;
    background: rgba(29, 59, 83, 0.99);
  }
  code[class*="language-"] ::selection,
  code[class*="language-"]::selection,
  pre[class*="language-"] ::selection,
  pre[class*="language-"]::selection {
    text-shadow: none;
    background: rgba(29, 59, 83, 0.99);
  }

  pre div[class*="language-"] div[data-highlighted="true"] {
    text-shadow: none;
    background: hsl(200, 94%, 67%, 8%);
    border-left: 5px solid hsl(200, 94%, 67%);
  }
  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    color: #fff;
    background: #011627;
  }
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  .token.cdata,
  .token.comment,
  .token.prolog {
    color: #637777;
    font-style: italic;
  }
  .token.punctuation {
    color: #c792ea;
  }
  .namespace {
    color: #b2ccd6;
  }
  .token.deleted {
    color: rgba(239, 83, 80, 0.56);
    font-style: italic;
  }
  .token.property,
  .token.symbol {
    color: #80cbc4;
  }
  .token.keyword,
  .token.operator,
  .token.tag {
    color: #7fdbca;
  }
  .token.boolean {
    color: #ff5874;
  }
  .token.number {
    color: #f78c6c;
  }
  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
    color: #82aaff;
  }
  .token.doctype,
  .token.selector {
    color: #c792ea;
    font-style: italic;
  }
  .token.attr-name,
  .token.inserted {
    color: #addb67;
    font-style: italic;
  }
  .language-css .token.string,
  .style .token.string,
  .token.entity,
  .token.string,
  .token.url {
    color: #addb67;
  }
  .token.atrule,
  .token.attr-value,
  .token.class-name {
    color: #ffcb8b;
  }
  .token.important,
  .token.regex,
  .token.variable {
    color: #d6deeb;
  }
  .token.bold,
  .token.important {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
`;

export const nightOwlLight = css`
  code[class*="language-"],
  pre[class*="language-"] {
    color: #403f53;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  code[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection,
  pre[class*="language-"] ::-moz-selection,
  pre[class*="language-"]::-moz-selection {
    text-shadow: none;
    background: #fbfbfb;
  }
  code[class*="language-"] ::selection,
  code[class*="language-"]::selection,
  pre[class*="language-"] ::selection,
  pre[class*="language-"]::selection {
    text-shadow: none;
    background: #fbfbfb;
  }
  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    color: #fff;
    background: #fbfbfb;
  }
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  .token.cdata,
  .token.comment,
  .token.prolog {
    color: #989fb1;
    font-style: italic;
  }
  .token.punctuation {
    color: #994cc3;
  }
  .namespace {
    color: #0c969b;
  }
  .token.deleted {
    color: rgba(239, 83, 80, 0.56);
    font-style: italic;
  }
  .token.keyword,
  .token.operator,
  .token.property,
  .token.symbol {
    color: #0c969b;
  }
  .token.tag {
    color: #994cc3;
  }
  .token.boolean {
    color: #bc5454;
  }
  .token.number {
    color: #aa0982;
  }
  .language-css .token.string,
  .style .token.string,
  .token.builtin,
  .token.char,
  .token.constant,
  .token.entity,
  .token.string,
  .token.url {
    color: #4876d6;
  }
  .token.doctype,
  .token.function,
  .token.selector {
    color: #994cc3;
    font-style: italic;
  }
  .token.attr-name,
  .token.inserted {
    color: #4876d6;
    font-style: italic;
  }
  .token.atrule,
  .token.attr-value,
  .token.class-name {
    color: #111;
  }
  .token.important,
  .token.regex,
  .token.variable {
    color: #c96765;
  }
  .token.bold,
  .token.important {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
`;
