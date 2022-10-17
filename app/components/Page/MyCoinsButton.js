import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import { openGetCoinPage } from 'services/navigation'
import { useUserCoins } from 'store/user/user.uses'

export default ({ isColumn, isInverseHeader, navigation }) => {
  const dispatch = useDispatch()
  const userCoins = useUserCoins()

  const onCoinPress = () => {
    dispatch(openGetCoinPage(navigation))
  }

  const mainTextColor = isInverseHeader ? Colors.WHITE : Colors.TEXT_DARK_BLUE

  return (
    <Button onPress={onCoinPress} isColumn={isColumn}>
      <CoinImage source={Images.coin} resizeMode="contain" />
      {isColumn ? null : <Spacer w={5} />}
      <CoinsText color={mainTextColor} style={isInverseHeader ? TEXT_STYLE : null}>
        {userCoins || 0}
      </CoinsText>
    </Button>
  )
}

const TEXT_STYLE = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10,
}

const Button = styled.TouchableOpacity`
  margin-left: 10px;
  flex-direction: ${p => (p.isColumn ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
`

const CoinsText = styled(Texts.BoldTitleText)`
  color: ${p => p.color || Colors.TEXT_DARK_BLUE};
`

const CoinImage = styled.Image`
  width: 30px;
  height: 30px;
`
