import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

const CheckBox = ({ label, value = false, onChange, borderColor}) => {
  const handleChange = () => {
    onChange(!value)
  }

  return (
    <Wrapper>
      <Box checked={value} borderColor={borderColor} onPress={handleChange}>
        {value ? <Icon source={Images.check} /> : null}
      </Box>
      <Label>{label}</Label>
    </Wrapper>
  )
}

export default CheckBox

export const Wrapper = styled.View`
  align-items: center;
`

const Box = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${p => p.borderColor};
  justify-content: center;
  align-items: center;
`

const Label = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 20px;
  font-weight: 500;
`
const Icon = styled.Image`
  height: 20px;
  width: 25px;
  margin-left: 10px;
  margin-bottom: 5px;
  tint-color: ${Colors.MENU_BLUE};
`
