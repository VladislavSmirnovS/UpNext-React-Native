import { Dimensions } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const { height } = Dimensions.get('screen')

export const TOP_INSETS = StaticSafeAreaInsets.safeAreaInsetsTop

export const BOTTOM_INSETS = StaticSafeAreaInsets.safeAreaInsetsBottom

export const AVAILABLE_HEIGHT_WITHOUT_STATUS_BAR = height - BOTTOM_INSETS - TOP_INSETS

export const AVAILABLE_HEIGHT = height - BOTTOM_INSETS

export const APP_HEADER_HEIGHT = 80

export const APP_BOTTOM_MENU = 50
