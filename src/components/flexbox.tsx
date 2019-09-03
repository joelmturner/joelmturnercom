/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import css from "@styled-system/css"

export type FlexboxProps = {
  className?: string;
  inline?: boolean;
  vertical?: boolean;
  wrap?: boolean;
  noGrow?: boolean;
  grow?: number;
  shrink?: number;
  basis?: number | "auto";
  children?: React.ReactNode;
  //
  top?: boolean;
  middle?: boolean;
  bottom?: boolean;
  left?: boolean;
  center?: boolean;
  right?: boolean;
  between?: boolean;
  around?: boolean;

  gap?: boolean;
}

export const getFlexProperties = (props: FlexboxProps) => {
  // check all booleans and return appropriate css
  const { top, middle, bottom, left, center, right, between, around, vertical, gap } = props

  let primaryAxis = "initial"
  let secondaryAxis = "initial"

  /** Check For conflicting booleans   
    let primaryBools;
    let secondaryBools;

    if (vertical) {
        primaryBools = [top, middle, bottom, between, around];
        secondaryBools = [left, center, right];
    } else {
        primaryBools = [left, center, right, between, around];
        secondaryBools= [top, middle, bottom];
    };
    */

  // does primary axix have a value?
  if (left || center || right || between || around) {
    // set value
    if (left) {
      primaryAxis = "flex-start"
    } else if (center) {
      primaryAxis = "center"
    } else if (right) {
      primaryAxis = "flex-end"
    } else if (between) {
      primaryAxis = "space-between"
    } else if (around) {
      primaryAxis = "space-around"
    }
  }

  // secondary axis
  if (top || middle || bottom) {
    if (top) {
      secondaryAxis = "flex-start"
    } else if (middle) {
      secondaryAxis = "center"
    } else if (bottom) {
      secondaryAxis = "flex-end"
    }
  }

  // if vertical flip it
  if (vertical) {
    if (left || center || right) {
      if (left) {
        secondaryAxis = "flex-start"
      } else if (center) {
        secondaryAxis = "center"
      } else if (right) {
        secondaryAxis = "flex-end"
      }
    }

    if (top || middle || bottom || between || around) {
      if (top) {
        primaryAxis = "flex-start"
      } else if (middle) {
        primaryAxis = "center"
      } else if (bottom) {
        primaryAxis = "flex-end"
      } else if (between) {
        primaryAxis = "space-between"
      } else if (around) {
        primaryAxis = "space-around"
      }
    }
  }
  return {
    justifyContent: primaryAxis,
    alignItems: secondaryAxis,
  }
}

const Flexbox: React.FC<FlexboxProps> = props => {
  return (
    <div
      sx={{
        display: props.inline ? "inline-flex" : "flex",
        flexDirection: props.vertical ? "column" : "row",
        flexWrap: props.wrap ? "wrap" : "no-wrap",
        flex: props.noGrow ? `0 0 auto` : `1 1 auto`,
        "& > * + *": {
          marginLeft: props.gap && !props.vertical && "2rem",
          marginTop: props.gap && props.vertical && "2rem",
        },
        ...getFlexProperties(props),
      }}
      className={props.className}
    >
      {props.children}
    </div>
  )
}

/** @component */
export default Flexbox
