import React from 'react'
import styled, { css } from 'styled-components'
import Card from 'components/Control/Card'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ title, field, backgroundColor, isOpenned, setCurrentSection, children }) => {
  const onPress = () => {
    setCurrentSection && setCurrentSection(field)
  }

  return (
    <ColoredCard backgroundColor={backgroundColor}>
      <CollapseHeader onPress={onPress}>
        <WhiteTitle>{title}</WhiteTitle>
      </CollapseHeader>
      <Callapsed isShow={isOpenned}>{children}</Callapsed>
    </ColoredCard>
  )
}

const ColoredCard = styled(Card)`
  background: ${p => p.backgroundColor || Colors.WHITE};
`

const CollapseHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
`

const WhiteTitle = styled(Texts.BoldSubHeaderText)`
  color: ${Colors.WHITE};
`

const Callapsed = styled.View`
  height: auto;
  padding: 5px;
  ${p =>
    !p.isShow &&
    css`
      height: 0;
      padding: 0;
    `}
  ${p =>
    p.isShow &&
    css`
      min-height: 150px;
    `}
`
