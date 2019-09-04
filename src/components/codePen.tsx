/** @jsx jsx */
import { jsx } from "theme-ui"
import Iframe from "react-iframe"

type CodepenProps = {
  title: string;
  id: string;
}
function Codepen({ title, id }: CodepenProps) {
  return (
    <Iframe
      height="320"
      sx={{ width: "100%", mb: 4, mt: 1 }}
      scrolling="no"
      title={title}
      url={`//codepen.io/joelmturner/embed/${id}/?height=320&theme-id=dark&default-tab=result`}
      allowFullScreen={true}
    />
  )
}

export default Codepen
