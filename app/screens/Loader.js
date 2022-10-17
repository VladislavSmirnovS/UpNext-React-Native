import { Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { withInAppNotification } from 'react-native-in-app-notification'
import GeneralStatusBar from 'components/Page/GeneralStatusBar'
import { setShownNotificationFunc } from 'store/app/app.actions'
import { getCurrentUser, redirectAfterLogin } from 'store/user/user.actions'
import branchio from 'services/branchio'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

const Loader = ({ navigation, showNotification }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(branchio.subscribe(navigation))
  }, [])

  useEffect(() => {
    dispatch(setShownNotificationFunc(showNotification))
  }, [])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    dispatch(
      getCurrentUser({
        isFromLogin: true,
        isGetDefaultTeam: true,
        isFakeLogin: true,
      }),
    )
  }

  const handleLoadEnd = () => {
    setTimeout(() => {
      dispatch(redirectAfterLogin(navigation, true))
    }, 3000)
  }

  return (
    <>
      <GeneralStatusBar />
      <LoaderContainer>
        <LoadingImage source={Images.loaderBanner} onLoadEnd={handleLoadEnd} />
      </LoaderContainer>
    </>
  )
}

export default withInAppNotification(Loader)

const LoaderContainer = styled.View`
  background: ${Colors.WHITE};
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LoadingImage = styled(Image)`
  height: 100%;
  width: 100%;
`
