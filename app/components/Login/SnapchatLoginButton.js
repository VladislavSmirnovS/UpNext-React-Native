import React from 'react'
import { useDispatch } from 'react-redux'
import SnapchatLogin from 'react-native-snapchat-login'
import SocialLoginButton from 'components/Login/SocialLoginButton'
import { resetState } from 'store/app/app.actions'
import { signinWithSnapchat } from 'store/auth/auth.actions'
import { setIsLogining } from 'store/user/user.actions'
import { handleError } from 'services/logger'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

// @TODO: BUG: when wrong snapchat login it not return back to app
export default ({ navigation }) => {
  const dispatch = useDispatch()

  const setLoginLoading = isLoggining => {
    dispatch(setIsLogining(isLoggining))
  }

  const doLogin = token => {
    dispatch(resetState())
    dispatch(signinWithSnapchat(token, navigation))
  }

  const onPress = async () => {
    try {
      setLoginLoading(true)

      const token = await getSnapchatToken()
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
    <SocialLoginButton
      title="sign in with Snapchat"
      logo={Images.snapchatLogo}
      onPress={onPress}
      backgroundColor={Colors.SNAPCHAT_YELLOW_COLOR}
    />
  )
}

const getSnapchatToken = async () => {
  const data = await SnapchatLogin.login()
  return data?.accessToken?.toString()
}
