import { createStackNavigator } from 'react-navigation-stack'
import MenuImage from 'navigation/MenuImage'
import MaterialTabBar from 'navigation/MaterialTabBar'
import { isInsidePage } from 'services/navigation'
import stackOptions from 'navigation/stackOptions'
import Images from 'appearance/images'

import LobbyCurrentTeam from 'screens/LobbyCurrentTeam'
import LobbyCurrentMember from 'screens/LobbyCurrentMember'
import LobbyCurrentMentor from 'screens/LobbyCurrentMentor'
import Feed from 'screens/Feed'
import FeedSingle from 'screens/FeedSingle'
import LearnVideos from 'screens/LearnVideos'
import Chat from 'screens/Chat'
import CurrentChat from 'screens/CurrentChat'
import Admin from 'screens/Admin'

const LABEL = 'Feed'

const FeedHomeStack = createStackNavigator(
  {
    Feed,
    FeedSingle,

    LearnVideos,
    Admin,
    Chat,
    CurrentChat,

    LobbyCurrentMember,
    LobbyCurrentMentor,
    LobbyCurrentTeam,
  },
  stackOptions,
)

FeedHomeStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ focused }) => <MenuImage source={Images.menu_feed} focused={focused} />,
    tabBarVisible: !isInsidePage(navigation),
    tabBarLabel: LABEL,
    tabBarComponent: props => <MaterialTabBar {...props} />,
  }
}

export default FeedHomeStack
