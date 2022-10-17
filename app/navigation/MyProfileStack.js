import { createStackNavigator } from 'react-navigation-stack'
import TabUserAvatar from 'navigation/TabUserAvatar'
import MaterialTabBar from 'navigation/MaterialTabBar'
import stackOptions from 'navigation/stackOptions'
import { isInsidePage } from 'services/navigation'

import MyProfile from 'screens/Profile/MyProfile'
import UserInvestProfile from 'screens/Profile/UserInvestProfile'
import MentorProfile from 'screens/Profile/MentorProfile'
import MyGeneralProfile from 'screens/Profile/MyGeneralProfile'
import EditProfile from 'screens/Profile/EditProfile'
import GetCoin from 'screens/Profile/GetCoin'
import GreenCoin from 'screens/Profile/GreenCoin'
import Wallet from 'screens/Profile/Wallet'
import AskUs from 'screens/Profile/AskUs'
import LobbyCurrentTeam from 'screens/LobbyCurrentTeam'
import LobbyCurrentMember from 'screens/LobbyCurrentMember'
import LobbyCurrentMentor from 'screens/LobbyCurrentMentor'
import LearnVideos from 'screens/LearnVideos'

const LABEL = 'My Profile'

const MyProfileStack = createStackNavigator(
  {
    MyProfile,
    UserInvestProfile,
    MentorProfile,
    MyGeneralProfile,
    EditProfile,
    GetCoin: { screen: GetCoin, navigationOptions: { headerTitle: () => null } },
    GreenCoin,
    AskUs,
    Wallet,

    LearnVideos,
    LobbyCurrentMember,
    LobbyCurrentMentor,
    LobbyCurrentTeam,
  },
  stackOptions,
)

MyProfileStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: <TabUserAvatar />,
    tabBarVisible: !isInsidePage(navigation),
    tabBarLabel: LABEL,
    tabBarComponent: props => <MaterialTabBar {...props} />,
  }
}

export default MyProfileStack
