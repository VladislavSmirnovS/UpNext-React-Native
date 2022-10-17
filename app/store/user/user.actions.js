import api from 'services/api'
import { logout } from 'store/auth/auth.actions'
import {
  getTeam,
  saveTeamsOptions,
  getTeamsOptions,
  removeTeamInTeamOptions,
} from 'store/team/team.actions'
import { getFounderMembers } from 'store/lobby/lobby.actions'
import {
  getSelectOptions,
  setAppAlert,
  setIsShowNotLoginAlert,
  getNewNotificationCount,
  notifyAlert,
} from 'store/app/app.actions'
import {
  addChannelHandler,
  CHAT_HANDLER_ID,
  leaveStartupChatAsOperator,
  getUserInfoForChat,
} from 'store/chat/chat.actions'
import {
  openPageByPath,
  openHomePage,
  openMyProfilePage,
  openMyStartupPage,
} from 'services/navigation'
import notifications from 'services/notifications'
import sendbird from 'services/sendbird'
import mixpanel from 'services/mixpanel'
import Config from 'root/config'
import branchio from 'services/branchio'
import * as Sentry from '@sentry/react-native'
import { handleError } from 'services/logger'
import { getDeviceId, getAppVersion, showNewVersionModal } from 'services/app'
import { resetAllFeed } from 'store/feed/feed.actions'
import { getUserId } from 'utils/user'

export const INVITE_VIEW_EVENTS_SET_LIST = 'INVITE_VIEW_EVENTS_SET_LIST'
export const INVITE_VIEW_EVENTS_SET_PAGE = 'INVITE_VIEW_EVENTS_SET_PAGE'
export const INVITE_COIN_EVENTS_SET_LIST = 'INVITE_COIN_EVENTS_SET_LIST'
export const INVITE_COIN_EVENTS_SET_PAGE = 'INVITE_COIN_EVENTS_SET_PAGE'
export const SET_USER = 'SET_USER'
export const SET_USER_TUTORIALS = 'SET_USER_TUTORIALS'
export const SET_USER_COINS = 'SET_USER_COINS'
export const USER_SET_REPORT_VIDEOS = 'USER_SET_REPORT_VIDEOS'
export const SET_USER_IMAGE_LOADING = 'SET_USER_IMAGE_LOADING'
export const SET_USER_LOADING = 'SET_USER_LOADING'
export const SET_BRANCH_OBJECT = 'SET_BRANCH_OBJECT'
export const SET_IS_LOGGINING = 'SET_IS_LOGGINING'

export const trackViewIteamEvent = () => (dispatch, getState) => {
  const { user } = getState().user
  const userId = getUserId(user)
  const { inviteUserId, videoUrl } = dispatch(getSavedInviteUserId())
  if (userId && inviteUserId) {
    api.trackInviteView(inviteUserId)
    if (videoUrl) {
      api.trackFeedVideoView(inviteUserId, videoUrl)
    }
  }
}

export const getUserReportVideos = () => dispatch => {
  api
    .getUserReportVideos()
    .then(res => {
      dispatch(setUserReportVideos(res.data.result))
    })
    .catch(error => handleError(error))
}

export const doIfLoginUser = callback => (dispatch, getState) => {
  const { user, initialized } = getState().user
  if (initialized && getUserId(user)) {
    callback && callback()
  } else if (initialized) {
    dispatch(setIsShowNotLoginAlert(true))
  }
}

export const getCommonStreamioToken = () => dispatch => {
  api
    .getCommonStreamioToken()
    .then(res => {
      dispatch(setUser({ stream_io_token: res.data }))
    })
    .catch(error => handleError(error))
}

export const saveTutorials = tutorials => (dispatch, getState) => {
  const { user } = getState().user
  api
    .saveTutorials(tutorials)
    .then(res => dispatch(setUser({ ...user, tutorials: res.data })))
    .catch(error => handleError(error))
}

export const updateAppInfoAfterUserChange = isLogoUpdated => (dispatch, getState) => {
  const { members, membersPagination, membersSearch, membersFilters } = getState().lobby
  if (members?.length) {
    dispatch(
      getFounderMembers(
        membersPagination?.page,
        membersPagination?.size,
        membersSearch,
        membersFilters,
      ),
    )
  }

  if (isLogoUpdated) {
    const { team } = getState().team
    if (team?.id) {
      dispatch(getTeam(team?.id))
    }
  }
}

