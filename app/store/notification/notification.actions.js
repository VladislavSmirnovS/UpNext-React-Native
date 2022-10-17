import api from 'services/api'
import vimeo from 'services/vimeo'
import { getSavedInviteUserId } from 'store/user/user.actions'
import { parseVideoUrl } from 'services/utils'
import { handleError } from 'services/logger'
import { getUserId } from 'utils/user'

export const NOTIFICATION_GET_LIST = 'NOTIFICATION_GET_LIST'
export const NOTIFICATION_SET_FILTER = 'NOTIFICATION_SET_FILTERS'
export const NOTIFICATION_SET_PAGE = 'NOTIFICATION_SET_PAGE'

export const readNotificatons = () => (dispatch, getState) => {
  const { filter } = getState().notification
  const { user } = getState().user
  if (getUserId(user)) {
    api.readNotificatons(filter).catch(error => {})
  }
}

export const getNotifications = (page, size, filter, callback) => (dispatch, getState) => {
  const { user } = getState().user
  if (getUserId(user)) {
    api
      .getAllNotifications(page, size, filter)
      .then(res => {
        const { notifications } = getState().notification
        const newList = res.data.items || []
        const resList = !page ? newList : [...notifications, ...newList]
        dispatch(setNotifications(resList, res.data?.count))
        callback && callback(newList?.length)
      })
      .catch(error => {
        handleError(error)
        callback && callback()
      })
  } else {
    callback && callback()
  }
}

export const getNotificationsWithFilter = () => (dispatch, getState) => {
  const { filter, notificationsPagination } = getState().notification
  dispatch(setNotificationsPage(0))
  dispatch(getNotifications(0, notificationsPagination.size, filter))
}

export const addNotificationComment = (teamId, activityId, url, text) => {
  const { id } = parseVideoUrl(url)
  getVimeoUrl(id)
    .then(res => {
      return api.addNotificationComment(teamId, activityId, res?.poster, text)
    })
    .catch(error => handleError(error))
}

export const addNotificationLike = (teamId, activityId, url) => dispatch => {
  const { inviteUserId, videoUrl } = dispatch(getSavedInviteUserId())
  const { id } = parseVideoUrl(url)
  getVimeoUrl(id)
    .then(res => {
      return api.addNotificationLike(teamId, activityId, res?.poster, url, videoUrl, inviteUserId)
    })
    .catch(error => handleError(error))
}

export const removeNotificationLike = (teamId, activityId) => {
  api.removeNotificationLike(teamId, activityId)
}

export const getVimeoUrl = id => {
  return new Promise((resolve, reject) => {
    vimeo
      .getExternalUrl(id)
      .then(res => {
        if (!res.status) {
          reject()
        } else {
          resolve(res)
        }
      })
      .catch(error => reject())
  })
}

export const setNotifications = (list, count) => ({ type: NOTIFICATION_GET_LIST, list, count })

export const setNotificationsFilter = filter => ({ type: NOTIFICATION_SET_FILTER, filter })

export const setNotificationsPage = page => ({ type: NOTIFICATION_SET_PAGE, page })
