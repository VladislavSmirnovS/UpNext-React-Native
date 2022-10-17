import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'

const HEIGHT = 13

export default ({ progress, quitProgress }) => {
  return (
    <Container>
      <Progress width={progress} />
      {quitProgress ? <QuitProgress time={quitProgress} /> : null}
    </Container>
  )
}

const Container = styled.View`
  border: 2px solid ${Colors.COMMON_PURPLE};
  borderRadius: 20px;
  height: ${HEIGHT}px;
  overflow: visible;
`

const Progress = styled.View`
  background-color: ${Colors.TEXT_BRIGHT_BLUE};
  borderRadius: 100;
  height: 13.5px;
  width: ${p => p.width || 0}%;
  position: absolute;
  top: -2;
  left: -2;
`

const QuitProgress = styled.View`
  background-color: ${Colors.TEXT_RED};
  height: 9px;
  left: ${p => p.time || 0}%;
  width: 9px;
  margin-left: -4px;
  position: absolute;
  borderRadius: 100;
`
