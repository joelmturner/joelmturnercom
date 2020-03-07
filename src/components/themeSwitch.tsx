/** @jsx jsx */
import { jsx } from "theme-ui"
import { FaMoon, FaSun } from "react-icons/fa"
import { handleEnterKeyPress } from "../utils/a11y"
import { useCallback } from "react"

type ThemeSwitchProps = {
  checked: boolean;
  onClick(): void;
}

export default ({ checked, onClick }: ThemeSwitchProps) => {
    const handleOnClick = useCallback(function() {
        if (onClick) {
            onClick()
        }
    }, [onClick])
    const handleKey = useCallback(function() {
        if (onClick) {
            handleEnterKeyPress(onClick)
        }
    }, [onClick])
    return (
  <div role="button" sx={{ variant: "themeSwitch.wrapper" }} onClick={handleOnClick} onKeyPress={handleKey} tabIndex={0}>
    <input sx={{ variant: "themeSwitch.switch" }} type="checkbox" name="onoffswitch" checked={checked} readOnly />
    <div sx={{ variant: "themeSwitch.label" }} />
    <span sx={{ variant: `themeSwitch.icon.${checked ? "light" : "dark"}` }}>{checked ? <FaSun /> : <FaMoon />}</span>
  </div>
)}
