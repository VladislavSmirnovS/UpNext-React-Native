import React from 'react'
import styled from 'styled-components'
import Switch from 'components/Control/CustomizeSwitch'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ label, value, onChange, labelColor, isCenter }) => {
  return (
    <Row isCenter={isCenter}>
      <Label labelColor={labelColor}>{label}</Label>
      <Switch
        value={value}
        onChangeValue={onChange}
        activeBackgroundColor="#41FFAF"
        inactiveBackgroundColor={Colors.WHITE}
        switchBorderWidth={1}
        switchBorderColor={Colors.COMMON_BLUE}
        activeButtonBackgroundColor={Colors.WHITE}
        inactiveButtonBackgroundColor={Colors.COMMON_BLUE}
        switchWidth={60}
        switchHeight={23}
        buttonWidth={20}
        buttonHeight={20}
      />
    </Row>
  )
}

const Label = styled(Texts.HeaderText)`
  color: ${p => p.labelColor || Colors.TEXT_DARK_BLUE};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${p => (p.isCenter ? 'space-around' : 'space-between')};
  width: 100%;
`
