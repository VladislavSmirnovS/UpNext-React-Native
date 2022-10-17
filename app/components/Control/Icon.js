import React from 'react'
import styled, { css } from 'styled-components'

export default ({ source, size, color, disabled }) => {
  return <Icon source={source} resizeMode="contain" size={size} color={color} disabled={disabled} />
}

const IMAGE_SIZE = 25

const Icon = styled.Image`
  height: ${p => p.size || IMAGE_SIZE}px;
  width: ${p => p.size || IMAGE_SIZE}px;
  align-self: center;

  ${p => p.color && ColorStyle}
  ${p => p.disabled && DisableStyle}
`

const ColorStyle = css`
  tint-color: ${p => p.color};
`

const DisableStyle = css`
  opacity: 0.5;
`
