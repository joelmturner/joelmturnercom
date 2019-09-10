/** @jsx jsx */
import { jsx } from "theme-ui"
import Highlight, { defaultProps, Language, PrismTheme } from "prism-react-renderer"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { Styled, useColorMode } from "theme-ui"
import themeMod from "../utils/themeMod"

const RE: any = /{([\d,-]+)}/

function calculateLinesToHighlight(meta: string) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(",")
      .map((v: string) => v.split("-").map(y => parseInt(y, 10)))
    return (index: number) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]: [number, number]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      )
      return inRange
    }
  } else {
    return () => false
  }
}

const highlightLine = {
  bg: "highlightLine",
  my: "0px",
  mx: "-10px",
  py: "0px",
  px: "5px",
  borderLeft: "5px solid",
  borderColor: "accent",
}

const Code = ({
  codeString,
  language,
  metastring,
  ...props
}: {
  codeString: string;
  language: Language;
  metastring: string;
}) => {
  const [colorMode] = useColorMode<"light" | "dark">()
  const theme: PrismTheme = themeMod(colorMode)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
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
        <div className="gatsby-highlight" data-language={language} sx={{ overflow: "auto" }}>
          <Styled.pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div
                key={`${line} ${i}`}
                {...getLineProps({ line, key: i })}
                sx={shouldHighlightLine(i) ? highlightLine : {}}
              >
                <span
                  sx={{
                    display: "inline-block",
                    width: "2em",
                    userSelect: "none",
                    opacity: "0.3",
                  }}
                >
                  {i + 1}
                </span>
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
