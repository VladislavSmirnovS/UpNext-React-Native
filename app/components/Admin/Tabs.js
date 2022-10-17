import React, { useState, useEffect } from 'react'
import AnimationTab from 'components/Control/AnimationTab'
import Codes from 'components/Admin/Codes'
import Socials from 'components/Admin/Socials'
import Teams from 'components/Admin/Teams'
import Reports from 'components/Admin/Reports'
import Stats from 'components/Admin/Stats'

const DEFAULT_TAB = 0

export default ({ navigation }) => {
  const defaultActiveTab = navigation?.state?.params?.defaultActiveTab

  const [activeTab, setActiveTab] = useState(defaultActiveTab || DEFAULT_TAB)

  useEffect(() => {
    setActiveTab(defaultActiveTab || DEFAULT_TAB)
  }, [defaultActiveTab])

  const openSocialsTab = () => {
    setActiveTab(1) // socials
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'codes':
        return <Codes navigation={navigation} />
      case 'socials':
        return <Socials navigation={navigation} />
      case 'teams':
        return <Teams navigation={navigation} />
      case 'reports':
        return <Reports navigation={navigation} />
      case 'stats':
        return <Stats navigation={navigation} openSocialsTab={openSocialsTab} />
    }
  }

  return (
    <AnimationTab
      tabs={TABS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      renderScene={renderScene}
    />
  )
}

const TABS = [
  { key: 'codes', title: 'Codes' },
  { key: 'socials', title: 'Socials' },
  { key: 'teams', title: 'Teams' },
  { key: 'reports', title: 'Flags' },
  { key: 'stats', title: 'Stats' },
]
