import React from 'react'
import styled, { css } from 'styled-components'
import Texts from 'appearance/texts'
import Images from 'appearance/images'

export default ({ text, isOpen, setIsOpen }) => {
  const onPress = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Button onPress={onPress} isOpen={isOpen}>
      <Texts.BoldTitleText>{text}</Texts.BoldTitleText>
      <ArrowIcon isOpen={isOpen} />
    </Button>
  )
}

const ArrowIcon = ({ isOpen }) => {
  return <Icon isOpen={isOpen} source={Images.arrowBottom} resizeMode="contain" />
}

const ICON_SIZE = 10

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Icon = styled.Image`
  margin-left: 5px;
  align-self: center;
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  ${p => p.isOpen && transform}
`

const transform = css`
  transform: rotate(180deg);
`
