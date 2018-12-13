// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { media } from './styled-utils'

// TODO: set up breakpoints for this one
type ColumnProps = {
  /** object where key is breakpoint and value is columns */
  sizes?: { xs?: number, sm?: number, md?: number, lg?: number, xl?: number },
  responsive?: boolean,
  span?: number | string,
  /** additional styles */
  style?: Object,
}

export const StyledColumn = styled.div`
  grid-column: ${({ span }: ColumnProps) => span && `span ${span}`};
  ${({ responsive }: ColumnProps) => responsive && media.desktop`grid-column: span 8 / 11;`};
  justify-content: center;
  ${({ style }: ColumnProps) =>
    style &&
    css`
      ${style};
    `};
  ${({ right }) =>
    right &&
    css`
      justify-self: flex-end;
    `};
  ${({ left }) =>
    left &&
    css`
      justify-self: flex-start;
    `};
  ${({ middle }) =>
    middle &&
    css`
      align-self: center;
    `};
`

StyledColumn.defaultProps = {
  maxColumns: 12,
  responsive: false,
}

const Column = (props: ColumnProps) => <StyledColumn {...props} />

/** @component */
export default Column
