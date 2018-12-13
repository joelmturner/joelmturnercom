// @flow
import * as React from 'react'
import styled, { css, type ReactComponentStyled } from 'styled-components'

type RowProps = {
  /** 100vw with padding */
  forceFullPage?: boolean,
  /** max number of columns; no more than 12 */
  maxColumns?: number,
  hasOverflow?: boolean,
  gap?: string,
  /** additional styles */
  style?: Object,
  children?: React.Node,
}

export const StyledRow: ReactComponentStyled<RowProps> = styled.div`
  display: grid;
  grid-template-columns: ${({ maxColumns = 12 }: RowProps) => `repeat(${maxColumns}, 1fr)`};
  justify-content: center;
  ${({ gap }: RowProps) =>
    gap &&
    css`
      grid-gap: ${gap};
    `};
  ${({ hasOverflow }: RowProps) =>
    hasOverflow &&
    css`
      overflow-y: auto;
    `};
  ${({ style }: RowProps) =>
    style &&
    css`
      ${style};
    `};
`

StyledRow.defaultProps = {
  maxColumns: 12,
}

/**
 * Creates a row with a default of 12 columns. Use [Column](/#column) inside. Rows can be used inside a [Grid](/#grid) or on their own.
 */
const Row = ({ forceFullPage, maxColumns, hasOverflow, gap, style, children }: RowProps) => (
  <StyledRow
    forceFullPage={forceFullPage}
    maxColumns={maxColumns}
    hasOverflow={hasOverflow}
    gap={gap}
    style={style}
    children={children}
  />
)

/** @component */
export default Row
