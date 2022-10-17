import { createStackNavigator } from 'react-navigation-stack'
import TabNotifications from 'navigation/TabNotifications'
import MaterialTabBar from 'navigation/MaterialTabBar'
import stackOptions from 'navigation/stackOptions'
import { isInsidePage } from 'services/navigation'

import LobbyCurrentTeam from 'screens/LobbyCurrentTeam'
import LobbyCurrentMember from 'screens/LobbyCurrentMember'
import LobbyCurrentMentor from 'screens/LobbyCurrentMentor'
import Notifications from 'screens/Notifications'

const LABEL = 'Notifications'

const NotificationStack = createStackNavigator(
  {
    Notifications,

    LobbyCurrentMember,
    LobbyCurrentMentor,
    LobbyCurrentTeam,
  },
  stackOptions,
)

NotificationStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ focused }) => <TabNotifications focused={focused} />,
    tabBarVisible: !isInsidePage(navigation),
    tabBarLabel: LABEL,
    tabBarComponent: props => <MaterialTabBar {...props} />,
  }
}

export default NotificationStack
