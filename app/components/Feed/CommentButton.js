import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Images from 'appearance/images'
import { openFeedSinglePage } from 'services/navigation'
import Colors from 'appearance/colors'

const CommentButton = ({ item, navigation, feedGroup, feedId, onSaveVideoProgress }) => {
  const dispatch = useDispatch()

  const onOpenCommentPage = () => {
    requestAnimationFrame(() => {
      onSaveVideoProgress()
    })
    const params = {
      activity: item,
      feedGroup: 'common',
      tabName: feedGroup,
      userId: feedId,
    }
    dispatch(openFeedSinglePage(navigation, params))
  }

  return (
    <ReactionWrapper onPress={onOpenCommentPage}>
      <CommentImage source={Images.comments} resizeMode="contain" />
      {item.reaction_counts?.comment ? (
        <WhiteText>{item.reaction_counts?.comment}</WhiteText>
      ) : null}
    </ReactionWrapper>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  const props = ['item', 'feedGroup', 'feedId']
  return props.every(prop => prevProps?.[prop] === nextProps?.[prop])
}

export default memo(CommentButton, arePropsEqual)

const IMAGE_SIZE = 30

const CommentImage = styled.Image`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`

const ReactionWrapper = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  justify-content: center;
`

const WhiteText = styled.Text`
  position: absolute;
  color: ${Colors.MENU_BLUE};
  padding-bottom: 6px;
  font-size: 12px;
`
