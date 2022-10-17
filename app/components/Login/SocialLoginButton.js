import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ title, logo, onPress, backgroundColor, color }) => (
  <Button onPress={onPress} backgroundColor={backgroundColor}>
    <Title color={color}>{title}</Title>
    {logo ? <Logo source={logo} resizeMode="contain" /> : null}
  </Button>
)

const Button = styled.TouchableOpacity`
  background: ${p => p.backgroundColor || Colors.WHITE};
  flex-direction: row;
  justify-content: space-between;
  border-radius: 45px;
  padding: 10px 20px 10px 25px;
  width: 75%;
`

const Logo = styled.Image`
  height: 100%;
  width: 32px;
`

const Title = styled(Texts.LinkText)`
  color: ${p => p.color || Colors.TEXT_DARK_BLUE};
`
