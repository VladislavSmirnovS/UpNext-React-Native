import React, { useState, useEffect } from 'react'
import AnimationTab from 'components/Control/AnimationTab'
import PageContainer from 'components/Page/PageContainer'
import Founders from 'components/Network/Founders'
import LaunchPad from 'components/Launcher/LaunchPad'
import MyLauncher from 'components/Launcher/MyLauncher'
import mixpanel from 'services/mixpanel'
import { useUserIsMentor } from 'store/user/user.uses'
import MentorNetwork from 'screens/MentorNetwork'

const NetworkScreen = ({ navigation }) => {
  const userIsMentor = useUserIsMentor()

  if (userIsMentor) {
    return <MentorNetwork navigation={navigation} />
  }

  return <Network navigation={navigation} />
}

const DEFAULT_TAB = 1
const NETWORK_TABS = [{ key: 'founders', title: 'Founders' }]

const Network = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)

  useEffect(() => {
    if (navigation.state.params) {
      const { defaultActiveTab } = navigation.state.params
      onChangeActiveTab(defaultActiveTab)
    }
  }, [navigation.state.params])

  const onChangeActiveTab = currentTab => {
    const tab = NETWORK_TABS[currentTab]
    if (tab) {
      setActiveTab(currentTab)
      const trackEvent = tab?.title
      mixpanel.trackEvent(trackEvent)
    }
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'founders':
        return <Founders navigation={navigation} />
      case 'launch_pad':
        return <LaunchPad navigation={navigation} />
      case 'my_launcher':
        return <MyLauncher navigation={navigation} />
    }
  }

  return (
    <PageContainer navigation={navigation} noPadding hideTopHeader>
      <Founders navigation={navigation} />
    </PageContainer>
  )
}

NetworkScreen.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default NetworkScreen
