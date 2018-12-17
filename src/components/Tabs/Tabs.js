// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Theme } from '../../designSystem/theme'
import Tab from './Tab'

type TabsProps = {
  children: any[],
  theme?: Theme,
}

const TabList = styled.ol`
  border-bottom: 1px solid ${({ theme }: TabsProps) => theme && theme.Tabs.default.border};
  padding-left: 0;
`

class Tabs extends React.Component<TabsProps, any> {
  constructor(props: TabsProps) {
    super(props)

    this.state = {
      activeTab: this.props.children[0].props.label,
    }
  }

  onClickTabItem = (tab: string) => {
    this.setState({ activeTab: tab })
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this

    return (
      <>
        <TabList>
          {children.map(child => (
            <Tab
              activeTab={activeTab}
              key={child.props.label}
              label={child.props.label}
              onClick={onClickTabItem}
            />
          ))}
        </TabList>
        <div>{children.map(child => (child.props.label === activeTab ? child : undefined))}</div>
      </>
    )
  }
}

export default Tabs
