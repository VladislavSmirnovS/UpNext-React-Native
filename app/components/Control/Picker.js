import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactNativePickerModule from 'react-native-picker-module'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ placeholder, selection, options = [], onChange }) => {
  const picker = useRef(null)

  const onShowPicker = useCallback(() => {
    picker.current.show()
  }, [picker])

  const onValueChange = (valueText, index) => {
    onChange && onChange(options[index])
  }

  return (
    <Container onPress={onShowPicker}>
      {selection ? <BigBlueText>{selection}</BigBlueText> : <BigText>{placeholder}</BigText>}

      <Picker
        pickerRef={c => (picker.current = c)}
        selectedValue={null}
        title="Please Select..."
        items={options}
        onValueChange={onValueChange}
      />
    </Container>
  )
}

const Container = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  justify-content: center;
`

const Picker = styled(ReactNativePickerModule)``

const BigText = styled(Texts.HeaderText)`
  font-weight: 700;
`

const BigBlueText = styled(Texts.HeaderText)`
  font-weight: 700;
  color: ${Colors.COMMON_BLUE};
`
