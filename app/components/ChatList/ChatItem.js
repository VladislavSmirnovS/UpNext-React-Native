import React from 'react'
import styled from 'styled-components'
import ChatMemberItem from 'components/ChatList/ChatMemberItem'

import Texts from 'appearance/texts'

export default ({ navigation, item }) => {
  const { lastMessage, unreadMessageCount } = item

  return (
    <ChatMemberItem navigation={navigation} item={item} unreadMessageCount={unreadMessageCount}>
      <View>
        <Texts.SubtitleText numberOfLines={2} ellipsizeMode="tail">
          {getLastMessageText(lastMessage)}
        </Texts.SubtitleText>
      </View>
    </ChatMemberItem>
  )
}

const getLastMessageText = lastMessage => {
  return lastMessage
    ? lastMessage.message ||
        (lastMessage.type.includes('image')
          ? 'image attachment'
          : lastMessage.type.includes('video')
          ? 'video attachment'
          : 'file attachment')
    : null
}

const View = styled.View`
  flex-direction: row;
  align-items: flex-end;
  flex: 1;
`
