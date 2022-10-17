import { TransitionPresets } from 'react-navigation-stack'
import AppHeader from 'navigation/AppHeader'
import { APP_HEADER_HEIGHT } from 'components/Control/DeviceHeight'

export default {
  // headerMode: 'none',
  defaultNavigationOptions: {
    ...TransitionPresets.ScaleFromCenterAndroid,
    headerTitle: () => <AppHeader />,
    headerLeft: () => null,
    headerStyle: {
      shadowColor: 'transparent', // This covers iOS
      elevation: 0, // This covers Android
      height: APP_HEADER_HEIGHT,
    },
  },
}
