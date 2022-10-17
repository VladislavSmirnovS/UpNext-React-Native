import React, { useRef, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({
  value,
  onChange,
  placeholder,
  minCharactes = 10,
  maxCharactes = 100,
  isOneLine,
  onSave,
  onToggleError,
  err,
  renderPreSymbol,
}) => {
  let _ref = useRef(null)

  const [error, setError] = useState(err)
  const [pointerEvents, setPointerEvents] = useState('none')
  const [lastValue, setLastValue] = useState(value)

  useEffect(() => {
    setError(err)
  }, [err])

  useEffect(() => {
    setLastValue(value)
    onToggleError ? onToggleError(value) : toggleError(value)
  }, [value])

  const toggleError = value => {
    if (minCharactes && value.length < minCharactes) {
      setError(`Use more than ${minCharactes} characters to complete this card`)
    } else {
      setError(null)
    }
  }

  const handleChange = newValue => {
    if (newValue.length <= lastValue.length) {
      onChange(newValue)
    } else if (value.length <= maxCharactes) {
      onChange(newValue)
    }
  }

  const onPress = () => {
    setPointerEvents('auto')
    _ref.current.focus()
  }

  const onBlur = () => {
    setPointerEvents('none')
    onSave && onSave()
  }

  return (
    <TouchableOpacity onPress={onPress}>
      {error ? <ErrorText>{error}</ErrorText> : <Spacer h={20} />}
      <View pointerEvents={pointerEvents} height={isOneLine ? '60px' : '400px'}>
        {renderPreSymbol && renderPreSymbol()}
        <TextInput
          ref={_ref}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          isOneLine={isOneLine}
          onBlur={onBlur}
        />
      </View>
      <Spacer h={10} />
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity.attrs({ activeOpacity: 1 })``

const View = styled.View`
  ${Texts.sizes.TitleSize};
  height: ${p => p.height || '100px'};
  color: ${Colors.TEXT_DARK_BLUE};
  background-color: ${Colors.INPUT_BACKGROUND_GREY};
  border-color: ${Colors.INPUT_BORDER_GREY};
  border-width: 0.3px;
  border-radius: 2px;
  padding-left: 16.7px;
  padding-right: 16.7px;
  flex-direction: row;
  align-items: center;
`

const ErrorText = styled(Texts.SubtitleText)`
  color: ${Colors.COMMON_RED};
`

const TextInput = styled.TextInput.attrs({
  multiline: true,
})`
  ${p => !p.isOneLine && bigger};
  flex: 1;
`

const bigger = css`
  ${Texts.sizes.HeaderSize};
`
