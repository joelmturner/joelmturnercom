/** @jsx jsx */
import { jsx } from "theme-ui";
import Iframe from "react-iframe";
import { memo } from "react";

type EmbedProps = {
  title: string;
  id: string;
  height?: number;
  source: "codePen" | "codeSandbox";
};

function Embed({ title, id, height = 320, source }: EmbedProps) {
  const url =
    source === "codePen"
      ? `//codepen.io/joelmturner/embed/${id}/?height=320&theme-id=dark&default-tab=result`
      : `//codesandbox.io/embed/${id}?autoresize=1&fontsize=14&hidenavigation=1&view=preview&codemirror=1&hidedevtools=1`;

  return (
    <Iframe
      sx={{ width: "100%", height: `${height}px`, mb: 4, mt: 1, border: 0, borderRadius: "4px", overflow: "hidden" }}
      title={title}
      url={url}
      allowFullScreen={true}
      frameBorder={0}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      loading="lazy"
    />
  );
}

export default memo(Embed);
