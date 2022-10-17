import { View, Image, TouchableOpacity as TouchableHighlight } from 'react-native'
import { useContext, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { NavigationContext } from 'react-navigation'
import styled from 'styled-components'
import {
  openAdminPage,
  openChatPage,
  openWalletPage,
  openMyProfilePage
} from 'services/navigation'
import TabUserAvatar from 'navigation/TabUserAvatar'
import { useUserFirstName, useAdminUser } from 'store/user/user.uses'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

const imageStyle = {
  marginRight: 16,
}

const mainTextColor = Colors.TEXT_DARK_BLUE

const AppHeader = () => {
  const dispatch = useDispatch()
  const navigation = useContext(NavigationContext)

  const chatColor = useMemo(
    () => (navigation.state.routeName === 'Chat' ? Colors.MENU_PURPLE : Colors.MENU_BLUE),
    [navigation.state.routeName],
  )

  const WalletColor = useMemo(
    () => (navigation.state.routeName === 'Wallet' ? Colors.MENU_PURPLE : Colors.MENU_BLUE),
    [navigation.state.routeName],
  )

  const userName = useUserFirstName()
  const adminUser = useAdminUser()

  const onOpenAdminPage = () => {
    const params = { backRoute: navigation.state.routeName }
    dispatch(openAdminPage(navigation, params))
  }

  const onWalletPress = () => {
    dispatch(openWalletPage(navigation))
  }

  const onChatPress = () => {
    dispatch(openChatPage(navigation))
  }

  const onProfilePress = () => {
    dispatch(openMyProfilePage(navigation))
  }

  return (
    <HeaderWrapper>
      <Image source={Images.headerLogo} />
      {adminUser && (
        <UserSelector color={mainTextColor} onPress={onOpenAdminPage}>
          <AdminText color={mainTextColor}>{userName}</AdminText>
        </UserSelector>
      )}
      <IconsWrapper>
        <TouchableHighlight onPress={onWalletPress}>
          <Image
            source={Images.headerWallet}
            style={{ ...imageStyle, width: 34, height: 28, tintColor: WalletColor }}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={onChatPress}>
          <Image
            source={Images.headerChat}
            style={{ ...imageStyle, width: 34, height: 28, tintColor: chatColor }}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={onProfilePress}>
          <TabUserAvatar />
        </TouchableHighlight>
      </IconsWrapper>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
`

const UserSelector = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border-color: ${p => p.color || Colors.TEXT_DARK_BLUE};
  border-width: 1px;
  border-radius: 3px;
  flex-direction: row;
`

const AdminText = styled(Texts.SubtitleText)`
  color: ${p => p.color || Colors.TEXT_DARK_BLUE};
`

const IconsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`

export default AppHeader
