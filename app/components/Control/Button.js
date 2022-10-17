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
  iconAfter,
  width,
  height,
  fontSize,
  backgroundColor,
  color,
  radius,
  disabled,
  borderWidth,
  borderColor,
  onPress,
  textDesc,
  ...props
}) => {
  height = height || 46
  fontSize = fontSize || fontSizes[height] || 15.3

  return (
    <Container
      disabled={disabled}
      width={width || '100%'}
      height={height}
      backgroundColor={backgroundColor || Colors.BUTTON_BLUE}
      radius={radius || '18px'}
      onPress={onPress}
      borderWidth={borderWidth || '0'}
      borderColor={borderColor || Colors.BUTTON_BLUE}
      {...props}
    >
      {icon && <IconImage source={icon} resizeMode="contain" />}
      <ButtonText color={color || Colors.WHITE} fontSize={fontSize} numberOfLines={1}>
        {text}
      </ButtonText>
      {iconAfter && (
        <AfterImage
          color={color}
          source={iconAfter}
          resizeMode="contain"
          style={{ tintColor: color || Colors.WHITE }}
        />
      )}
      {textDesc ? (
        <ButtonTextDesc color={color} fontSize={fontSize}>
          {textDesc}
        </ButtonTextDesc>
      ) : null}
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  background-color: ${p => p.backgroundColor};
  height: ${p => p.height}px;
  width: ${p => p.width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${p => (p.border ? `border: 1px solid ${Colors.TEXT_BRIGHT_BLUE}` : '')};
  border-radius: ${p => p.radius};
  border-width: ${p => p.borderWidth};
  border-color: ${p => p.borderColor};
  opacity: ${p => (p.disabled ? 0.3 : 1)};
  padding: 0 5px;
`

const ButtonText = styled(Texts.BoldText)`
  font-size: ${p => p.fontSize}px;
  color: ${p => p.color};
  text-align: center;
`

const ButtonTextDesc = styled(Texts.ButtonText)`
  font-size: ${p => p.fontSize}px;
  text-align: center;
  color: ${Colors.BLACK};
`

const IconImage = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`

const AfterImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 8px;
`
