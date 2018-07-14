// @flow
import * as React from "react";
import styled, {css} from 'styled-components';

type GridProps = {
    /** additional styles */
    style?: Object;
}

export const StyledGrid = styled.div`
    justify-content: center;
    ${ ({style}: GridProps) => style && css`${style}` };
`

const Grid = (props: GridProps) => <StyledGrid {...props} />;

/** @component */
export default Grid;