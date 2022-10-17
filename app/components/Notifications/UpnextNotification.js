import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Notification from 'components/Notifications/Notification'
import Spacer from 'components/Page/Spacer'
import Button from 'components/Control/Button'
import { getVimeoUrl } from 'store/notification/notification.actions'
import { getNotificationData, parseVideoUrl } from 'services/utils'
import notifications from 'services/notifications'
import { handleError } from 'services/logger'
import { getUserFullName } from 'utils/user'

export default ({ item, navigation, newCount }) => {
  const dispatch = useDispatch()

  const onPress = () => {
    const notification = { data: item }
    dispatch(notifications.onClickNotifications(notification, navigation, true))
  }

  const getLeftElement = () => {
    const { param } = getNotificationData(item.message)
    const isNotifWithPoster = [
      'admin_disable_video',
      'feed_count_views',
      'ask_support_video',
      'feed_share',
      'coins_back',
      'coins_update',
      'video_update',
    ].includes(item.type)

    return isNotifWithPoster && (param.poster || param.url) ? (
      <LeftPosterButton item={item} onPress={onPress} />
    ) : (
      <LeftButton text="View" onPress={onPress} />
    )
  }

  return (
    <Notification
      icon={getItem(item)}
      newCount={newCount}
      user={getUser(item)}
      title={getTitle(item)}
      description={getDescription(item)}
      time={item?.created}
      leftElement={getLeftElement()}
      navigation={navigation}
    />
  )
}

const getTitle = ({ type, user }) => {
  if (['chat_message', 'card_comments', 'feed_share'].includes(type)) {
    return getUserFullName(user)
  }

  return 'UpNext'
}

const getItem = ({ type, user }) => {
  const isNotifWithUser = ['chat_message', 'card_comments', 'feed_share'].includes(type)
  if (isNotifWithUser && user) {
    return null
  }

  return 'upnext'
}

const getUser = ({ type, user }) => {
  const isNotifWithUser = ['chat_message', 'card_comments', 'feed_share'].includes(type)
  if (isNotifWithUser && user) {
    return user
  }

  return null
}

const getDescription = ({ type, message }) => {
  switch (type) {
    case 'chat_message':
      return 'Sent you a message'

    case 'startup_chat':
      return 'Sent a message'

    case 'card_comments':
      return 'Post a comment'

    default:
      const { text } = getNotificationData(message)
      return text
  }
}

const LeftButton = ({ text, onPress }) => {
  return (
    <View>
      <Spacer h={10} />
      <Button height={25} width="70px" text={text} onPress={onPress} />
    </View>
  )
}

const LeftPosterButton = ({ item, onPress }) => {
  const { param } = getNotificationData(item.message)

  const [poster, setPoster] = useState(param.poster)

  useEffect(() => {
    if (param.url) {
      const { id } = parseVideoUrl(param.url)
      getVimeoUrl(id)
        .then(res => setPoster(res?.poster))
        .catch(error => handleError(error))
    }
  }, [param.url])

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: poster }} resizeMode="cover" />
    </TouchableOpacity>
  )
}

const View = styled.View``

const TouchableOpacity = styled.TouchableOpacity``

const Image = styled(FastImage)`
  width: 50px;
  height: 70px;
`
