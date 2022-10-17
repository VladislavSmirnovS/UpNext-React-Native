import React from 'react'
import styled, { css } from 'styled-components'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

export default ({ item, isSelected, onSelected }) => {
  const onPress = () => {
    onSelected(item)
  }

  return (
    <Row onPress={onPress}>
      <Text isSelected={isSelected}>{item.name}</Text>
      <Spacer />
      <CheckIcon isSelected={isSelected} />
    </Row>
  )
}

const CheckIcon = ({ isSelected }) => {
  return isSelected ? (
    <Icon
      source={Images.check}
      resizeMode="contain"
      size={CHECK_ICON_SIZE}
      color={Colors.COMMON_RED}
    />
  ) : null
}

const ICON_SIZE = 30
const CHECK_ICON_SIZE = 20

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const Icon = styled.Image`
  margin-right: 10px;
  align-self: center;
  height: ${p => p.size || ICON_SIZE}px;
  width: ${p => p.size || ICON_SIZE}px;
  ${p => p.color && iconColor}
`

const iconColor = css`
  tint-color: ${p => p.color};
`

const Text = styled(Texts.TitleText)`
  color: ${p => (p.isSelected ? Colors.BLACK : Colors.TEXT_GREY)};
`

const Spacer = styled.View`
  flex: 1;
`
