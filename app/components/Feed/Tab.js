import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { TOP_INSETS } from 'components/Control/DeviceHeight'
import LinearGradient from 'react-native-linear-gradient'
import Colors from 'appearance/colors'

export default ({ tabs, activeTab, setCurrentStep, renderScene }) => {
  const jumpTo = key => {
    const newIndex = tabs.findIndex(item => item.key === key)
    if (activeTab !== newIndex) {
      setCurrentStep(newIndex)
    }
  }

  return (
    <>
      <TabView
        navigationState={{ index: activeTab, routes: tabs }}
        renderScene={renderScene}
        onIndexChange={setCurrentStep}
        renderTabBar={renderContentTabBar}
        initialLayout={initialLayout}
        lazy
      />

      <LinearGradientBackground>
        <TabBar
          navigationState={{ index: activeTab, routes: tabs }}
          jumpTo={jumpTo}
          activeColor={Colors.WHITE}
          inactiveColor={`${Colors.WHITE}60`}
          indicatorStyle={INDICATOR_STYLE}
          labelStyle={LABEL_STYLE}
          style={TAB_BAR_STYLE}
          tabStyle={TAB_STYLE}
          position={activeTab}
          contentContainerStyle={TAB_BAR_CONTAINER_STYLE}
        />
      </LinearGradientBackground>
    </>
  )
}

const renderContentTabBar = () => null

const { width } = Dimensions.get('window')
const initialLayout = { width }

export const TAB_BAR_HEIGHT = 60
const TAB_BAR_STYLE = {
  backgroundColor: 'transparent',
  elevation: 0,
  paddingTop: 10,
  marginTop: 70,
}
const TAB_BAR_CONTAINER_STYLE = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
const TAB_STYLE = {
  width: 'auto',
  padding: 10,
}
const LABEL_STYLE = [
  {
    textTransform: 'capitalize',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 6,
  },
]
const INDICATOR_STYLE = { height: 0, width: 0 }

const LinearGradientBackground = styled.View`
  position: absolute;
  width: 100%;
`
const GRADIENT_COLORS = ['black', 'transparent']
