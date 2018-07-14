// @flow
import * as React from "react";
import styled, {css} from 'styled-components';


// TODO: set up breakpoints for this one
type ColumnProps = {
    /** object where key is breakpoint and value is columns */
    sizes?: {xs: number, sm: number, md: number, lg: number, xl: number},
    span?: number;
    /** additional styles */
    style?: Object;
}

export const StyledColumn = styled.div`
    grid-column: ${ ({span}: ColumnProps) => span && `span ${span}` };
    justify-content: center;
    ${ ({style}: ColumnProps) => style && css`${style}` };
`

StyledColumn.defaultProps = {
    maxColumns: 12
}

const Column = (props: ColumnProps) => <StyledColumn {...props} />;

/** @component */
export default Column;