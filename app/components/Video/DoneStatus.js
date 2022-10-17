import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ isDone }) => (
  <Container isDone={isDone}>
    <StatusText isDone={isDone}>Done</StatusText>
  </Container>
)

const STATUS_HEIGHT = 40

const Container = styled.View`
  background: ${p => (p.isDone ? '#41ffaf' : 'transparent')};
  position: absolute;
  top: 0;
  width: 100%;
  height: ${STATUS_HEIGHT}px;
  align-items: center;
  justify-content: center;
`

const StatusText = styled(Texts.TitleText)`
  color: ${p => (p.isDone ? Colors.BLACK : 'transparent')};
  font-weight: bold;
`