export const getCurrentUser = ({
  navigation,
  callback,
  isFromLogin,
  isFakeLogin,
}) => async dispatch => {
  try {
    const res = await api.getCurrentUser(getDeviceId(), getAppVersion())
    callback && callback(res.data)

    if (isFakeLogin && !Config.IS_DEBUG) {
      api.trackStartSession()
    }

    dispatch(
      updateUser({
        user: res.data,
        navigation,
        isFromLogin,
        callback,
      }),
    )
  } catch (error) {
    if (error?.response?.data?.res_code === 120) {
      dispatch(showNewVersionModal(error))
    }
    dispatch(logout(navigation))
  }
}

export const updateDeviceAccessToken = () => {
  notifications
    .getFcmToken()
    .then(notificationToken => api.updateDeviceAccessToken(notificationToken))
    .catch(error => handleError(error))
}

export const setNullUser = navigation => dispatch => {
  dispatch(updateUser({ user: null, navigation, isFromLogin: true }))
}

export const setUserAfterLogin = (user, navigation) => dispatch => {
  dispatch(updateUser({ user, navigation, isFromLogin: true }))
}

export const getSavedInviteUserId = () => (dispatch, getState) => {
  const { branchObj } = getState().user
  return {
    inviteUserId: branchObj?.redirectParams?.invite_user_id,
    videoUrl: branchObj?.redirectParams?.video_url,
  }
}

export const updateUser = ({ user, navigation, isFromLogin, callback }) => dispatch => {
  try {
    if (user) {
      dispatch(setUser(user))
      dispatch(setUserLoading(false))

      if (isFromLogin) {
        dispatch(getSelectOptions())
        dispatch(afterLogin(user, navigation))

        dispatch(getNewNotificationCount())
        dispatch(redirectAfterLogin(navigation, isFromLogin))
        dispatch(setIsLogining(false))
      }

      callback && callback()
    } else {
      dispatch(redirectAfterLogin(navigation, false))
      dispatch(setUser(null))
    }
  } catch (error) {
    handleError(error, true)
  }
}

export const redirectAfterLogin = (navigation, isFromLogin) => (dispatch, getState) => {
  const { branchObj } = getState().user
  if (branchObj) {
    const { redirectPath, redirectParams } = branchObj

    if (isFromLogin && redirectParams && Object.keys(redirectParams)) {
      branchio.trackLoginEvent()
    }

    dispatch(trackViewIteamEvent())

    const onOpenHomePage = () => {
      dispatch(openHomePage(navigation))
    }

    if (redirectPath) {
      dispatch(
        openPageByPath({
          navigation,
          routeName: redirectPath,
          params: redirectParams,
          cancelCallback: onOpenHomePage,
        }),
      )
    } else {
      onOpenHomePage()
    }
  } else {
    dispatch(openHomePage(navigation, { activity_id: null }))
  }
}

export const approvedInviteFromLink = (inviteUserId, teamId, callback) => dispatch => {
  api
    .approvedInviteFromLink(inviteUserId, teamId)
    .then(res => {
      dispatch(
        getUserTeams(() => {
          dispatch(saveTeamsOptions([]))
          dispatch(getTeamsOptions())
        }),
      )
      dispatch(getTeam(teamId, callback, true))
    })
    .catch(error => handleError(error))
}

export const leaveTeam = (navigation, reason, callback) => (dispatch, getState) => {
  const { team } = getState().team

  if (team?.pain_video_feed_id && team?.pain_video_feed_chat) {
    dispatch(leaveStartupChatAsOperator(team?.pain_video_feed_id, team?.pain_video_feed_chat))
  }

  api
    .leaveTeam(team?.id, reason)
    .then(res => {
      if (res.data.result) {
        dispatch(afterLeaveTeam({ navigation, team, callback }))
      } else {
        notifyAlert('Leaving team', 'Something went wrong! Try again')
      }
    })
    .catch(error => handleError(error))
}

export const afterLeaveTeam = ({ navigation, team, callback }) => dispatch => {
  dispatch(setUserLoading(true))

  dispatch(
    getUserTeams(() => {
      dispatch(removeTeamInTeamOptions(team))
      dispatch(openMyStartupPage(navigation))
    }),
  )

  dispatch(updateAppInfoAfterUserChange())
  dispatch(getCurrentUser({ navigation, callback }))

  dispatch(resetAllFeed())
}

