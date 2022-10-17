import React from 'react'
import styled from 'styled-components'
import Loading from 'components/Page/Loading'
import Images from 'appearance/images'

export default ({ isLoading, isPlay }) => {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading size={IMAGE_SIZE} />
      </LoadingWrapper>
    )
  }

  if (isPlay) {
    return <PauseImage />
  }

  return <PlayImage />
}

const PlayImage = () => <Image source={Images.playWhite} />

const PauseImage = () => <Image source={Images.pause} />

const IMAGE_SIZE = 30

const LoadingWrapper = styled.View`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`

const Image = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  opacity: 0.7;
`
