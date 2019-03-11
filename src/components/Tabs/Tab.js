// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import Img from 'gatsby-image'
import { Row, media } from '../../designSystem'
import { BodyText } from '../Text'
import type { Theme } from '../../designSystem/theme'

type TabProps = {
 activeTab: string,
 label: string,
 className?: any,
 onClick: (label: string) => void,
}

const Label = styled(BodyText)`
 margin: 0;
`

const StyledTab = styled.li`
 cursor: pointer;
 display: inline-block;
 list-style: none;
 margin-bottom: -1px;
 padding: 0.5rem 0.75rem;
 background-color: ${({ theme }: { theme: Theme }) => theme && theme.Tab.default.background};
 border: solid ${({ theme }: { theme: Theme }) => theme && theme.Tab.default.border};
 border-width: 1px 1px 0 1px;

 ${Label} {
  color: ${({ theme }: { theme: Theme }) => theme && theme.Tab.default.color};
 }

 ${({ active, theme }: { active: boolean, theme: Theme }) =>
  active &&
  css`
   background-color: ${theme && theme.Tab.active.background};
   border: solid ${theme && theme.Tab.active.border};
   border-width: 1px 1px 0 1px;
   ${Label} {
    color: ${theme && theme.Tab.active.color};
   }
  `}
`

const Tab = ({ onClick, activeTab, label, className }: TabProps) => {
 return (
  <StyledTab className={className} active={activeTab === label} onClick={() => onClick(label)}>
   <Label>{label}</Label>
  </StyledTab>
 )
}

type TabContentProps = {
 data: any,
 children?: React.Node,
 size?: 's' | 'm' | 'l',
 style?: any,
}

const StyledTabContent = styled(Row)`
 ${({ size }) => {
  switch (size) {
   case 's':
    return css`
     grid-gap: 0.25rem;
     grid-template-columns: repeat(auto-fill, minmax(142px, 1fr));
     ${media.phone`
            grid-template-columns: repeat(3, 1fr);
          `}
    `
   default:
   case 'm':
    return css`
     grid-gap: 0.5rem;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     ${media.phone`
            grid-template-columns: repeat(2, 1fr);
          `}
    `
   case 'l':
    return css`
     grid-gap: 1rem;
     grid-template-columns: 1fr;
     ${media.phone`
            grid-gap: .5rem;
          `}
    `
  }
 }}
`

const PreviewButton = styled.button`
 background: transparent;
 border: none;
 padding: 0;
 margin: 0;
`

const TabContent = ({ data, children, size = 'm', style, onImageClick }: TabContentProps) =>
 data && (
  <>
   {children}
   <StyledTabContent size={size} style={style}>
    {data.map(edge => (
     <PreviewButton
      key={edge.node.id}
      type="button"
      style={{ cursor: 'pointer' }}
      onClick={onImageClick ? () => onImageClick(edge) : undefined}>
      {edge.node.localImage ? (
       <Img key={edge.node.id} fadeIn fluid={edge.node.localImage.childImageSharp.fluid} />
      ) : (
       edge.node.images && (
        <img
         key={edge.node.id}
         src={edge.node.images.standard_resolution.url}
         width={edge.node.images.standard_resolution.width}
         height={edge.node.images.standard_resolution.height}
        />
       )
      )}
     </PreviewButton>
    ))}
   </StyledTabContent>
  </>
 )

export default Tab
export { TabContent }
