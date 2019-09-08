import React from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import themeDark from "prism-react-renderer/themes/duotoneDark"
import themeLight from "prism-react-renderer/themes/duotoneLight"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { Styled, useColorMode } from "theme-ui"

const Code = ({ codeString, language, ...props }: { codeString: string; language: Language }) => {
  const [colorMode] = useColorMode()
  const theme = colorMode === "dark" ? themeDark : themeLight
  if ((props as any)["react-live"]) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  }
  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="gatsby-highlight" data-language={language}>
          <Styled.pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={`${line} ${i}`} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={`${token} ${key}`} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Styled.pre>
        </div>
      )}
    </Highlight>
  )
}

export default Code
