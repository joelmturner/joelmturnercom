/** @jsx jsx */
import { jsx } from "theme-ui"
import { FaMoon, FaSun } from "react-icons/fa"

type ThemeSwitchProps = {
  checked: boolean;
  onClick(): void;
}

export default ({ checked, onClick }: ThemeSwitchProps) => (
  <div sx={{ variant: "themeSwitch.wrapper" }} onClick={onClick ? onClick : undefined}>
    <input sx={{ variant: "themeSwitch.switch" }} type="checkbox" name="onoffswitch" checked={checked} readOnly />
    <div sx={{ variant: "themeSwitch.label" }} />
    <span sx={{ variant: `themeSwitch.icon.${checked ? "light" : "dark"}` }}>{checked ? <FaSun /> : <FaMoon />}</span>
  </div>
)
