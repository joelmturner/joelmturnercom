// @flow
import * as React from 'react'
import styled, { css, type ReactComponentStyled } from 'styled-components'

export type FlexboxProps = {
  inline?: boolean,
  vertical?: boolean,
  wrap?: boolean,
  noGrow?: boolean,
  grow?: number,
  shrink?: number,
  basis?: number | 'auto',
  children?: React.Node,
  //
  top?: boolean,
  middle?: boolean,
  bottom?: boolean,
  left?: boolean,
  center?: boolean,
  right?: boolean,
  between?: boolean,
  around?: boolean,
}

export const getFlexProperties = (props: FlexboxProps) => {
  // check all booleans and return appropriate css
  const { top, middle, bottom, left, center, right, between, around, vertical } = props

  let primaryAxis = 'initial'
  let secondaryAxis = 'initial'

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

    // check for duplicate booleans
    // console.log('getFlexProperties');
    // console.log('props', props);
    // console.log('primaryBools', primaryBools);
    // console.log('secondary', secondaryBools);
    */

  // does primary axix have a value?
  if (left || center || right || between || around) {
    // set value
    if (left) {
      primaryAxis = 'flex-start'
    } else if (center) {
      primaryAxis = 'center'
    } else if (right) {
      primaryAxis = 'flex-end'
    } else if (between) {
      primaryAxis = 'space-between'
    } else if (around) {
      primaryAxis = 'space-around'
    }
  }

  // secondary axis
  if (top || middle || bottom) {
    if (top) {
      secondaryAxis = 'flex-start'
    } else if (middle) {
      secondaryAxis = 'center'
    } else if (bottom) {
      secondaryAxis = 'flex-end'
    }
  }

  // if vertical flip it
  if (vertical) {
    if (left || center || right) {
      if (left) {
        secondaryAxis = 'flex-start'
      } else if (center) {
        secondaryAxis = 'center'
      } else if (right) {
        secondaryAxis = 'flex-end'
      }
    }

    if (top || middle || bottom || between || around) {
      if (top) {
        primaryAxis = 'flex-start'
      } else if (middle) {
        primaryAxis = 'center'
      } else if (bottom) {
        primaryAxis = 'flex-end'
      } else if (between) {
        primaryAxis = 'space-between'
      } else if (around) {
        primaryAxis = 'space-around'
      }
    }
  }
  return css`
    justify-content: ${primaryAxis};
    align-items: ${secondaryAxis};
  `
}

const Flexbox: ReactComponentStyled<FlexboxProps> = styled.div`
  display: ${({ inline }: FlexboxProps) => (inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ vertical }: FlexboxProps) => (vertical ? 'column' : 'row')};
  flex-wrap: ${({ wrap }: FlexboxProps) => (wrap ? 'wrap' : 'no-wrap')};
  flex: ${({ noGrow }: FlexboxProps) => (noGrow ? `0 0 auto` : `1 1 auto`)};
  ${getFlexProperties};
`

Flexbox.defaultProps = {
  inline: false,
  vertical: false,
  wrap: false,
  noGrow: false,
  grow: 1,
  shrink: 1,
  basis: 'auto',
  children: null,
}

// Reusable configs
const FlexRowWrap = (props: FlexboxProps) => <Flexbox wrap={props.wrap}>{props.children}</Flexbox>
const InlineFlexLockup = (props: { children: any }) => (
  <Flexbox inline noGrow middle>
    {props.children}
  </Flexbox>
)

/** @component */
export default Flexbox
export { FlexRowWrap, InlineFlexLockup }