export const afterLogin = (user, navigation) => dispatch => {
  if (!Config.IS_DEBUG) {
    Sentry.setUser({ id: getUserId(user), username: user?.first_name })
    mixpanel.initUser(user)
    mixpanel.trackEvent('Login')
  }

  const userInfo = dispatch(getUserInfoForChat())

  sendbird
    .sbConnect(userInfo)
    .then(() => dispatch(notifications.register(navigation)))
    .then(() => dispatch(addChannelHandler(navigation, CHAT_HANDLER_ID)))
    .catch(error => handleError(error))
}

export const updateUserDetails = (user, navigation, callback) => dispatch => {
  api
    .updateUserDetails(user)
    .then(res => {
      dispatch(updateUser({ user: res.data.res, navigation }))
      dispatch(updateAppInfoAfterUserChange())
      dispatch(saveTeamsOptions([]))
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      notifyAlert('My Profile', 'Oops! Something went wrong. Please try again.')
    })
}

export const addUserCoins = callback => (dispatch, getState) => {
  const { user } = getState().user
  dispatch(setUserCoins(user?.coins + 1))

  api
    .addUserCoins()
    .then(res => {
      callback && callback()
      dispatch(setUserCoins(res.data.res?.coins))
    })
    .catch(error => {
      handleError(error)
      notifyAlert('My Profile', 'Oops! Something went wrong. Please try again.')
    })
}

export const minusUserCoins = callback => (dispatch, getState) => {
  const { user } = getState().user
  dispatch(setUserCoins(user?.coins - 1))

  api
    .minusUserCoins()
    .then(res => {
      callback && callback()
      dispatch(setUserCoins(res.data.res?.coins))
    })
    .catch(error => {
      handleError(error)
      notifyAlert('My Profile', 'Oops! Something went wrong. Please try again.')
    })
}

export const getUserTeams = callback => (dispatch, getState) => {
  const { user } = getState().user
  api
    .getUserTeams()
    .then(res => {
      dispatch(setUser({ ...user, teams: res.data }))
      callback && callback(res.data)
    })
    .catch(error => handleError(error))
}

export const checkUserRules = navigation => (dispatch, getState) => {
  const { user } = getState().user
  if (user.isBasicProfileCompleted) {
    return true
  }

  dispatch(
    setAppAlert({
      title: 'Profile is not completed',
      text: 'This is possible for users with a completed profile only.',
      okText: 'Complete you profile now',
      onConfirm: () => dispatch(openMyProfilePage(navigation)),
      callbackConfirmInterval: 20,
    }),
  )
  return false
}

export const setUser = user => ({ type: SET_USER, user })

export const setUserImageLoading = isLoading => ({ type: SET_USER_IMAGE_LOADING, isLoading })

export const setUserLoading = isLoading => ({ type: SET_USER_LOADING, isLoading })

export const setBranchObject = branchObj => ({ type: SET_BRANCH_OBJECT, branchObj })

export const setIsLogining = isLoggining => ({ type: SET_IS_LOGGINING, isLoggining })

export const setUserCoins = coins => ({ type: SET_USER_COINS, coins })

export const setUserTutorials = tutorials => ({ type: SET_USER_TUTORIALS, tutorials })

export const setUserReportVideos = userReportVideos => ({
  type: USER_SET_REPORT_VIDEOS,
  userReportVideos,
})

export const getInviteStatsViewEvent = (page, size, callback) => (dispatch, getState) => {
  api
    .getInviteStatsViewEvent(page, size)
    .then(res => {
      const { inviteViewEvents } = getState().user
      dispatch(
        setInviteViewEvents(
          !page ? res.data.result : [...inviteViewEvents, ...res.data.result],
          res.data?.count,
        ),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setInviteViewEvents([], 0))
    })
}

export const setInviteViewEvents = (list, count) => ({
  type: INVITE_VIEW_EVENTS_SET_LIST,
  list,
  count,
})

export const setInviteViewEventsPage = page => ({ type: INVITE_VIEW_EVENTS_SET_PAGE, page })

export const getInviteStatsCoinEvent = (page, size, callback) => (dispatch, getState) => {
  api
    .getInviteStatsCoinEvent(page, size)
    .then(res => {
      const { inviteCoinEvents } = getState().user
      dispatch(
        setInviteCoinEvents(
          !page ? res.data.result : [...inviteCoinEvents, ...res.data.result],
          res.data?.count,
        ),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setInviteCoinEvents([], 0))
    })
}

export const setInviteCoinEvents = (list, count) => ({
  type: INVITE_COIN_EVENTS_SET_LIST,
  list,
  count,
})

export const setInviteCoinEventsPage = page => ({ type: INVITE_COIN_EVENTS_SET_PAGE, page })
