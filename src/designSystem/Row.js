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
  className?: any,
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

const Row = ({
  forceFullPage,
  maxColumns,
  hasOverflow,
  gap,
  style,
  children,
  className,
}: RowProps) => (
  <StyledRow
    className={className}
    forceFullPage={forceFullPage}
    maxColumns={maxColumns}
    hasOverflow={hasOverflow}
    gap={gap}
    style={style}>
    {children}
  </StyledRow>
)

/** @component */
export default Row
