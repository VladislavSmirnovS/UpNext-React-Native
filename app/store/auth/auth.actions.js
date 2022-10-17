import { Platform } from 'react-native'
import SnapchatLogin from 'react-native-snapchat-login'
import { GoogleSignin } from '@react-native-community/google-signin'

import notifications from 'services/notifications'
import storage from 'services/storage'
import api from 'services/api'
import { handleError } from 'services/logger'
import { getDeviceId, getAppVersion, showNewVersionModal } from 'services/app'
import Config from 'root/config'

import { notifyAlert, resetState } from 'store/app/app.actions'
import { getSavedInviteUserId, setUserAfterLogin, setNullUser } from 'store/user/user.actions'
import { CHAT_HANDLER_ID, removeChannelHandler } from 'store/chat/chat.actions'

const getPreLoginData = () => async dispatch => {
  const notificationToken = await notifications.getFcmToken()
  const { inviteUserId, videoUrl } = await dispatch(getSavedInviteUserId())
  const deviceId = getDeviceId()
  const appVersion = getAppVersion()
  return { notificationToken, inviteUserId, videoUrl, deviceId, appVersion }
}

export const loginWithCode = (code, navigation) => async dispatch => {
  try {
    const { notificationToken, deviceId, appVersion } = await dispatch(getPreLoginData())

    const res = await api.loginWithCode(code, notificationToken, deviceId, appVersion)

    dispatch(afterLogin(res, navigation))

    if (code) {
      storage.setLoginCode(code)
    }
    storage.setLoginType('code')
  } catch (error) {
    const isCodeError = dispatch(isCodesErrors(error))
    if (!isCodeError) {
      notifyAlert('Error', 'Invalid code, please try again')
    }

    dispatch(setNullUser(navigation))
    handleError(error)
  }
}

export const signinWithSnapchat = (snapchatToken, navigation) => async dispatch => {
  try {
    const { notificationToken, inviteUserId, videoUrl, deviceId, appVersion } = await dispatch(
      getPreLoginData(),
    )

    const res = await api.signinWithSnapchat(
      snapchatToken,
      notificationToken,
      inviteUserId,
      videoUrl,
      deviceId,
      appVersion,
    )

    dispatch(afterLogin(res, navigation))

    if (snapchatToken) {
      storage.setSnapchatToken(snapchatToken)
    }
    storage.setLoginType('snapchat')
  } catch (error) {
    const isCodeError = dispatch(isCodesErrors(error))
    if (!isCodeError) {
      notifyAlert('Error', 'Something went wrong, please try again.')
    }
    await logoutWithSnapchat()

    dispatch(setNullUser(navigation))
    handleError(error)
  }
}

export const signinWithGoogle = (googleToken, navigation) => async dispatch => {
  try {
    const { notificationToken, inviteUserId, videoUrl, deviceId, appVersion } = await dispatch(
      getPreLoginData(),
    )

    const res = await api.signinWithGoogle(
      googleToken,
      notificationToken,
      inviteUserId,
      videoUrl,
      deviceId,
      appVersion,
    )

    dispatch(afterLogin(res, navigation))

    if (googleToken) {
      storage.setGoogleToken(googleToken)
    }
    storage.setLoginType('google')
  } catch (error) {
    const isCodeError = dispatch(isCodesErrors(error))
    if (!isCodeError) {
      notifyAlert('Error', 'Something went wrong, please try again.')
    }

    await logoutWithGoogle()

    dispatch(setNullUser(navigation))
    handleError(error)
  }
}

export const signinWithApple = (appleToken, navigation) => async dispatch => {
  try {
    const { notificationToken, inviteUserId, videoUrl, deviceId, appVersion } = await dispatch(
      getPreLoginData(),
    )

    const res = await api.signinWithApple(
      appleToken,
      Platform.OS,
      notificationToken,
      inviteUserId,
      videoUrl,
      deviceId,
      appVersion,
    )

    dispatch(afterLogin(res, navigation))

    if (appleToken) {
      storage.setAppleToken(appleToken)
    }
    storage.setLoginType('apple')
  } catch (error) {
    const isCodeError = dispatch(isCodesErrors(error))
    if (!isCodeError) {
      const isInvalidGrant = error?.message?.includes('invalid_grant')
      const errText = isInvalidGrant ? 'Invalid grant' : null
      notifyAlert('Error', errText || 'Something went wrong, please try again.')
    }

    await logoutWithApple()

    dispatch(setNullUser(navigation))
    handleError(error)
  }
}

const afterLogin = (res, navigation) => async dispatch => {
  if (res?.data?.error) {
    throw false
  }

  const jwtToken = res?.data?.res?.jwt
  if (jwtToken) {
    await storage.setAuthToken(jwtToken)
  }

  dispatch(setUserAfterLogin(res.data.res, navigation))

  if (!Config.IS_DEBUG) {
    api.trackStartSession()
  }
}

const isCodesErrors = error => dispatch => {
  const errorCode = error?.response?.data?.res_code
  switch (errorCode) {
    case 118:
      notifyAlert('Error', error?.response?.data?.msg)
      return true

    case 120:
      dispatch(showNewVersionModal(error))
      return true

    default:
      return false
  }
}

export const logout = navigation => async dispatch => {
  try {
    const loginType = await storage.getLoginType()

    if (loginType) {
      if (!Config.IS_DEBUG) {
        api.trackEndSession()
      }

      await api.logout()
    }

    switch (loginType) {
      case 'code':
        await logoutWithCode()
        break

      case 'google':
        await logoutWithGoogle()
        break

      case 'apple':
        await logoutWithApple()
        break

      case 'snapchat':
        await logoutWithSnapchat()
        break

      default:
        break
    }

    if (loginType) {
      removeChannelHandler(CHAT_HANDLER_ID)
      notifications.unRegister()
    }

    await storage.setLoginType('')
    await storage.setAuthToken('')

    dispatch(resetData(navigation))
  } catch (error) {
    handleError(error)
    dispatch(resetData(navigation))
  }
}

const resetData = navigation => dispatch => {
  dispatch(resetState())
  dispatch(setNullUser(navigation))
}

const logoutWithCode = async () => {
  await storage.setLoginCode('')
}

const logoutWithSnapchat = async () => {
  await storage.setSnapchatToken('')

  await SnapchatLogin.logout()
}

const logoutWithGoogle = async () => {
  await storage.setGoogleToken('')

  await GoogleSignin.configure({})
  await GoogleSignin.revokeAccess()
  await GoogleSignin.signOut()
}

const logoutWithApple = async () => {
  await storage.setAppleToken('')
}
