import DeviceInfo from 'react-native-device-info'
import { Platform, Linking } from 'react-native'
import NewVersionLink from 'components/Control/NewVersionLink'
import { setAppAlert } from 'store/app/app.actions'

const PLAY_STORE_LINK = 'market://details?id=com.upnext_mobile'
const APP_STORE_LINK = 'itms-apps://itunes.apple.com/app/apple-store/id1530939263?mt=8'

export const getDeviceId = () => {
  return DeviceInfo.getUniqueId()
}

export const getAppVersion = () => {
  return DeviceInfo.getVersion()
}

export const openAppInStorage = () => {
  const url = Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK
  Linking.openURL(url)
}

export const showNewVersionModal = error => dispatch => {
  onConfirm = () => {
    dispatch(setAppAlert(null))
  }

  dispatch(
    setAppAlert({
      title: 'Not supported app version',
      body: <NewVersionLink />,
      isSmallBtns: true,
      okText: 'OK',
      onConfirm,
    }),
  )
}
