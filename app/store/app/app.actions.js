import api from 'services/api'
import { Alert } from 'react-native'
import { handleError } from 'services/logger'
import { getUserId } from 'utils/user'

export const SET_SELECT_OPTIONS = 'SET_SELECT_OPTIONS'
export const SET_PAGES_WEBVIEWS = 'SET_PAGES_WEBVIEWS'
export const SET_OVERFLOW_ANIMATION = 'SET_OVERFLOW_ANIMATION'
export const SET_APP_ALERT = 'SET_APP_ALERT'
export const SET_SHOWN_NOTIFICATION_FUNC = 'SET_SHOWN_NOTIFICATION_FUNC'
export const SET_ROUTER_ACTION = 'SET_ROUTER_ACTION'
export const SET_IS_SHOW_NOT_LOGIN_ALERT = 'SET_IS_SHOW_NOT_LOGIN_ALERT'
export const SET_NEW_NOTIFICATIONS_COUNT = 'SET_NEW_NOTIFICATIONS_COUNT'
export const SET_SHARE_DATA = 'SET_SHARE_DATA'
export const TOGGLE_SHOW_SEARCH_HASHTAG_MODAL = 'TOGGLE_SHOW_SEARCH_HASHTAG_MODAL'
export const SAVE_VIDEO_PROGRESS = 'SAVE_VIDEO_PROGRESS'
export const TOGGLE_CAMERA = 'TOGGLE_CAMERA'

export const toggleCamera = cameraProps => ({
  type: TOGGLE_CAMERA,
  cameraProps,
})

export const notifyAlert = (title, text, onPress = () => {}) => {
  Alert.alert(title, text, [{ text: 'OK', onPress }], { cancelable: false })
}

export const getNewNotificationCount = callback => (dispatch, getState) => {
  const { user } = getState().user
  if (getUserId(user)) {
    api
      .getNewNotificationCount()
      .then(res => dispatch(setNewNotificationsCount(res?.data?.count)))
      .catch(error => handleError(error))
  }
}

export const getSelectOptions = callback => dispatch => {
  api
    .getSelectOptions()
    .then(res => {
      callback && callback()
      dispatch(setSelectOptions(res.data))
    })
    .catch(error => {
      handleError(error)
      callback && callback()
    })
}

export const getPagesWebviews = callback => dispatch => {
  api
    .getPagesWebviews()
    .then(res => {
      callback && callback()
      dispatch(setPagesWebviews(res.data))
    })
    .catch(error => {
      handleError(error)
      callback && callback()
    })
}

export const setSelectOptions = selectOptions => ({
  type: SET_SELECT_OPTIONS,
  selectOptions,
})

export const setOverflowAnimation = overflowAnimation => ({
  type: SET_OVERFLOW_ANIMATION,
  overflowAnimation,
})

export const setShownNotificationFunc = showNotification => ({
  type: SET_SHOWN_NOTIFICATION_FUNC,
  showNotification,
})

export const setPagesWebviews = pagesWebviews => ({ type: SET_PAGES_WEBVIEWS, pagesWebviews })

export const setAppAlert = appAlert => ({ type: SET_APP_ALERT, appAlert })

export const setRouterAction = routeAction => ({ type: SET_ROUTER_ACTION, routeAction })

export const resetState = () => ({ type: 'RESET_STATE' })

export const setIsShowNotLoginAlert = isShowNotLoginAlert => ({
  type: SET_IS_SHOW_NOT_LOGIN_ALERT,
  isShowNotLoginAlert,
})

export const setNewNotificationsCount = count => ({ type: SET_NEW_NOTIFICATIONS_COUNT, count })

export const setShareData = shareData => ({ type: SET_SHARE_DATA, shareData })

export const toggleShowSearchHashtagModal = isShow => ({
  type: TOGGLE_SHOW_SEARCH_HASHTAG_MODAL,
  isShow,
})

export const saveVideoProgress = savedVideoProgress => ({
  type: SAVE_VIDEO_PROGRESS,
  savedVideoProgress,
})
