import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Icon from 'components/Control/Icon'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({
  onPress,
  size,
  background,
  borderRadius,
  iconColor,
  text,
  disabled,
  borderColor,
}) => {
  const s = size || DEFAULT_SIZE
  const shareS = s - 40

  return (
    <Row onPress={onPress} disabled={disabled}>
      <Button size={s} background={background} borderRadius={borderRadius}>
        <PlusButtonImage resizeMode="contain" size={s} source={Images.plusButton} />
      </Button>
      <Spacer w={20} />
      {text ? <TextAfterButton>{text}</TextAfterButton> : null}
    </Row>
  )
}

const DEFAULT_SIZE = 10

const Button = styled.View`
  background-color: ${p => p.background || 'transparent'};
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${p => p.borderColor || Colors.TEXT_BRIGHT_BLUE};
  border-radius: ${p => p.borderRadius || p.size / 2}px;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`
const PlusButtonImage = styled.Image`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`
const TextAfterButton = styled.Text`
  margin-top: 5px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
`

const Row = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
`
