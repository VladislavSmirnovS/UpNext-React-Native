import { useSelector } from 'react-redux'

export const useFilter = () => useSelector(state => state.notification?.filter)
export const useNotifications = () => useSelector(state => state.notification?.notifications)
export const useNotificationsCount = () =>
  useSelector(state => state.notification?.notificationsCount)
export const useNotificationsPagination = () =>
  useSelector(state => state.notification?.notificationsPagination)
