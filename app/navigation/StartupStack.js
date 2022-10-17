import { createStackNavigator } from 'react-navigation-stack'
import TabCenterIcon from 'navigation/TabCenterIcon'
import TabCenterLabel from 'navigation/TabCenterLabel'
import MaterialTabBar from 'navigation/MaterialTabBar'
import stackOptions from 'navigation/stackOptions'
import { isInsidePage } from 'services/navigation'

import LobbyCurrentTeam from 'screens/LobbyCurrentTeam'
import LobbyCurrentMember from 'screens/LobbyCurrentMember'
import LobbyCurrentMentor from 'screens/LobbyCurrentMentor'
import Startup from 'screens/Startup'
import EditStartup from 'screens/EditStartup'
import VideoGallery from 'screens/VideoGallery'
import LearnVideos from 'screens/LearnVideos'

const StartupStack = createStackNavigator(
  {
    Startup,
    EditStartup,
    LearnVideos,
    VideoGallery,
    LobbyCurrentMember,
    LobbyCurrentMentor,
    LobbyCurrentTeam,
  },
  stackOptions,
)

StartupStack.navigationOptions = ({ navigation }) => {
  const isMenuHide = navigation?.state?.routes?.[0]?.params?.isMenuHide

  const isEditStartup = navigation?.state?.routes[1]?.routeName === 'EditStartup'

  return {
    tabBarIcon: ({ focused }) => <TabCenterIcon focused={focused} />,
    tabBarVisible: !isInsidePage(navigation) && !isMenuHide && !isEditStartup,
    tabBarLabel: () => <TabCenterLabel />,
    tabBarComponent: props => <MaterialTabBar {...props} />,
  }
}

export default StartupStack
