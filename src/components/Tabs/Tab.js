// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import Img from 'gatsby-image'
import { Row } from '../../designSystem'
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

const getColsBySize = size => {
  switch (size) {
    case 's':
      return 8
    case 'm':
      return 4
    case 'l':
      return 1
  }
}

const TabContent = ({
  data,
  children,
  size = 'm',
  style,
}: {
  data: any,
  children?: React.Node,
  size?: 's' | 'm' | 'l',
  style?: any,
}) =>
  data && (
    <>
      {children}
      <Row maxColumns={getColsBySize(size)} gap="1rem" style={style}>
        {data.map(edge =>
          edge.node.localImage ? (
            <Img key={edge.node.id} fluid={edge.node.localImage.childImageSharp.fluid} />
          ) : (
            edge.node.images && (
              <img
                key={edge.node.id}
                src={edge.node.images.standard_resolution.url}
                width={edge.node.images.standard_resolution.width}
                height={edge.node.images.standard_resolution.height}
              />
            )
          )
        )}
      </Row>
    </>
  )

export default Tab
export { TabContent }
