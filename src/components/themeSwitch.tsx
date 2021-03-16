/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";
import { FaMoon, FaSun } from "react-icons/fa";
import { handleEnterKeyPress } from "../utils/a11y";
import { FC, memo, useCallback } from "react";
import * as React from "react";

type ThemeSwitchProps = {};

const ThemeSwitch: FC<ThemeSwitchProps> = ({}) => {
  const [colorMode, setColorMode] = useColorMode();
  const setColor = React.useCallback(
    function () {
      setColorMode((prevState) => (prevState === "light" ? "dark" : "light"));
    },
    [setColorMode, colorMode]
  );
  const handleOnClick = useCallback(function () {
    setColor();
  }, []);

  const handleKey = useCallback(function () {
    setColor();
  }, []);

  const checked = colorMode === "light";

  return (
    <div
      role="button"
      sx={{ variant: "themeSwitch.wrapper" }}
      onClick={handleOnClick}
      onKeyPress={handleKey}
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
