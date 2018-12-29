// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Dialog as ReachDialog } from '@reach/dialog'
import type { Theme } from '../designSystem/theme'
import { Flexbox } from '../designSystem'
import '@reach/dialog/styles.css'

type DialogProps = {
  className?: any,
  children: any,
  theme?: Theme,
  maxWidth?: string,
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

// export default class Dialog extends React.Component<DialogProps> {
//   wrapperRef = null
//   constructor(props) {
//     super(props)
//     this.wrapperRef = React.createRef()
//   }

//   componentDidMount() {
//     document.addEventListener('mousedown', this.handleClickOutside)
//   }

//   componentWillUnmount() {
//     document.removeEventListener('mousedown', this.handleClickOutside)
//   }
//   render() {
//     const { className, children, onClose } = this.props
//     return (
//       <StyledDialog className={className}>
//         <Flexbox vertical>
//           <Flexbox right>
//             <CloseButton onClick={onClose}>X</CloseButton>
//           </Flexbox>
//           {children}
//         </Flexbox>
//       </StyledDialog>
//     )
//   }

//   handleClickOutside = (event: any) => {
//     console.log('event', event)
//     console.log('event.target', event.target)
//     console.log('this.wrapperRef', this.wrapperRef)
//     // if (this.buttonRef.contains(event.target)) {
//     //   event.preventDefault()
//     // }
//     // if (this.wrapperRef && !this.wrapperRef.contains('data-reach-dialog-overlay')) {
//     //   console.log('if')
//     //   this.props.onClose && this.props.onClose()
//     // }
//   }
// }

const Dialog = ({ className, children, onClose, maxWidth }: DialogProps) => (
  <StyledDialog className={className} maxWidth={maxWidth}>
    <CloseButton onClick={onClose}>X</CloseButton>
    {children}
  </StyledDialog>
)

StyledDialog.displayName = 'Dialog'
export default Dialog
