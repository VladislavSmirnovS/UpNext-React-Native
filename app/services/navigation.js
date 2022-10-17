import { doIfLoginUser } from 'store/user/user.actions'
import { getUserId } from 'utils/user'

const ALLOWED_ROUTES_FOR_NOT_LOGINNED_USERS = [
  'Loader',
  'Login',
  'Logger',

  'Notification',
  'Notifications',

  'Home',
  'Feed',
  'FeedSingle',
  'LearnVideos',
]

const NOT_ALLOWED_ROUTES_FOR_MENTORS = ['Startup', 'EditStartup', 'MyStartups', 'Admin']

const INSIDE_PAGES = [
  'Admin',
  'Chat',
  'CurrentChat',
  'FeedSingle',
  'LobbyCurrentMember',
  'UserProfile',
  'LobbyCurrentMentor',
  'LobbyCurrentTeam',
  'CurrentLauncher',
  'LearnVideos',
  'VideoGallery',
  'MyGeneralProfile',
  'EditProfile',
  'MentorProfile',
  'GetCoin',
  'AskUs',
  'GreenCoin',
  'Wallet',
  'MyProfile',
]

export const LOADER_ROUTE = 'Loader'
export const LOGIN_ROUTE = 'Login'
export const MY_PROFILE_ROUTE = 'MyProfile'
export const USER_INVEST_PROFILE_ROUTE = 'UserInvestProfile'
export const MY_GENERAL_PROFILE_ROUTE = 'MyGeneralProfile'
export const EDIT_PROFILE_ROUTE = 'EditProfile'
export const GET_COIN_ROUTE = 'GetCoin'
export const GREEN_COIN_ROUTE = 'GreenCoin'
export const WALLET_ROUTE = 'Wallet'
export const ASK_US_ROUTE = 'AskUs'
export const MENTOR_PROFILE_ROUTE = 'MentorProfile'
export const MAIN_HOME_ROUTE = 'Home'
export const HOME_ROUTE = 'Feed'
export const FEED_SINGLE_ROUTE = 'FeedSingle'
export const NOTIFICATION_ROUTE = 'Notification'
export const MAIN_MY_STARTUPS_ROUTE = 'MyStartups'
export const MY_STARTUPS_ROUTE = 'Startup'
export const EDIT_STARTUP = 'EditStartup'
export const MY_NETWORK_ROUTE = 'MyNetwork'
export const NETWORK_ROUTE = 'Network'
export const ADMIN_ROUTE = 'Admin'
export const CHAT_ROUTE = 'Chat'
export const VIDEO_GALLERY = 'VideoGallery'
export const CURRENT_CHAT_ROUTE = 'CurrentChat'
export const LOBBY_CURRENT_TEAM_ROUTE = 'LobbyCurrentTeam'
export const LOBBY_CURRENT_MEMBER_ROUTE = 'LobbyCurrentMember'
export const USER_PROFILE_ROUTE = 'UserProfile'
export const LOBBY_CURRENT_MENTOR_ROUTE = 'LobbyCurrentMentor'
export const CURRENT_LAUNCHER = 'CurrentLauncher'
export const CARD_VIDEOS_ROUTE = 'LearnVideos'

export const openLoginPage = (...args) => {
  return openPageWithParams(LOGIN_ROUTE, ...args)
}

export const openMyProfilePage = (...args) => {
  return openPageWithParams(MY_PROFILE_ROUTE, ...args)
}

export const openUserInvestProfilePage = (...args) => {
  return openPageWithParams(USER_INVEST_PROFILE_ROUTE, ...args)
}

export const openMyGeneralPage = (...args) => {
  return openPageWithParams(MY_GENERAL_PROFILE_ROUTE, ...args)
}

export const openEditPage = (...args) => {
  return openPageWithParams(EDIT_PROFILE_ROUTE, ...args)
}

export const openGetCoinPage = (...args) => {
  return openPageWithParams(GET_COIN_ROUTE, ...args)
}

export const openGreenCoinPage = (...args) => {
  return openPageWithParams(GREEN_COIN_ROUTE, ...args)
}
export const openWalletPage = (...args) => {
  return openPageWithParams(WALLET_ROUTE, ...args)
}

export const openAskUsPage = (...args) => {
  return openPageWithParams(ASK_US_ROUTE, ...args)
}

