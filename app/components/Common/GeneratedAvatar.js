import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import { getInitials } from 'utils/user'

export default ({ id, firsName, lastName, size = SIZE, borderRadius = BORDER_RADIUS, style }) => {
  const initials = getInitials(id, firsName, lastName)
  const backgroundColor = getBackgroundColor(initials)

  return (
    <BackgroundView
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      style={style}
      size={size}
    >
      <Text size={size}>{initials}</Text>
    </BackgroundView>
  )
}

const SIZE = 20
const BORDER_RADIUS = 0
const BACKGROUND_COLORS = [
  '#2ecc71',
  '#3498db',
  '#8e44ad',
  '#e67e22',
  '#e74c3c',
  '#1abc9c',
  '#2c3e50',
]

const getBackgroundColor = initials => {
  const index = sumChars(initials) % BACKGROUND_COLORS.length

  return BACKGROUND_COLORS[index] || BACKGROUND_COLORS[0]
}

const sumChars = (str = '') => {
  let sum = 0
  for (let i = 0; i < str?.length; i++) {
    sum += str.charCodeAt(i)
  }

  return sum
}

const BackgroundView = styled.View`
  background: ${p => p.backgroundColor};
  border-radius: ${p => p.borderRadius}px;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  justify-content: center;
  align-items: center;
`

const Text = styled(Texts.TitleText)`
  font-size: ${p => p.size / 2.5}px;
`
