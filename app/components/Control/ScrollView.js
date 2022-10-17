import React from 'react'
import { Dimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'

const initialLayout = { width: Dimensions.get('window').width }

export default ({ currentStep, setCurrentStep, tabs, renderScene }) => {
  const renderTabBar = () => null

  return (
    <TabView
      // lazy
      navigationState={{ index: currentStep, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setCurrentStep}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  )
}
