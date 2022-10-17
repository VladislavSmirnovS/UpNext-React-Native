import React from 'react'
import ChatList from 'components/ChatList/List'
import { useUserId } from 'store/user/user.uses'
import styled from 'styled-components'

const Chat = ({ navigation }) => {
  const userId = useUserId()

  if (!userId) {
    return null
  }

  return (
    <ChatScreen>
      <ChatList navigation={navigation} />
    </ChatScreen>
  )
}

const ChatScreen = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 10px;
`

Chat.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default Chat
