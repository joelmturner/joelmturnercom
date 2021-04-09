/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";
import { FaMoon, FaSun } from "react-icons/fa";
import { FC, memo, useCallback } from "react";

type ThemeSwitchProps = {};

const ThemeSwitch: FC<ThemeSwitchProps> = ({}) => {
  const [colorMode, setColorMode] = useColorMode();
  const setColor = useCallback(
    function () {
      setColorMode((prevState) => (prevState === "dark" ? "light" : "dark"));
    },
    [setColorMode]
  );

  const checked = colorMode === "light";

  return (
    <div
      role="button"
      sx={{ variant: "themeSwitch.wrapper" }}
      onClick={setColor}
      onKeyPress={setColor}
      tabIndex={0}
      aria-label="theme switcher"
    >
      <input sx={{ variant: "themeSwitch.switch" }} type="checkbox" name="onoffswitch" checked={checked} readOnly />
      <div sx={{ variant: "themeSwitch.label" }} />
      <span sx={{ variant: `themeSwitch.icon.${colorMode}` }}>{checked ? <FaSun /> : <FaMoon />}</span>
    </div>
  );
};

export default memo(ThemeSwitch);
