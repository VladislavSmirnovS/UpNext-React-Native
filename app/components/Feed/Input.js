import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import { Button, Icon } from 'native-base'
import { Avatar } from 'react-native-activity-feed'
import Images from 'root/app/appearance/images'

export default ({ avatar, onSendMessage }) => {
  const [message, setMessage] = useState('')

  const onSend = () => {
    onSendMessage(message)
    setMessage('')
    Keyboard.dismiss()
  }

  return (
    <Container>
      {avatar ? <Avatar source={avatar} size={HEIGHT} noShadow /> : null}

      <InputContainer>
        <TextInput
          required={true}
          value={message}
          onChangeText={setMessage}
          placeholder="Мessage..."
          multiline={true}
        />
      </InputContainer>
      {message ? <SendButton onPress={onSend} /> : null}
    </Container>
  )
}

const HEIGHT = 53.7

const SendButton = ({ onPress }) => (
  <WrapButton>
    <Button onPress={onPress} rounded transparent>
      <SendIcon source={Images.sendIcon} />
    </Button>
  </WrapButton>
)

const Container = styled.View`
  border: 1px solid ${Colors.SEPARATOR_GREY};
  border-radius: 30px;
  display: flex;
  margin: 0 2px;
  height: ${HEIGHT}px;
  flex-direction: row;
  align-content: center;
  align-items: center;
`
const SendIcon = styled.Image`
  width: 40px;
  height: 40px;
`

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${HEIGHT}px;
  padding-left: 16.7px;
  padding-right: 16.7px;
  flex: 9;
`

const TextInput = styled.TextInput`
   ${Texts.sizes.TitleSize}
    height: ${HEIGHT}px;
    color: ${Colors.TEXT_DARK_BLUE};
    flex: 1;
`

const ButtonIcon = styled(Icon)`
  margin: 0 10px;
  color: #fff;
`

const WrapButton = styled.View`
  margin: 0 2px;
`
