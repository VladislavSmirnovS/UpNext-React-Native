import React, { memo } from 'react'
import styled from 'styled-components'
import Images from 'appearance/images'

const PlayButton = ({ isPlay, playButtonSize }) => {
  if (isPlay) {
    return null
  }

  return (
    <Container>
      <PlayImage playButtonSize={playButtonSize} />
    </Container>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.isPlay === nextProps.isPlay
}

export default memo(PlayButton, arePropsEqual)

const IMAGE_SIZE = 40

const PlayImage = ({ playButtonSize }) => (
  <Image source={Images.playWhite} playButtonSize={playButtonSize} />
)

const Container = styled.View`
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
`

const Image = styled.Image`
  height: ${p => p.playButtonSize || IMAGE_SIZE}px;
  width: ${p => p.playButtonSize || IMAGE_SIZE}px;
`
