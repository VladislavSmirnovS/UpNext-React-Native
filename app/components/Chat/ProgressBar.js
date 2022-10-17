import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'

export default ({ progress }) => (
  <Container>
    <Progress width={progress} />
  </Container>
)

const HEIGHT = 2

const Container = styled.View`
  height: ${HEIGHT}px;
  background: ${Colors.TEXT_BRIGHT_BLUE};
`

const Progress = styled.View`
  background-color: ${Colors.TEXT_DARK_PURPLE};
  height: ${HEIGHT}px;
  width: ${p => p.width || 0}%;
`
