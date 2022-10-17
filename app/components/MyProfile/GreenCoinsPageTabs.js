import React, { useState, memo } from 'react'
import AnimationTab from 'components/Control/AnimationTab'
import GreenCoinsMyAssetsTab from 'components/MyProfile/GreenCoinsMyAssetsTab'
import GreenCoinsAlmostMineTab from 'components/MyProfile/GreenCoinsAlmostMineTab'

const DEFAULT_ACTIVE_TAB = 0

const GREEN_MY_ASSETS = 'my_assets'
const GREEN_ALMOST_MIN = 'almost_mine'

const TABS = [
  { key: GREEN_MY_ASSETS, title: 'My NFTs' },
  { key: GREEN_ALMOST_MIN, title: 'Almost mine' },
]

export default ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState(DEFAULT_ACTIVE_TAB)

  const renderScene = ({ route }) => {
    switch (route.key) {
      case GREEN_MY_ASSETS: {
        return <MemoGreenCoinsMyAssetsTab navigation={navigation} />
      }

      case GREEN_ALMOST_MIN: {
        return <MemoGreenCoinsAlmostMineTab navigation={navigation} />
      }
    }
  }

  return (
    <AnimationTab
      tabs={TABS}
      activeTab={currentTab}
      setActiveTab={setCurrentTab}
      renderScene={renderScene}
    />
  )
}

const areTabPropsEqual = (prevProps, nextProps) => {
  return true
}

const MemoGreenCoinsMyAssetsTab = memo(GreenCoinsMyAssetsTab, areTabPropsEqual)
const MemoGreenCoinsAlmostMineTab = memo(GreenCoinsAlmostMineTab, areTabPropsEqual)
