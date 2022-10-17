import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

const HEIGHT = 20

export default ({ progress, color }) => {
  return progress ? (
    <Container color={color}>
      <Progress width={progress} color={color} />
      <Status>{progress}%</Status>
    </Container>
  ) : null
}

const Container = styled.View`
  border: 1px solid ${p => p.color || Colors.BUTTON_BLUE};
  border-radius: 10px;
  height: ${HEIGHT}px;
  overflow: hidden;
`
const Progress = styled.View`
  background-color: ${p => p.color || Colors.BUTTON_BLUE};
  height: ${HEIGHT}px;
  width: ${p => p.width || 0}%;
`

const Status = styled(Texts.SmallText)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`
