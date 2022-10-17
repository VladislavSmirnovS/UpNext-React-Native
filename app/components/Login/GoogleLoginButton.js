import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleSignin } from '@react-native-community/google-signin'
import SocialLoginButton from 'components/Login/SocialLoginButton'
import { resetState } from 'store/app/app.actions'
import { signinWithGoogle } from 'store/auth/auth.actions'
import { setIsLogining } from 'store/user/user.actions'
import Images from 'appearance/images'
import { handleError } from 'services/logger'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    googleConfigure()
  }, [])

  const setLoginLoading = isLoggining => {
    dispatch(setIsLogining(isLoggining))
  }

  const doLogin = token => {
    dispatch(resetState())
    dispatch(signinWithGoogle(token, navigation))
  }

  const onPress = async () => {
    try {
      setLoginLoading(true)

      const token = await getGoogleToken()
      doLogin(token)
    } catch (error) {
      onError(error)
    }
  }

  const onError = error => {
    setLoginLoading(false)
    handleError(error)
  }

  return (
    <SocialLoginButton title="sign in with Google" logo={Images.googleLogo} onPress={onPress} />
  )
}

const googleConfigure = () => {
  GoogleSignin.configure({
    webClientId: '657954717774-sdijmjv9fggsuuo20cp5jqkf1dob4bju.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  })
}

const getGoogleToken = async () => {
  await GoogleSignin.hasPlayServices()

  const userInfo = await GoogleSignin.signIn()
  if (!userInfo) {
    handleError('No user info after google')
    return
  }
  return userInfo?.idToken
}
