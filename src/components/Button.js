// @flow
import React from 'react'
import styled, { type ReactComponentStyled } from 'styled-components'

type ButtonProps = {
  /** color */
  color?: string,
  /** onClick */
  onClick?: () => void,
}

const StyledButton: ReactComponentStyled<ButtonProps> = styled.button`
  background-color: green;
  padding: 10px 20px;
  color: white;
`

const Button = (props: ButtonProps) => <StyledButton {...props} />
Button.defaultProps = {
  color: 'blue',
  onClick: () => {},
}

export default Button
