/** @jsx jsx */
import { jsx } from "theme-ui"
import { FaMoon, FaSun } from "react-icons/fa"
import { handleEnterKeyPress } from "../utils/a11y"

type ThemeSwitchProps = {
  checked: boolean;
  onClick(): void;
}

export default ({ checked, onClick }: ThemeSwitchProps) => (
  <div role="button" sx={{ variant: "themeSwitch.wrapper" }} onClick={onClick ? onClick : undefined} onKeyPress={onClick ? handleEnterKeyPress(onClick) : undefined} tabIndex={0}>
    <input sx={{ variant: "themeSwitch.switch" }} type="checkbox" name="onoffswitch" checked={checked} readOnly />
    <div sx={{ variant: "themeSwitch.label" }} />
    <span sx={{ variant: `themeSwitch.icon.${checked ? "light" : "dark"}` }}>{checked ? <FaSun /> : <FaMoon />}</span>
  </div>
)
