import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Spacer from 'components/Page/Spacer'
import { useUser } from 'store/user/user.uses'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import { openMyGeneralPage, openGetCoinPage, openGreenCoinPage } from 'services/navigation'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const onLikeCoinPress = () => {
    dispatch(openGetCoinPage(navigation))
  }

  const onGreenPress = () => {
    dispatch(openGreenCoinPage(navigation))
  }

  return (
    <Container>
      <CoinBalanceView
        icon={Images.coin}
        balance={user?.coins}
        onPress={onLikeCoinPress}
        title={'My Coins'}
      />
      <Spacer w={68} />
      <CoinBalanceView icon={Images.nftCoin} balance={0} onPress={onGreenPress}  title={'My NFT'} />
    </Container>
  )
}

const CoinBalanceView = ({ icon, balance, onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon source={icon} resizeMode="contain" />
      <Spacer h={10} />
      <ValueNameTitle numberOfLines={1}>{title}</ValueNameTitle>
      <Spacer h={3} />
      <ValueTitle>{balance}</ValueTitle>
    </TouchableOpacity>
  )
}

export const IMAGE_SIZE = 60

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  width:90;
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`

const ValueNameTitle = styled(Texts.PurpleSubTitleText)`
  line-height: 22px;
  font-size: 18px;
`
const ValueTitle = styled(Texts.PurpleSubTitleText)`
  line-height: 22px;
  font-size: 18px;
  font-weight: 700;
`
