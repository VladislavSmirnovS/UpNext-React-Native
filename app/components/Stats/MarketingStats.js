import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Loader from 'components/Page/Loader'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ isLoading, linkClickData, investData }) => {
  return (
    <>
      <Texts.NewBoldTitleText>Marketing Stats</Texts.NewBoldTitleText>
      <Spacer h={20} />

      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          <LinkClicksData item={linkClickData} />
          <InvestData item={investData} />
        </Row>
      )}
    </>
  )
}

const LinkClicksData = ({ item }) => {
  return (
    <View>
      <Row>
        <ShareIcon tintColor={Colors.MENU_BLUE} background={Colors.WHITE} onPress={item.onPress} />
        <Spacer w={10} />
        <Texts.PurpleText>{item.value || 0}</Texts.PurpleText>
      </Row>

      <CenteredBlueText>{item.label}</CenteredBlueText>
    </View>
  )
}

const InvestData = ({ item }) => {
  return (
    <View>
      <Row>
        <View>
          <ShareIcon
            tintColor={Colors.WHITE}
            background={Colors.MENU_BLUE}
            onPress={item.onPress}
          />

          <AbsoluteCoin>
            <CoinIcon />
          </AbsoluteCoin>
        </View>
        <Spacer w={10} />
        <Texts.PurpleText>{item.value || 0}</Texts.PurpleText>
      </Row>

      <CenteredBlueText>{item.label}</CenteredBlueText>
    </View>
  )
}

const CenteredBlueText = styled(Texts.PurpleText)`
  font-weight: 400;
  font-size: 18px;
  text-align: center;
`

const ShareIcon = ({ tintColor, background, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageWrapper background={background}>
        <Image source={Images.newEmptyShare} resizeMode="contain" tintColor={tintColor} />
      </ImageWrapper>
    </TouchableOpacity>
  )
}

const CoinIcon = () => {
  return <CoinImage source={Images.coin} resizeMode="contain" />
}

const CoinImage = styled.Image`
  height: ${15}px;
  width: ${15}px;
`

const AbsoluteCoin = styled.View`
  position: absolute;
  top: -6px;
  right: -6px;
`

const IMAGE_SIZE = 24

const Image = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  tint-color: ${p => p.tintColor || Colors.MENU_BLUE}};
`

const ImageWrapper = styled.View`
  border-radius: ${IMAGE_SIZE + 10 / 4}px;
  padding: 5px;
  align-self: center;
  justify-content: center;
  background: ${p => p.background || Colors.WHITE};
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const View = styled.View`
  align-items: center;
`

const TouchableOpacity = styled.TouchableOpacity``
