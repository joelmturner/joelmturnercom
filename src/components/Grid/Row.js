// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

type RowProps = {
  /** 100vw with padding */
  forceFullPage?: boolean,
  /** max number of columns; no more than 12 */
  maxColumns?: number,
  /** additional styles */
  style?: Object,
}

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${({ maxColumns = 12 }: RowProps) => `repeat(${maxColumns}, 1fr)`};
  justify-content: center;
  overflow-y: auto;
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
const Row = (props: RowProps) => <StyledRow {...props} />

/** @component */
export default Row
