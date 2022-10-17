import React, { memo } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { TOP_INSETS } from 'components/Control/DeviceHeight'
import { TAB_BAR_HEIGHT } from 'components/Feed/Tab'
import { useFeedNewQueueLength } from 'store/feed/feed.uses'

const NewActivityButton = ({ onPress }) => {
  const feedNewQueueLength = useFeedNewQueueLength()

  if (!feedNewQueueLength) {
    return null
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Texts.SubtitleText>New Posts</Texts.SubtitleText>
    </TouchableOpacity>
  )
}

const areTabPropsEqual = (prevProps, nextProps) => {
  return true
}
export default memo(NewActivityButton, areTabPropsEqual)

const { width } = Dimensions.get('window')

const TouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  background: ${Colors.WHITE};
  padding: 5px 10px;
  border-radius: 20px;
  top: ${TAB_BAR_HEIGHT + TOP_INSETS}px;
  right: ${width / 2 - 45}px;
`
