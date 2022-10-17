import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { BOTTOM_INSETS } from 'components/Control/DeviceHeight'
import Colors from 'appearance/colors'

import FeedHomeStack from 'navigation/FeedHomeStack'
import NotificationStack from 'navigation/NotificationStack'
import StartupStack from 'navigation/StartupStack'
import NetworkStack from 'navigation/NetworkStack'

import Loader from 'screens/Loader'
import Login from 'screens/Login'

const TAB_PADDIN_BUTTOM = Platform.select({
  ios: () => BOTTOM_INSETS,
  android: () => 0,
})()

const tabNavigtionOptions = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: Colors.MENU_PURPLE,
    inactiveTintColor: Colors.MENU_BLUE,
    indicatorStyle: {
      position: 'absolute',
      top: 0,
      backgroundColor: Colors.COMMON_BLUE,
      height: 0,
    },
    showIcon: true,
    showLabel: false,
    iconStyle: {
      marginBottom: 5,
      width: 40,
      justiftyContent: 'center',
      alignItems: 'center',
    },
    labelStyle: {
      padding: 0,
      paddingTop: 2,
      margin: 0,
      fontSize: 8,
      textTransform: 'capitalize',
    },
    tabStyle: {
      padding: 0,
      margin: 0,
      height: 50,
    },
    style: {
      backgroundColor: '#fff',
      paddingBottom: TAB_PADDIN_BUTTOM,
    },
    keyboardHidesTabBar: true,
  },
  backBehavior: 'history',
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    // Logger,
    Notification: NotificationStack,
    Home: FeedHomeStack,
    MyStartups: StartupStack,
    MyNetwork: NetworkStack,
  },
  tabNavigtionOptions,
)

const AppNavigator = createSwitchNavigator({
  Loader,
  Login,
  AppStack: TabNavigator,
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
