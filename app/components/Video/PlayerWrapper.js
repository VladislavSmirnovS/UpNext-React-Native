import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'

export default ({ naturalSize, maxWidth, maxHeight, isCheckIfSmall, children }) => {
  const getHeight = () => {
    const naturalRatio = naturalSize?.height / naturalSize?.width
    const currentHeight = naturalRatio * (maxWidth || width)
    return currentHeight > maxHeight ? maxHeight : currentHeight
  }

  return (
    <Container height={maxHeight || isCheckIfSmall ? getHeight() : undefined}>{children}</Container>
  )
}

const { width } = Dimensions.get('window')

const Container = styled.View`
  height: ${p => (p.height ? `${p.height}px` : '100%')};
  width: 100%;
`
