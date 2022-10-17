import React from 'react'
import styled from 'styled-components'
import Images from 'appearance/images'

export default () => {
  return (
      <Icon source={Images.customMarker} resizeMode="contain" />
  )
}

const Icon = styled.Image`
  align-self: center;
  height: 16px;
  width: 16px;
`
