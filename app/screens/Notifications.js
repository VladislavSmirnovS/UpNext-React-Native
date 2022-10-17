import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import PageContainer from 'components/Page/PageContainer'
import Notifications from 'components/Notifications/Notifications'
import { getNewNotificationCount } from 'store/app/app.actions'
import { readNotificatons } from 'store/notification/notification.actions'
import { useNewNotificationsCount } from 'store/app/app.uses'
import { useFilter } from 'store/notification/notification.uses'

const NotificationPage = ({ navigation, isFocused }) => {
  const dispatch = useDispatch()
  const filter = useFilter()
  const newNotificationsCount = useNewNotificationsCount()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isFocused && newNotificationsCount) {
      dispatch(readNotificatons())
      dispatch(getNewNotificationCount())
    }
  }, [isFocused, filter, newNotificationsCount])

  return (
    <PageContainer hideHeader hideTopHeader navigation={navigation} noPadding isLoading={isLoading}>
      <Notifications navigation={navigation} isLoading={isLoading} setIsLoading={setIsLoading} />
    </PageContainer>
  )
}

NotificationPage.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default withNavigationFocus(NotificationPage)
