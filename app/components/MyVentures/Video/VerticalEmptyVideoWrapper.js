import React, { useState } from 'react'
import styled from 'styled-components'

const VERTICAL_VIDEO_RATIO = 9 / 16

export default ({ children }) => {
  const [width, setWidth] = useState(0)

  const onLayout = e => {
    const { height } = e.nativeEvent.layout
    const newWidth = VERTICAL_VIDEO_RATIO * height
    setWidth(newWidth)
  }

  return (
    <Wrapper onLayout={onLayout} width={width}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: ${p => p.width}px;
  flex: 1;
`
