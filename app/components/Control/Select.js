import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import ReactNativePickerModule from 'react-native-picker-module'
import InputContainer from 'components/Control/InputContainer'
import InputLabel from 'components/Control/InputLabel'
import Spacer from 'components/Page/Spacer'

export default ({
  label,
  required,
  selection,
  options = [],
  optionField,
  placeHolder,
  disabled,
  onChange,
  style,
  ...p
}) => {
  const picker = useRef(null)
  const showPicker = useCallback(() => {
    if (!disabled) {
      picker.current.show()
    }
  }, [disabled, picker])

  let text = selection
    ? optionField
      ? selection[optionField]
      : selection
    : placeHolder
    ? placeHolder
    : 'Choose'
  const isPlaceholder = placeHolder || text === 'Choose'

  const onValueChange = (valueText, index) => {
    if (onChange) {
      onChange(options[index])
    }
  }

  return (
    <Container onPress={showPicker} style={style}>
      <Spacer h={10} />
      <InputContainer backgroundColor={Colors.WHITE} borderColor={Colors.MENU_BLUE} borderWidth='0'  borderBottom>
        <FakeInputText placeHolder={isPlaceholder}>{label} </FakeInputText>
      </InputContainer>
      <Spacer h={15} />
      <ReactNativePickerModule
        pickerRef={c => (picker.current = c)}
        selectedValue={null}
        title={'Please Select...'}
        items={optionField ? options.map(o => o[optionField]) : options}
        onDismiss={onDismiss}
        onCancel={onCancel}
        onValueChange={onValueChange}
      />
    </Container>
  )
}

const onDismiss = () => {}
const onCancel = () => {}

const Container = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  flex: 1;
  flex-direction: column;
`

const ChevronDown = styled.View`
  width: 0;
  height: 0;
  border-left-width: 3.6px;
  border-left-color: transparent;
  border-right-width: 3.6px;
  border-right-color: transparent;
  border-top-width: 4px;
  border-top-color: ${Colors.APP_GREY};
`

const FakeInputText = styled(Texts.MediumText)`
    ${Texts.sizes.NewHeaderSize}
    color: ${p => (p.placeHolder ? Colors.TEXT_GREY : Colors.TEXT_DARK_BLUE)};
`
