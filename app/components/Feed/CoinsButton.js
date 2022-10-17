import React from 'react'
import styled, { css } from 'styled-components'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import AlertModal from 'components/Control/AlertModal'
import { numberWithCommas } from 'services/utils'

export default ({
  isCoinPressLoading,
  isUpPressIn,
  isDownPressIn,
  isLikeModalVisible,
  isLikeTutorialShow,
  isDislikeModalVisible,
  isLike,
  likeCounts,
  onLikeModalConfirm,
  onDislikeModalConfirm,
  onPress,
}) => {
  return (
    <>
      <Button onPress={onPress} disabled={isCoinPressLoading}>
        <Row>
          <Image source={isLike ? Images.coin : Images.emptyCoin} resizeMode="contain" />
          <Text style={TEXT_STYLE}>{getLikeCounts(likeCounts)}</Text>
          <PressEffect color={getColor(isUpPressIn, isDownPressIn)} />
        </Row>
      </Button>

      <AlertModal
        isVisible={isLikeModalVisible && isLikeTutorialShow}
        text={LIKE_MODAL_TEXT}
        okText="OK"
        onConfirm={onLikeModalConfirm}
      />
      <AlertModal
        isVisible={isDislikeModalVisible}
        text={DISLIKE_MODAL_TEXT}
        okText="OK"
        onConfirm={onDislikeModalConfirm}
      />
    </>
  )
}

const getColor = (isUpPressIn, isDownPressIn) => {
  return isUpPressIn ? 'green' : isDownPressIn ? 'red' : null
}

const getLikeCounts = likeCounts => {
  return likeCounts ? numberWithCommas(likeCounts) : 0
}

const LIKE_MODAL_TEXT =
  'Nice! lit startup ...\r\nInvestments become permanent after 5 min if you made this investment by mistake and you would like to take it back do it now'

const DISLIKE_MODAL_TEXT =
  'You already placed a coin on this pitch.\r\nCanceling an investment can take place only in the first 5 min after making it and 48h after video is changed'

const TEXT_STYLE = {
  textShadowColor: 'white',
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 10,
  color: Colors.WHITE,
}

const Image = styled.Image`
  width: 30px;
  height: 30px;
`

const Row = styled.View`
  flex-direction: column;
`

const Button = styled.TouchableOpacity``

const PressEffect = styled.View`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 34px;
  height: 34px;
  border-radius: 22px;
  opacity: 0.6;
  ${p =>
    p.color &&
    css`
      background: ${p.color};
    `};
`

const Text = styled(Texts.PodcastSubtitleText)`
  color: ${Colors.TEXT_DARK_BLUE};
  text-align: center;
`
