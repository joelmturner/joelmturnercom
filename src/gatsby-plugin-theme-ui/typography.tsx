// example theme with Typography.js
import { toTheme } from "@theme-ui/typography"
import noriega from "typography-theme-noriega"
import merge from "lodash.merge"
const typography = toTheme(noriega)
export default merge(typography, {
  // optional style overrides go here
})
