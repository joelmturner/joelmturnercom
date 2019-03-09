// @flow
import React, { useState, Fragment, type Node } from 'react'
import styled, { type ReactComponentStyled } from 'styled-components'
import type { Theme } from '../../designSystem/theme'
import Tab from './Tab'

type TabsProps = {
 children: any[],
 theme?: Theme,
}

const TabList: ReactComponentStyled<TabsProps> = styled.ol`
 border-bottom: 1px solid ${({ theme }) => theme && theme.Tabs.default.border};
 padding-left: 0;
`

function Tabs({ children }: TabsProps): Node {
 const [activeTab, setActiveTab] = useState(children[0].props.label)
 return (
  <Fragment>
   <TabList>
    {children.map(child => (
     <Tab
      activeTab={activeTab}
      key={child.props.label}
      label={child.props.label}
      onClick={tab => setActiveTab(tab)}
     />
    ))}
   </TabList>
   <div>{children.map(child => (child.props.label === activeTab ? child : undefined))}</div>
  </Fragment>
 )
}

export default Tabs
