import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Colors from 'appearance/colors'

export default ({
  withTopSpace = true,
  withBottomSpace = true,
  borderColor,
  borderColored,
  borderWide,
  paddingLR,
}) => {
  return (
    <BorderContainer paddingLR={paddingLR}>
      {withTopSpace ? <Spacer h={20} /> : null}
      <Border borderColored={borderColored} borderWide={borderWide} borderColor={borderColor} />
      {withBottomSpace ? <Spacer h={20} /> : null}
    </BorderContainer>
  )
}

const Border = styled.View`
  background: ${p =>
    p.borderColored
      ? Colors.TEXT_DARK_PURPLE
      : p.borderColor
      ? p.borderColor
      : Colors.SEPARATE_GREY};
  height: ${p => (p.borderWide ? '3px' : '1px')};
  width: 100%;
`
const BorderContainer = styled.View`
  padding:  ${p => (p.paddingLR ? '0 15' : '0 50')}px;
`
