import React, { useState } from 'react'
import styled from 'styled-components'
import Video from 'react-native-video'
import Loading from 'components/Page/Loading'
import Images from 'appearance/images'

export default ({ isVisible, onHide, url }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlay, setIsPlay] = useState(true)

  const onPress = () => {
    setIsLoading(true)
    onHide()
  }

  const onLoad = () => {
    setIsLoading(false)
  }

  const onEnd = () => {
    setIsPlay(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableOpacity onPress={onPress}>
        <CenteredView>
          <DisableTouchableOpacity activeOpacity={1}>
            <TouchableOpacity
              onPress={isLoading ? null : () => setIsPlay(!isPlay)}
              activeOpacity={1}
            >
              <VideoBox
                isLoading={isLoading}
                source={{ uri: url }}
                resizeMode={'cover'}
                onLoad={onLoad}
                paused={!isPlay}
                onEnd={onEnd}
              />
              {isLoading ? (
                <Loading />
              ) : isPlay ? null : (
                <PlayButton>
                  <PlayImage source={Images.playWhite} />
                </PlayButton>
              )}
            </TouchableOpacity>
          </DisableTouchableOpacity>

          <Icon source={Images.closeCircle} resizeMode={'contain'} />
        </CenteredView>
      </TouchableOpacity>
    </Modal>
  )
}

const Modal = styled.Modal``

const TouchableOpacity = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`

const DisableTouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 40px;
  height: 250px;
  width: 100%;
`

const Icon = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
`

const VideoBox = styled(Video)`
  background: ${p => (p.isLoading ? 'black' : 'transparent')};
  width: 100%;
  height: 250px;
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