export const openHomePage = (...args) => {
  return openPageWithParams(HOME_ROUTE, ...args)
}

export const openMyStartupPage = (...args) => {
  return openPageWithParams(MY_STARTUPS_ROUTE, ...args)
}
export const openVideoGalleryPage = (...args) => {
  return openPageWithParams(VIDEO_GALLERY, ...args)
}

export const openEditStartupPage = (...args) => {
  return openPageWithParams(EDIT_STARTUP, ...args)
}

export const openNetworkWithDefTab = (...args) => {
  return openPageWithParams(NETWORK_ROUTE, ...args)
}

export const openAdminPage = (...args) => {
  return openPageWithParams(ADMIN_ROUTE, ...args)
}

export const openChatPage = (...args) => {
  return openPageWithParams(CHAT_ROUTE, ...args)
}

export const openCurrentChatPage = (...args) => {
  return openPageWithParams(CURRENT_CHAT_ROUTE, ...args)
}

export const openFeedSinglePage = (...args) => {
  return openPageWithParams(FEED_SINGLE_ROUTE, ...args)
}

export const openLobbyCurrentTeamPage = (...args) => {
  return openPageWithParams(LOBBY_CURRENT_TEAM_ROUTE, ...args)
}

export const openLobbyCurrentMemberPage = (...args) => {
  return openPageWithParams(LOBBY_CURRENT_MEMBER_ROUTE, ...args)
}

export const openUserProfilePage = (...args) => {
  return openPageWithParams(LOBBY_CURRENT_MEMBER_ROUTE, ...args)
}

export const openLobbyCurrentMentorPage = (...args) => {
  return openPageWithParams(LOBBY_CURRENT_MENTOR_ROUTE, ...args)
}

export const openCurrentLauncher = (...args) => {
  return openPageWithParams(CURRENT_LAUNCHER, ...args)
}

export const openCardVideosPage = (...args) => {
  return openPageWithParams(CARD_VIDEOS_ROUTE, ...args)
}

export const openNotificationPage = (...args) => {
  return openPageWithParams(NOTIFICATION_ROUTE, ...args)
}

export const openPageByPath = ({ navigation, routeName, params, cancelCallback }) => {
  const pathConst = {
    Home: HOME_ROUTE,
    Notification: NOTIFICATION_ROUTE,
    MyStartups: MY_STARTUPS_ROUTE,
    MyNetwork: NETWORK_ROUTE,
  }[routeName]

  return openPageWithParams(
    pathConst || routeName || HOME_ROUTE,
    navigation,
    params,
    null,
    cancelCallback,
  )
}

const openPageWithParams = (routeName, navigation, params, key, cancelCallback) => {
  return openPage({ navigation, routeName, params, key, cancelCallback })
}

const openPage = ({ navigation, routeName, params, key, cancelCallback }) => dispatch => {
  dispatch(checkRouteBeforeJump({ navigation, routeName, params, key, cancelCallback }))
}

const checkRouteBeforeJump = ({
  navigation,
  routeName,
  params,
  key,
  cancelCallback,
}) => dispatch => {
  const isAvailable = dispatch(isAvailableRoute(routeName))

  if (isAvailable) {
    jumpTo({ navigation, routeName, params, key })
  } else {
    cancelCallback && cancelCallback()
  }
}

const isAvailableRoute = route => (dispatch, getState) => {
  const { user } = getState().user
  const userId = getUserId(user)

  if (user?.is_mentor) {
    return !NOT_ALLOWED_ROUTES_FOR_MENTORS.includes(route)
  }

  if (userId) {
    return true
  }

  const isAvailable = ALLOWED_ROUTES_FOR_NOT_LOGINNED_USERS.includes(route)
  if (!isAvailable) {
    dispatch(doIfLoginUser()) // shown offer to login modal
  }
  return isAvailable
}

const jumpTo = ({ navigation, routeName, params, key }) => {
  const navigateParams = {
    routeName,
  }
  if (params) {
    navigateParams.params = params
  }
  if (key) {
    navigateParams.key = key
  }
  navigation && navigation.navigate(navigateParams)
}

export const isInsidePage = navigation => {
  const routes = navigation?.state?.routes.map(item => item.routeName)
  return routes.some(item => INSIDE_PAGES.indexOf(item) >= 0)
}
