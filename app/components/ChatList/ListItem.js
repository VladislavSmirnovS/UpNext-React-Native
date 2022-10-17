import React from 'react'
import PendingItem from 'components/ChatList/PendingItem'
import RequestItem from 'components/ChatList/RequestItem'
import ChatItem from 'components/ChatList/ChatItem'

export default ({ navigation, item }) => {
  if (item?.friend_status === 'pending') {
    return <PendingItem navigation={navigation} item={item} />
  }

  if (item?.hasOwnProperty('friend_status')) {
    return <RequestItem item={item} />
  }

  if (item.url) {
    return <ChatItem navigation={navigation} item={item} />
  }

  return null
}
