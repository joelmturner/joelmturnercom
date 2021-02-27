/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui";
import Highlight, { defaultProps, Language, PrismTheme } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import themeMod from "../utils/themeMod";
import { memo } from "react";

const LINE_NUM_REGULAR_EXPRESSION: any = /{([\d,-]+)}/;
const META_ATTRIBUTES = ["filename", "class"];
const META_ATTRIBUTES_REGULAR_EXPRESSION: any = new RegExp(`(${META_ATTRIBUTES.join("|")})=[\\w+.\\-_]+`, "g");

function calculateLinesToHighlight(meta: string) {
  if (LINE_NUM_REGULAR_EXPRESSION.test(meta)) {
    const lineNumbers = LINE_NUM_REGULAR_EXPRESSION.exec(meta)[1]
      .split(",")
      .map((v: string) => v.split("-").map((y) => parseInt(y, 10)));
    return (index: number) => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]: [number, number]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  } else {
    return () => false;
  }
}

type MetaAttributes = Partial<{ [key: "filename" | "class"]: string }>;

function getMetaAttributes(meta: string): MetaAttributes | null {
  const found = META_ATTRIBUTES_REGULAR_EXPRESSION.test(meta);
  if (!found) {
    return null;
  }
  const matches = meta.match(META_ATTRIBUTES_REGULAR_EXPRESSION);

  return (
    matches?.reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      if (acc[key]) {
        acc[key] = acc[key] + " " + value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as MetaAttributes) ?? null
  );
}

const HIGHLIGHT_LINE_STYLES = {
  bg: "highlightLine",
  my: "0px",
  mx: "-10px",
  py: "0px",
  px: "5px",
  borderLeft: "5px solid",
  borderColor: "accent",
};

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
  const [colorMode] = useColorMode<"light" | "dark">();
  const theme: PrismTheme = themeMod(colorMode);
  const scrubbedLanguage = language.replace(" svelte", "");
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const metaAttributes = getMetaAttributes(metastring);
  const metaClasses = metaAttributes?.class ?? "";

  if ((props as any)["react-live"]) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }

  return (
    <Highlight {...defaultProps} code={codeString} language={scrubbedLanguage} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="gatsby-highlight" data-language={scrubbedLanguage} sx={{ overflow: "auto" }}>
          {metaAttributes?.filename && (
            <div className="code-filename" sx={{ bg: "muted", p: 1 }}>
              <Styled.h6 sx={{ p: 0, m: 0, fontStyle: "italic", letterSpacing: ".5px", fontWeight: 1 }}>
                {metaAttributes?.filename}
              </Styled.h6>
            </div>
          )}
          <Styled.pre className={`${className} ${metaClasses}`} style={style}>
            {tokens.map((line, i) => (
              <div
                key={`${line} ${i}`}
                {...getLineProps({ line, key: i })}
                sx={shouldHighlightLine(i) ? HIGHLIGHT_LINE_STYLES : {}}
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
  );
};

export default memo(Code);
