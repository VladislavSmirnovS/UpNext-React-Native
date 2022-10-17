import React from 'react'
import styled, { css } from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ role, options, disabledRoles, onChange }) => {
  const renderTag = item => {
    const isSelected = item === role
    const isDisable = !isSelected && disabledRoles.includes(item)
    return (
      <Tag
        key={item}
        text={item}
        isSelected={isSelected}
        isDisable={isDisable}
        onChange={onChange}
      />
    )
  }

  return <Tags>{options?.map(renderTag)}</Tags>
}

const Tag = ({ text, isSelected, isDisable, onChange }) => {
  const onPress = () => {
    if (isSelected || isDisable) {
      return
    }

    onChange(text)
  }

  return (
    <TouchableOpacity onPress={onPress} isSelected={isSelected}>
      <Title isDisable={isDisable}>{text}</Title>
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  border: 1px solid ${p => (p.isSelected ? Colors.COMMON_BLUE : 'transparent')};
  border-radius: 20px;
  padding: 5px 10px;
  margin: 0 5px 5px 0;
`

const Title = styled(Texts.TitleText)`
  ${p => p.isDisable && DisabledTag}
`

const DisabledTag = css`
  color: ${Colors.COMMON_GREY};
`

const Tags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
