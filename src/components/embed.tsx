/** @jsx jsx */
import { jsx } from "theme-ui"
import Iframe from "react-iframe"

type EmbedProps = {
  title: string;
  id: string;
  height?: number;
  source: "codePen" | "codeSandbox";
}
function Embed({ title, id, height = 320, source }: EmbedProps) {
  const url =
    source === "codePen"
      ? `//codepen.io/joelmturner/embed/${id}/?height=320&theme-id=dark&default-tab=result`
      : `//codesandbox.io/embed/${id}?autoresize=1&fontsize=14&hidenavigation=1&view=preview`
  return (
    <Iframe
      sx={{ width: "100%", height: `${height}px`, mb: 4, mt: 1, border: 0, borderRadius: "4px", overflow: "hidden" }}
      scrolling="no"
      title={title}
      url={url}
      allowFullScreen={true}
      frameBorder={0}
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox={"allow-modals allow-forms allow-popups allow-scripts allow-same-origin" as any}
      loading="lazy"
    />
  )
}

export default Embed
