import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ text, isSelected, color }) => {
  return (
    <TagView selected={isSelected}>
      <TagText selected={isSelected} color={color}>
        {text}
      </TagText>
    </TagView>
  )
}

const TagView = styled.View`
  border: 2px solid ${Colors.COMMON_BLUE};
  border-radius: 15px;
  padding: 5px 10px;
  margin: 0 5px 5px 0;
  background: ${p => (p.selected ? Colors.COMMON_BLUE : 'transparent')};
`

const TagText = styled(Texts.TutorialText)`
  color: ${p => (p.selected ? Colors.WHITE : p.color || Colors.BLACK)};
`
