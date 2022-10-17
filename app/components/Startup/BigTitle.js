import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ title, align, color }) => {
  return title ? (
    <Text align={align} color={color}>
      {title}
    </Text>
  ) : null
}

const Text = styled(Texts.BigText)`
  color: ${p => p.color || Colors.TEXT_DARK_BLUE} ${Texts.sizes.HeaderSize};
  font-weight: bold;
  font-size: 35px;
  line-height: 35px;
  margin-bottom: 10px;
  text-align: ${p => p.align || 'left'};
`
