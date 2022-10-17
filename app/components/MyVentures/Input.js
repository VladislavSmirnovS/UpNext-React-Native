import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({
  maxCharactes,
  value,
  onSave,
  _inputRef,
  placeholder,
  placeholderTextColor,
  onChange,
  color,
  textAlign,
  textSizes,
  isBold,
  keyboardNumber,
  underlineColor,
  maxLength,
}) => {
  let _ref = _inputRef || useRef()

  const [lastValue, setLastValue] = useState(value || '')
  const [pointerEvents, setPointerEvents] = useState('none')

  useEffect(() => {
    setLastValue(value || '')
  }, [value])

  const onChangeText = newValue => {
    if (newValue.length <= lastValue.length) {
      onChangeValue(newValue)
    } else if ((maxCharactes && newValue.length <= maxCharactes) || !maxCharactes) {
      onChangeValue(newValue)
    }
  }

  const onChangeValue = newValue => {
    setLastValue(newValue)
    onChange && onChange(newValue)
  }

  const onPress = () => {
    setPointerEvents('auto')
    _ref.current.focus()
  }

  const onBlur = () => {
    setPointerEvents('none')
    onSave && onSave(lastValue)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View pointerEvents={pointerEvents}>
        <Input
          ref={_ref}
          value={lastValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onBlur={onBlur}
          color={color}
          textAlign={textAlign}
          textSizes={textSizes}
          isBold={isBold}
          keyboardType={keyboardNumber ? 'number-pad' : 'default'}
          underlineColorAndroid={underlineColor ? underlineColor : 'white'}
          maxLength={maxLength}
        />
      </View>
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity.attrs({ activeOpacity: 1 })``

const View = styled.View``

const Input = styled.TextInput.attrs({
  multiline: true,
})`
    ${p => p.textSizes || Texts.sizes.TitleSize}
    color: ${p => p.color || Colors.WHITE};
    ${p =>
      p.isBold &&
      css`
        font-weight: 700;
      `}
`
