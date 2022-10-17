import React, { useState } from 'react'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'
import VideoModal from 'components/Chat/VideoModal'
import Images from 'appearance/images'

export default ({ item }) => {
  const { url } = item
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const onShow = () => {
    setIsVideoVisible(true)
  }

  const onHide = () => {
    setIsVideoVisible(false)
  }

  return (
    <Wrapper onPress={onShow}>
      <VideoPreview source={{ uri: url }} resizeMode={'contain'} />
      <PlayButton>
        <PlayImage source={Images.playWhite} />
      </PlayButton>
      <VideoModal isVisible={isVideoVisible} onHide={onHide} url={url} />
    </Wrapper>
  )
}

const SIZE = 100

const Wrapper = styled.TouchableOpacity`
  position: relative;
`

const VideoPreview = styled(FastImage)`
  background: black;
  height: ${SIZE}px;
  width: ${SIZE}px;
`

const PlayButton = styled.View`
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlayImage = styled.Image`
  height: 40px;
  width: 40px;
`
