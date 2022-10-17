import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Notification from 'components/Notifications/Notification'
import { getNotificationData } from 'services/utils'
import notifications from 'services/notifications'
import { getUserFullName } from 'utils/user'

export default ({ item, navigation }) => {
  const { user, message } = item

  const getTitle = () => {
    return getUserFullName(user)
  }

  const getDescription = () => {
    const { text } = getNotificationData(message)
    return `commented: ${text}`
  }

  return (
    <Notification
      user={user}
      title={getTitle()}
      description={getDescription()}
      time={item?.created}
      leftElement={<LeftButton item={item} navigation={navigation} />}
      navigation={navigation}
    />
  )
}

const LeftButton = ({ item, navigation }) => {
  const dispatch = useDispatch()
  const { param } = getNotificationData(item.message)

  const onPress = () => {
    const notification = { data: item }
    dispatch(notifications.onClickNotifications(notification, navigation, true))
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: param.poster }} resizeMode="cover" />
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity``

const Image = styled(FastImage)`
  width: 50px;
  height: 70px;
`
