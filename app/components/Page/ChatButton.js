import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Images from 'appearance/images'
import { openChatPage } from 'services/navigation'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const onChatPress = () => {
    dispatch(openChatPage(navigation))
  }

  return (
    <Button onPress={onChatPress}>
      <ChatImage source={Images.chatPerson} resizeMode="contain" />
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ChatImage = styled.Image`
  width: 30px;
  height: 30px;
`
