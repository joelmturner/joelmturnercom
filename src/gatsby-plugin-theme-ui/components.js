import Prism from "@theme-ui/prism"
import { Grid, Flexbox } from "../components"

export default {
  pre: props => props.children,
  code: Prism,
  Grid,
  Flexbox,
}
