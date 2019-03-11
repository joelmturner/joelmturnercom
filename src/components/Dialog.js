// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Dialog as ReachDialog } from '@reach/dialog'
import type { Theme } from '../designSystem/theme'
import '@reach/dialog/styles.css'

type DialogProps = {
 className?: any,
 children: any,
 theme?: Theme,
 maxWidth?: string,
 childRef?: HTMLElement,
 onClose: () => void,
}

const StyledDialog = styled(ReachDialog)`
 && {
  width: '75vh';
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '60vw')};
  margin: 10vh auto;
  background: transparent;
  padding: 0;
  position: relative;
 }
`

const CloseButton = styled.button`
 background: transparent;
 border: none;
 padding: 0;
 margin: 0 0 1rem;
 width: 1.3rem;
 height: 1.3rem;
 font-size: 1.3rem;
 color: ${({ theme }: Theme) => theme && theme.copy.p};
 cursor: pointer;
 position: absolute;
 right: -1.3rem;
 top: -1.5rem;
`

const Dialog = ({ className, children, onClose, maxWidth, childRef }: DialogProps) => (
 <StyledDialog className={className} maxWidth={maxWidth} onDismiss={onClose}>
  <CloseButton onClick={onClose}> X </CloseButton>
  <span ref={childRef ? childRef : undefined}>{children}</span>
 </StyledDialog>
)

StyledDialog.displayName = 'Dialog'
export default Dialog
