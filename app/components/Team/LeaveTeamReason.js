import React from 'react'
import styled from 'styled-components'
import { Icon } from 'native-base'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ item, isSelected, onSetReason }) => {
  const onPress = () => {
    onSetReason(item)
  }

  return (
    <TouchableOptions onPress={onPress} disabled={isSelected}>
      <Status>{isSelected ? <Icon name="checkmark-sharp" style={style} /> : null}</Status>
      <OptionText isSelected={isSelected}>{item}</OptionText>
    </TouchableOptions>
  )
}

const TouchableOptions = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
`

const Status = styled.View`
  width: 30px;
`

const style = { fontSize: 20, color: Colors.COMMON_BLUE }

const OptionText = styled(Texts.TitleText)`
  font-weight: ${p => (p.isSelected ? 700 : 500)};
  margin-bottom: 5px;
`
