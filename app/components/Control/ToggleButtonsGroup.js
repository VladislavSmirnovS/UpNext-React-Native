import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ group, value, onValueChange }) => {
  const onPress = newValue => {
    if (newValue !== value) {
      onValueChange(newValue)
    }
  }

  const renderToggleButton = (item, index) => {
    return (
      <View key={`button-${item.value}`}>
        <ToggleButton
          title={item.title}
          value={item.value}
          onPress={onValueChange}
          isSelected={value === item.value}
        />
        {isHasNext(index) ? <Separator /> : null}
      </View>
    )
  }

  const isHasNext = index => {
    return index < group?.length - 1
  }

  return <Row>{group?.map(renderToggleButton)}</Row>
}

const ToggleButton = ({ title, value, onPress, isSelected }) => {
  const handlePress = () => {
    onPress(value)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Title isSelected={isSelected}>{title}</Title>
    </TouchableOpacity>
  )
}

const Separator = () => {
  return (
    <SeparatorView>
      <Texts.HeaderText>/</Texts.HeaderText>
    </SeparatorView>
  )
}

const TouchableOpacity = styled.TouchableOpacity``

const Title = styled(Texts.HeaderText)`
  color: ${p => (p.isSelected ? Colors.COMMON_BLUE : Colors.TEXT_DARK_BLUE)};
`

const Row = styled.View`
  flex-direction: row;
`

const SeparatorView = styled.View`
  padding: 0 10px;
`

const View = styled.View`
  flex-direction: row;
`
