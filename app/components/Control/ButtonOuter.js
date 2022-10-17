import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

const fontSizes = {
  46: 15.3,
  35.3: 13.1,
  26: 10.7,
}

export default ({
  text,
  icon,
  width,
  height,
  fontSize,
  color,
  textColor,
  backgroundColor,
  borderColor,
  radius,
  disabled,
  borderWidth,
  onPress,
}) => {
  height = height || 46
  fontSize = fontSize || fontSizes[height] || 15.3

  return (
    <Container
      disabled={disabled}
      width={width || '100%'}
      height={height}
      radius={radius || '18px'}
      onPress={onPress}
      color={color}
      borderColor={borderColor || Colors.TEXT_BRIGHT_BLUE}
      backgroundColor={backgroundColor}
    >
      {icon && <IconImage source={icon} resizeMode={'contain'} />}
      <ButtonText
        color={textColor || color || Colors.TEXT_BRIGHT_BLUE}
        fontSize={fontSize}
        numberOfLines={1}
      >
        {text}
      </ButtonText>
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  background-color: ${p => p.backgroundColor || 'transparent'};
  height: ${p => p.height}px;
  width: ${p => p.width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${p => p.radius};
  border: 2px solid ${p => p.borderColor || p.color || Colors.COMMON_BLUE};
  opacity: ${p => (p.disabled ? 0.3 : 1)};
  padding: 0 5px;
`

const ButtonText = styled(Texts.ButtonText)`
  font-weight: bold;
  font-size: ${p => p.fontSize}px;
`

const IconImage = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`
