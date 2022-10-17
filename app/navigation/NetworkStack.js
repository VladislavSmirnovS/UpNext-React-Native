import { createStackNavigator } from 'react-navigation-stack'
import MenuImage from 'navigation/MenuImage'
import MaterialTabBar from 'navigation/MaterialTabBar'
import Images from 'appearance/images'
import stackOptions from 'navigation/stackOptions'
import { isInsidePage } from 'services/navigation'

import LobbyCurrentTeam from 'screens/LobbyCurrentTeam'
import LobbyCurrentMember from 'screens/LobbyCurrentMember'
import LobbyCurrentMentor from 'screens/LobbyCurrentMentor'
import CurrentLauncher from 'screens/CurrentLauncher'
import LearnVideos from 'screens/LearnVideos'
import Network from 'screens/Network'
import MentorNetwork from 'screens/MentorNetwork'
import MyProfile from 'screens/Profile/MyProfile'
import UserInvestProfile from 'screens/Profile/UserInvestProfile'
import MentorProfile from 'screens/Profile/MentorProfile'
import MyGeneralProfile from 'screens/Profile/MyGeneralProfile'
import EditProfile from 'screens/Profile/EditProfile'
import GetCoin from 'screens/Profile/GetCoin'
import GreenCoin from 'screens/Profile/GreenCoin'
import Wallet from 'screens/Profile/Wallet'
import AskUs from 'screens/Profile/AskUs'

const LABEL = 'Launchpad'

const NetworkStack = createStackNavigator(
  {
    Network,
    MentorNetwork,

    LearnVideos,
    CurrentLauncher,
    LobbyCurrentMember,
    LobbyCurrentMentor,
    LobbyCurrentTeam,

    MyProfile,
    UserInvestProfile,
    MentorProfile,
    MyGeneralProfile,
    EditProfile,
    GetCoin,
    GreenCoin,
    Wallet,
    AskUs,
  },
  stackOptions,
)

NetworkStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ focused }) => <MenuImage source={Images.menu_launchpad} focused={focused} />,
    tabBarVisible: !isInsidePage(navigation),
    tabBarLabel: LABEL,
    tabBarComponent: props => <MaterialTabBar {...props} />,
  }
}

export default NetworkStack
