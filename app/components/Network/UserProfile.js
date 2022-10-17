import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AnimationTab from 'components/Control/AnimationTab'
import Avatar from 'components/Common/Avatar'
import mixpanel from 'services/mixpanel'
import { EMPTY_COUNT } from 'root/app/constants'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import Founder from 'components/Network/Founder'
import LaunchPad from 'components/Launcher/LaunchPad'
import { openGetCoinPage } from 'services/navigation'

import { getUserAvatarProps, getUserFullName } from 'utils/user'
import { useDispatch } from 'react-redux'

export default ({ navigation, member }) => {
  const { age, school_country, teams } = member
  const dispatch = useDispatch()

  const onLikeCoinPress = () => {
    dispatch(openGetCoinPage(navigation))
  }

  const getAdditionalText = () => {
    return age && school_country ? age + ', ' + school_country : age || school_country
  }

  const coins = member?.coins || EMPTY_COUNT

  return (
    <>
      <TouchableOpacity>
        <UserHeaderContainer>
          <Avatar {...getUserAvatarProps(member)} size={AVATAR_SIZE} />
          <UserHeaderItems>
            <UserName>{getUserFullName(member)}</UserName>
            <UserDescription>{getAdditionalText()}</UserDescription>
            <Row>
              <UserDescription>Contacts: {member.age}</UserDescription>
              <StatsCoins onPress={onLikeCoinPress}>
                <TitleImage resizeMode="contain" source={Images.coin} />
                <UserDescription>{coins}</UserDescription>
              </StatsCoins>
            </Row>
          </UserHeaderItems>
        </UserHeaderContainer>
      </TouchableOpacity>

      <Network navigation={navigation} member={member} />
    </>
  )
}

const DEFAULT_TAB = 0
const NETWORK_TABS = [{ key: 'founder', title: 'Founder' }, { key: 'investor', title: 'Investor' }]

const Network = ({ navigation, member }) => {
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
      case 'founder':
        return <Founder navigation={navigation} test={member} />
      case 'investor':
        return <LaunchPad navigation={navigation} />
    }
  }

  return (
    <AnimationTab
      inactiveColor={Colors.TEXT_SHADOW_GREY}
      textColor={Colors.MENU_PURPLE}
      indicatorColor={Colors.MENU_PURPLE}
      tabs={NETWORK_TABS}
      activeTab={activeTab}
      setActiveTab={onChangeActiveTab}
      renderScene={renderScene}
      tabStyle={TAB_STYLE}
    />
  )
}

const AVATAR_SIZE = 75

const TAB_STYLE = { padding: 0 }

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const TouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 20px;
`

const UserHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`
const UserName = styled.Text`
  font-size: 26px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: bold;
`
const UserDescription = styled.Text`
  font-size: 16px;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const UserHeaderItems = styled.View`
  margin-left: 23px;
  max-width: 210px;
`

const StatsCoins = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 19px;
`
const TitleImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`
