import React from 'react'
import styled from 'styled-components'
import Button from 'components/Control/Button'
import ButtonOuter from 'components/Control/ButtonOuter'

export default ({ text, color, onPress, isFull, width, withoutMargin, borderWidth, borderColor, ...props }) => {
  return (
    <ButtonWrapper withoutMargin={withoutMargin}>
      {isFull ? (
        <Button
          width={width || `${BUTTON_WIDTH}px`}
          height={BUTTON_HEIGHT}
          text={text}
          onPress={onPress}
          color={color}
          borderWidth={borderWidth}
          borderColor={borderColor}
          {...props}
        />
      ) : (
        <ButtonOuter
          width={width || `${BUTTON_WIDTH}px`}
          height={BUTTON_HEIGHT}
          text={text}
          color={color}
          onPress={onPress}
          {...props}
        />
      )}
    </ButtonWrapper>
  )
}

const BUTTON_WIDTH = 120
const BUTTON_HEIGHT = 30

const ButtonWrapper = styled.View`
  margin: ${p => (p.withoutMargin ? 0 : '0 5px 10px')};
`
