import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BlueCard from 'components/MyProfile/BlueCard'
import Spacer from 'components/Page/Spacer'
import ShareButton from 'components/Feed/ShareButton'
import TeamAvatarToFeed from 'components/MyProfile/TeamAvatarToFeed'
import { numberWithCommas } from 'services/utils'
import { openCardVideosPage } from 'services/navigation'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import { COINS_GOAL } from 'constants'

export default ({ item, navigation, renderBottomEl = () => {} }) => {
  return (
    <BlueCard wrapPadding="10px">
      <Row>
        <TeamAvatarToFeed item={item} navigation={navigation} size={AVATAR_SIZE} />
        <Spacer w={10} />

        <View>
          <Texts.BoldTitleText>{item?.teamName || item?.teamId}</Texts.BoldTitleText>
          <Spacer h={5} />
          <Row>{renderBottomEl()}</Row>
        </View>
        <FlexView />

        <View>
          <PlayButton url={item?.video_url} title={item?.teamSlogan} navigation={navigation} />
          <Spacer h={5} />
          <ShareButton item={item} navigation={navigation} imageSource={Images.share} size={30} />
        </View>
      </Row>
    </BlueCard>
  )
}

export const AlmostMineBottomElement = ({ item }) => {
  const getLikeCounts = () => {
    const likeCounts = item.reaction_counts?.like
    return likeCounts ? numberWithCommas(COINS_GOAL - likeCounts) : 0
  }

  return (
    <>
      <Icon source={Images.coin} resizeMode="contain" />
      <Spacer w={5} />
      <CoinNumberText>{getLikeCounts()}</CoinNumberText>
      <Spacer w={5} />
      <CoinText>{'Coins needed\r\nto Mint'}</CoinText>
    </>
  )
}

export const MyAssetsBottomElement = ({ item }) => {
  return (
    <>
      <NumberText>0.1%</NumberText>
      <Spacer w={20} />
      <NumberText>${item.balance}$</NumberText>
    </>
  )
}

const PlayButton = ({ url, title, navigation }) => {
  const dispatch = useDispatch()

  const onPress = () => {
    if (url) {
      const params = {
        videos: [
          {
            url,
            title,
          },
        ],
      }
      dispatch(openCardVideosPage(navigation, params))
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <WrapPlayIcon>
        <RightIcon source={Images.playWhite} resizeMode="contain" />
      </WrapPlayIcon>
    </TouchableOpacity>
  )
}

const AVATAR_SIZE = 60
const IMAGE_SIZE = 25
const RIGHT_IMAGE_SIZE = 20

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
`

const View = styled.View``

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`

const RightIcon = styled.Image`
  height: ${RIGHT_IMAGE_SIZE}px;
  width: ${RIGHT_IMAGE_SIZE}px;
`

const CoinText = styled(Texts.SmallText)`
  color: ${Colors.RED_PINK};
  line-height: 12px;
`

const CoinNumberText = styled(CoinText)`
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`

const NumberText = styled(Texts.SmallText)`
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${Colors.COMMON_BLUE};
`

const FlexView = styled.View`
  flex: 1;
`

const WrapPlayIcon = styled.View`
  background: ${Colors.COMMON_GREY};
  border-radius: ${RIGHT_IMAGE_SIZE}px;
  height: ${RIGHT_IMAGE_SIZE + 10}px;
  width: ${RIGHT_IMAGE_SIZE + 10}px;
  justify-content: center;
  align-items: center;
`
