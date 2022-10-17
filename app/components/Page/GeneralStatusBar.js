import { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { withNavigationFocus } from 'react-navigation'

const CustomStatusBar = ({ isFocused, isWhiteStatusBarText }) => {
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      StatusBar.setBackgroundColor('transparent')
      StatusBar.setTranslucent(true)
    }
  }, [])

  useEffect(() => {
    if (isFocused) {
      const barStyle = isWhiteStatusBarText ? 'light-content' : 'dark-content'
      StatusBar.setBarStyle(barStyle)
    }
  }, [isFocused])

  return null
}

export default withNavigationFocus(CustomStatusBar)
