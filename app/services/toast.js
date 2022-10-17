import { Platform, ToastAndroid } from 'react-native'
import Toast from 'react-native-root-toast'

export const showCopyDoneAlert = () => {
  const message = 'Added to clipboard'

  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  } else if (Platform.OS === 'ios') {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    })
  }
}
