import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import styled from 'styled-components'
import AttachButton from 'components/Chat/AttachButton'
import AudioRecordButton from 'components/Chat/AudioRecordButton'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import { Button, Icon } from 'native-base'
import images from 'root/app/appearance/images'
import { Dimensions } from 'react-native'

export default ({ message, setMessage, onSendMessage, onSendFile }) => {
  const [isRecording, setIsRecording] = useState(false)

  const onSend = () => {
    onSendMessage(message)
    setMessage('')
    Keyboard.dismiss()
  }

  return (
    <Row>
      <Container>
        {isRecording ? null : (
          <InputContainer>
            <TextInput
              required={true}
              value={message}
              onChangeText={setMessage}
              placeholder="Мessage..."
              multiline={true}
            />
            {!message ? <AttachButton onSendFile={onSendFile} /> : null}
          </InputContainer>
        )}
      </Container>
      {message ? (
        <SendButton onPress={onSend} />
      ) : (
        <>
          <EmptyForRecordButton />
          <AudioRecordButton
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            onSendFile={onSendFile}
          />
        </>
      )}
    </Row>
  )
}

const HEIGHT = 45
const windowWidth = Dimensions.get('window').width

const SendButton = ({ onPress }) => (
  <WrapButton>
    <Button variant="unstyled" rounded transparent onPress={onPress}>
      <SendIcon source={images.sendIcon} />
    </Button>
  </WrapButton>
)

const SendIcon = styled.Image`
  width: 40px;
  height: 40px;
`

const EmptyForRecordButton = styled.View`
  height: ${HEIGHT}px;
  width: ${HEIGHT + 3}px;
`

const Row = styled.View`
  flex-direction: row;
  width: 90%;
  align-content: center;
  align-items: center;
  margin: 10px 20px;
`

const Container = styled.View`
  height: ${HEIGHT}px;
  flex: 1;
  margin: 0 3px;
  z-index: 2;
`

const InputContainer = styled.View`
  border: 1px solid ${Colors.SEPARATOR_GREY};
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  height: ${HEIGHT}px;
  padding-left: 10px;
  max-width: ${windowWidth - 100}px;
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
  margin-right: 3px;
`
