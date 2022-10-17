import React from 'react'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export default ({ poster, vimeoData }) => {
  return <FastImageStyled source={{ uri: poster || vimeoData?.poster }} resizeMode="cover" />
}

const FastImageStyled = styled(FastImage)`
  height: 100%;
  width: 100%;
`
