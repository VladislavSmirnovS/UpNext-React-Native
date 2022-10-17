import React, { useState } from 'react'
import styled from 'styled-components'
import VideoSelector from 'components/MyProfile/VideoSelector'
import Player from 'components/Video/Player'
import Loading from 'components/Page/Loading'
import { Icon } from 'native-base'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default ({ url, onSave }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = video => {
    setIsLoading(true)
    onSave(video)
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader />
  }

  if (url) {
    return (
      <>
        <Player url={url} maxHeight={VIDEO_SIZE} withPlayButton />
        <VideoSelector onUpload={handleSave}>
          <Texts.SubtitleText style={{ color: Colors.COMMON_BLUE, alignSelf: 'flex-end' }}>
            Change video
          </Texts.SubtitleText>
        </VideoSelector>
      </>
    )
  }

  return (
    <VideoSelector align="center" onUpload={handleSave}>
      <PlusWrapper>
        <PlusIcon name="add-circle-outline" />
      </PlusWrapper>
    </VideoSelector>
  )
}

const Loader = () => (
  <WrapperLoader>
    <Loading />
  </WrapperLoader>
)

const VIDEO_SIZE = 208
const IMAGE_SIZE = 40

const PlusWrapper = styled.View`
  background: ${Colors.INPUT_BACKGROUND_GREY};
  height: ${VIDEO_SIZE}px;
  width: 100%;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`

const PlusIcon = styled(Icon)`
  color: #000;
  font-size: ${IMAGE_SIZE}px;
  margin: 0;
  padding: 0;
`

const WrapperLoader = styled.View`
  height: 200px;
`
