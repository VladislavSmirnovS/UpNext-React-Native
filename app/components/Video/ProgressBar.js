import React, { memo } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'

const ProgressBar = ({ isBottomProgressBar, isBlueProgressBar, progress }) => (
  <Container isBottomProgressBar={isBottomProgressBar}>
    <Progress width={progress} isBlueProgressBar={isBlueProgressBar} />
  </Container>
)

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.progress === nextProps.progress
}

export default memo(ProgressBar, arePropsEqual)

const HEIGHT = 2

const Container = styled.View`
  width: 100%;
  height: ${HEIGHT}px;
  position: absolute;
  bottom: ${p => (p.isBottomProgressBar ? 0 : 5)}px;
  background: #ffffff38;
  z-index: 3;
`

const Progress = styled.View`
  background-color: ${p => (p.isBlueProgressBar ? Colors.COMMON_BLUE : Colors.WHITE)};
  height: ${HEIGHT}px;
  width: ${p => p.width || 0}%;
`
