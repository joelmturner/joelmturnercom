export const nightOwlDark = {
  "[data-theme=dark] div[class*='language-'], [data-theme=dark] code[class*='language-'], [data-theme=dark] pre[class*='language-']":
    {
      background: 'bg.muted',
      color: '#d6deeb',
      fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: '1.5',
      MozTabSize: '4',
      OTabSize: '4',
      tabSize: '4',
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
    },
  "[data-theme=dark] code[class*='language-'] ::-moz-selection, [data-theme=dark] code[class*='language-']::-moz-selection, [data-theme=dark] pre[class*='language-'] ::-moz-selection, [data-theme=dark] pre[class*='language-']::-moz-selection, [data-theme=dark] code[class*='language-'] ::selection, [data-theme=dark] code[class*='language-']::selection, [data-theme=dark] pre[class*='language-'] ::selection, [data-theme=dark] pre[class*='language-']::selection":
    {
      textShadow: 'none',
      background: 'rgba(29, 59, 83, 0.99)',
    },
  "[data-theme=dark] pre code[class*='language-'] div[data-highlighted='true']": {
    textShadow: 'none',
    background: 'hsl(200, 94%, 67%, 8%)',
    borderLeft: '5px solid hsl(200, 94%, 67%)',
  },
  '@media print': {
    "[data-theme=dark] code[class*='language-'], [data-theme=dark] pre[class*='language-']": {
      textShadow: 'none',
    },
  },
  "[data-theme=dark] pre[class*='language-']": {
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
  },
  "[data-theme=dark] :not(pre) > code[class*='language-'], pre[class*='language-']": {
    color: '#fff',
    background: '#011627',
  },
  "[data-theme=dark] :not(pre) > code[class*='language-']": {
    padding: '0.1em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  '[data-theme=dark] .token.cdata, [data-theme=dark] .token.comment, .token.prolog': {
    color: '#637777',
    fontStyle: 'italic',
  },
  '[data-theme=dark] .token.punctuation': {
    color: '#c792ea',
  },
  '[data-theme=dark] .namespace': {
    color: '#b2ccd6',
  },
  '[data-theme=dark] .token.deleted': {
    color: 'rgba(239, 83, 80, 0.56)',
    fontStyle: 'italic',
  },
  '[data-theme=dark] .token.property, [data-theme=dark] .token.symbol': {
    color: '#80cbc4',
  },
  '[data-theme=dark] .token.keyword, [data-theme=dark] .token.operator, [data-theme=dark] .token.tag':
    {
      color: '#7fdbca',
    },
  '[data-theme=dark] .token.boolean': {
    color: '#ff5874',
  },
  '[data-theme=dark] .token.number': {
    color: '#f78c6c',
  },
  '[data-theme=dark] .token.builtin, [data-theme=dark] .token.char, [data-theme=dark] .token.constant, [data-theme=dark] .token.function':
    {
      color: '#82aaff',
    },
  '[data-theme=dark] .token.doctype, [data-theme=dark] .token.selector': {
    color: '#c792ea',
    fontStyle: 'italic',
  },
  '[data-theme=dark] .token.attr-name, [data-theme=dark] .token.inserted': {
    color: '#addb67',
    fontStyle: 'italic',
  },
  '[data-theme=dark] .language-css .token.string, [data-theme=dark] .style .token.string, [data-theme=dark] .token.entity, [data-theme=dark] .token.string, [data-theme=dark] .token.url':
    {
      color: '#addb67',
    },
  '[data-theme=dark] .token.atrule, [data-theme=dark] .token.attr-value, [data-theme=dark] .token.class-name':
    {
      color: '#ffcb8b',
    },
  '[data-theme=dark] .token.important, [data-theme=dark] .token.regex, [data-theme=dark] .token.variable':
    {
      color: '#d6deeb',
    },
  '[data-theme=dark] .token.bold, [data-theme=dark] .token.important': {
    fontWeight: '700',
  },
  '[data-theme=dark] .token.italic': {
    fontStyle: 'italic',
  },
};

export const nightOwlLight = {
  "[data-theme=light] code[class*='language-'], [data-theme=light] pre[class*='language-']": {
    background: 'accent.9',
    color: '#403f53',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  "[data-theme=light] code[class*='language-'] ::-moz-selection, [data-theme=light] code[class*='language-']::-moz-selection, [data-theme=light] pre[class*='language-'] ::-moz-selection, [data-theme=light] pre[class*='language-']::-moz-selection, [data-theme=light] code[class*='language-'] ::selection, [data-theme=light] code[class*='language-']::selection, [data-theme=light] pre[class*='language-'] ::selection, [data-theme=light] pre[class*='language-']::selection":
    {
      textShadow: 'none',
      background: '#fbfbfb',
    },
  "[data-theme=light] pre code[class*='language-'] div[data-highlighted='true']": {
    textShadow: 'none',
    background: 'hsl(39 94% 67% / 20%)',
    borderLeft: '5px solid hsl(39 100% 79%)',
  },
  '@media print': {
    "[data-theme=light] code[class*='language-'], [data-theme=light] pre[class*='language-']": {
      textShadow: 'none',
    },
  },
  "[data-theme=light] pre[class*='language-']": {
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
  },
  "[data-theme=light] :not(pre) > code[class*='language-'], [data-theme=light] pre[class*='language-']":
    {
      color: '#fff',
      background: '#fbfbfb',
    },
  "[data-theme=light] :not(pre) > code[class*='language-']": {
    padding: '0.1em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  '[data-theme=light] .token.cdata, [data-theme=light] .token.comment, [data-theme=light] .token.prolog':
    {
      color: '#989fb1',
      fontStyle: 'italic',
    },
  '[data-theme=light] .token.punctuation': {
    color: '#994cc3',
  },
  '[data-theme=light] .namespace': {
    color: '#0c969b',
  },
  '[data-theme=light] .token.deleted': {
    color: 'rgba(239, 83, 80, 0.56)',
    fontStyle: 'italic',
  },
  '[data-theme=light] .token.keyword, [data-theme=light] .token.operator, [data-theme=light] .token.property, [data-theme=light] .token.symbol':
    {
      color: '#0c969b',
    },
  '[data-theme=light] .token.tag': {
    color: '#994cc3',
  },
  '[data-theme=light] .token.boolean': {
    color: '#bc5454',
  },
  '[data-theme=light] .token.number': {
    color: '#aa0982',
  },
  '[data-theme=light] .language-css .token.string, [data-theme=light] .style .token.string, [data-theme=light] .token.builtin, [data-theme=light] .token.char, [data-theme=light] .token.constant, [data-theme=light] .token.entity, [data-theme=light] .token.string, [data-theme=light] .token.url':
    {
      color: '#4876d6',
    },
  '[data-theme=light] .token.doctype, [data-theme=light] .token.function, [data-theme=light] .token.selector':
    {
      color: '#994cc3',
      fontStyle: 'italic',
    },
  '[data-theme=light] .token.attr-name, [data-theme=light] .token.inserted': {
    color: '#4876d6',
    fontStyle: 'italic',
  },
  '[data-theme=light] .token.atrule, [data-theme=light] .token.attr-value, [data-theme=light] .token.class-name':
    {
      color: '#111',
    },
  '[data-theme=light] .token.important, [data-theme=light] .token.regex, [data-theme=light] .token.variable':
    {
      color: '#c96765',
    },
  '[data-theme=light] .token.bold, [data-theme=light] .token.important': {
    fontWeight: 700,
  },
  '.token.italic': {
    fontStyle: 'italic',
  },
};
