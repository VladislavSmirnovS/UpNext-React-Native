import React, { memo } from 'react'
import { Button, Icon } from 'native-base'
import styled from 'styled-components'

const MutedButton = ({ isMuted, onSetIsMuted }) => {
  const muted = () => {
    onSetIsMuted && onSetIsMuted(false)
  }

  if (isMuted) {
    return <MutedBtn onPress={muted} icon="volume-mute" />
  }

  const unmuted = () => {
    onSetIsMuted && onSetIsMuted(true)
  }

  return <MutedBtn onPress={unmuted} icon="volume-high" />
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.isMuted === nextProps.isMuted
}

export default memo(MutedButton, arePropsEqual)

const MutedBtn = ({ onPress, icon }) => (
  <Wrapper>
    <Button onPress={onPress} dark rounded style={{ width: 40, height: 40 }}>
      <ButtonIcon name={icon} />
    </Button>
  </Wrapper>
)

const Wrapper = styled.View`
  position: absolute;
  right: 5px;
  bottom: 5px;
`

const ButtonIcon = styled(Icon)`
  margin: 0 10px;
  color: #fff;
  font-size: 18px;
`
