import React, { memo } from 'react'
import styled from 'styled-components'
import CoinsButton from 'components/Feed/CoinsButton'
import CommentButton from 'components/Feed/CommentButton'
import ShareButton from 'components/Feed/ShareButton'
import VideoInfoBottom from 'components/Feed/VideoInfoBottom'
import Spacer from 'components/Page/Spacer'

const VideoBottom = ({
  item,
  navigation,
  feedId,
  feedGroup,
  coinsButtonProps,
  onSaveVideoProgress,
}) => {
  const top = item.reaction_counts?.comment ? -95 : -80

  return (
    <BottomAbsoluteWrapper>
      <VideoInfoBottom navigation={navigation} item={item} />

      <Container top={top}>
        <ShareButton item={item} navigation={navigation} />
        <Spacer h={10} />

        <CommentButton
          item={item}
          navigation={navigation}
          feedId={feedId}
          feedGroup={feedGroup}
          onSaveVideoProgress={onSaveVideoProgress}
        />
        <Spacer h={10} />

        <CoinsButton {...coinsButtonProps} />
        <Spacer h={10} />
      </Container>
    </BottomAbsoluteWrapper>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  const props = ['item', 'feedId', 'feedGroup', 'coinsButtonProps']
  return props.every(prop => prevProps?.[prop] === nextProps?.[prop])
}

export default memo(VideoBottom, arePropsEqual)

const BottomAbsoluteWrapper = styled.View`
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  padding: 0 12px 10px;
`

const Container = styled.View`
  position: absolute;
  top: ${p => p.top - 52 || -80}px;
  right: 10px;
  align-items: flex-end;
  justify-content: center;
  z-index: 2;
`
