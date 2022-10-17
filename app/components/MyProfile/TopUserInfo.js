import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import UserInfo from 'components/MyProfile/UserInfo'
import AvatarButton from 'components/Common/AvatarBtn'
import Spacer from 'components/Page/Spacer'
import { useUser } from 'store/user/user.uses'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import { openMyGeneralPage, openGetCoinPage, openGreenCoinPage } from 'services/navigation'
import { getUserAvatarProps } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const onAvatarPress = () => {
    dispatch(openMyGeneralPage(navigation))
  }

  const onLikeCoinPress = () => {
    dispatch(openGetCoinPage(navigation))
  }

  const onGreenPress = () => {
    dispatch(openGreenCoinPage(navigation))
  }

  return (
    <Container>
      <Row>
        <AvatarButton {...getUserAvatarProps(user)} onPress={onAvatarPress} size={AVATAR_SIZE} />
        <Spacer w={5} />
        <UserInfo user={user} subTitle="Entrepreneur" />
      </Row>
      <Spacer w={5} />
      <Row>
        <CoinBalanceView icon={Images.coin} balance={user?.coins} onPress={onLikeCoinPress} />
        <Spacer w={5} />
        <CoinBalanceView icon={Images.upCoin} balance={0} onPress={onGreenPress} />
      </Row>
    </Container>
  )
}

const CoinBalanceView = ({ icon, balance, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress ? onPress : null} activeOpacity={onPress ? 0 : 1}>
      <Icon source={icon} resizeMode="contain" />
      <Texts.BoldDarkPurpleText >{balance}</Texts.BoldDarkPurpleText>
    </TouchableOpacity>
  )
}

export const AVATAR_SIZE = 80
export const IMAGE_SIZE = 50

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${Styles.PAGE_PADDING};
  align-items: center;
  width: 100%;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`
