import React from 'react'
import { useDispatch } from 'react-redux'
import { Platform } from 'react-native'
import { appleAuthAndroid, appleAuth } from '@invertase/react-native-apple-authentication'
import SocialLoginButton from 'components/Login/SocialLoginButton'
import { resetState } from 'store/app/app.actions'
import { signinWithApple } from 'store/auth/auth.actions'
import { setIsLogining } from 'store/user/user.actions'
import { handleError } from 'services/logger'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const doLogin = token => {
    dispatch(resetState())
    dispatch(signinWithApple(token, navigation))
  }

  const setLoginLoading = isLoggining => {
    dispatch(setIsLogining(isLoggining))
  }

  const onPress = async () => {
    try {
      setLoginLoading(true)

      const token = await getAppleToken()
      doLogin(token)
    } catch (error) {
      onError(error)
    }
  }

  const onError = error => {
    setLoginLoading(false)
    handleError(error)
  }

  if (!isSupported) {
    return null
  }

  return (
    <SocialLoginButton
      title="sign in with Apple"
      logo={Images.appleLogo}
      onPress={onPress}
      backgroundColor={Colors.BLACK}
      color={Colors.WHITE}
    />
  )
}

const isSupported = () => {
  return appleAuthAndroid.isSupported && Platform.OS !== 'ios'
}

const getAppleToken = async () => {
  if (Platform.OS === 'ios') {
    return await getAppleTokenForIOS()
  } else {
    return await getAppleTokenForAndroid()
  }
}

const getAppleTokenForIOS = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  })
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
  if (credentialState === appleAuth.State.AUTHORIZED) {
    return appleAuthRequestResponse.authorizationCode
  }
}

const getAppleTokenForAndroid = async () => {
  appleAuthAndroid.configure({
    clientId: 'com.codelovers.upnext-services',
    redirectUri: 'https://www.upnexteducation.com/callback',
    responseType: appleAuthAndroid.ResponseType.ID_TOKEN,
    scope: appleAuthAndroid.Scope.ALL,
  })

  const res = await appleAuthAndroid.signIn()
  return res.code
}
