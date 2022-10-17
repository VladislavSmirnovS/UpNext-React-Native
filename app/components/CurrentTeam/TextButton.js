import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ onPress, text }) => (
  <Button onPress={onPress}>
    <ButtonText>{text}</ButtonText>
  </Button>
)

const Button = styled.TouchableOpacity``

const ButtonText = styled(Texts.SubtitleText)`
  color: ${Colors.COMMON_BLUE};
  font-weight: 700;
`
