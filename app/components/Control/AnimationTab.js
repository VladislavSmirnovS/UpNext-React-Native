import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import Colors from 'appearance/colors'

export default ({
  tabs,
  renderScene,
  activeTab = 0,
  setActiveTab,
  inactiveColor = Colors.TEXT_DARK_BLUE,
  textColor = Colors.COMMON_BLUE,
  indicatorColor = Colors.COMMON_BLUE,
  tabStyle,
  renderIcon,
}) => {
  const [index, setIndex] = useState(activeTab)
  const [routes] = useState(tabs)

  const indicatorStyle = { backgroundColor: indicatorColor }

  useEffect(() => {
    setIndex(activeTab)
  }, [activeTab])

  const onIndexChange = index => {
    setActiveTab && setActiveTab(index)
    setIndex(index)
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={textColor}
      inactiveColor={inactiveColor}
      indicatorStyle={indicatorStyle}
      labelStyle={LABEL_STYLE}
      style={TAB_BAR_STYLE}
      tabStyle={tabStyle || TAB_STYLE}
      renderIcon={renderIcon}
    />
  )

  return (
    <StyledTabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      renderTabBar={renderTabBar}
      initialLayout={initialLayout}
      lazy
    />
  )
}

const initialLayout = { width: Dimensions.get('window').width }

const LABEL_STYLE = [{ textTransform: 'capitalize', fontSize: 16 }]
const TAB_BAR_STYLE = { backgroundColor: 'transparent', elevation: 0 }
const TAB_STYLE = { padding: 0 }

const StyledTabView = styled(TabView)`
  width: 100%;
  height: 100%;
  flex: 1;
`
