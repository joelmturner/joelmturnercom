/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui"
import Select from "react-select"
import { ActionMeta, Theme } from "react-select/src/types"

type DropDownProps = {
  selected: any;
  options: any[];
  onChange: (((value: any, actionMeta: ActionMeta) => void) & ((value: any, action: ActionMeta) => void)) | undefined;
  className?: string;
}

function customTheme(selectTheme: Theme, theme: any): Theme {
  return {
    ...selectTheme,
    borderRadius: 0,
    colors: {
      ...selectTheme.colors,
      primary25: theme.colors.muted, // highlight
      primary50: theme.colors.backgroundSubtle, // outlines
      primary: theme.colors.primary, // multi value color
      neutral0: theme.colors.background, // background
      neutral20: theme.colors.muted, // outlines
      neutral50: theme.colors.text, // placeholder color
      neutral60: theme.colors.text, // icons
      neutral80: theme.colors.text, // multi value color
    },
  }
}

const DropDown: React.FC<DropDownProps> = ({ selected, options, onChange, className }) => {
  const themeUI = useThemeUI()
  return (
    <Select
      placeholder="Collection"
      value={selected}
      onChange={onChange}
      options={options}
      className={className}
      sx={{
        width: "100%",
      }}
      theme={theme => customTheme(theme, themeUI.theme)}
    />
  )
}

export default DropDown;