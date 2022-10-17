import React from 'react'
import { I18nManager, AppState } from 'react-native'
import { Provider, connect } from 'react-redux'
import codePush from 'react-native-code-push'
import { InAppNotificationProvider } from 'react-native-in-app-notification'
import sendbird from 'services/sendbird'
import InAppNotification from 'components/Notification/InAppNotification'
import AppWithNavigationState from 'navigation/AppWithNavigationState'
import { setOverflowAnimation } from 'store/app/app.actions'
import store from 'store/Store'
import Config from 'root/config'
import { handleError } from 'services/logger'
import codePushOptions from 'root/codepush'
import mixpanel from 'services/mixpanel'
import api from 'services/api'

// if (__DEV__) {
//   import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
// }

global.__DEV_USER_CODE__ = __DEV__ ? '7qgd3aw4' : null // gf6krrs1
const TIMOUT_FOR_RESTART_APP = 7000

I18nManager.allowRTL(false)
if (!Config.IS_DEBUG) {
  mixpanel.init()
}

class App extends React.Component {
  state = {
    isTimout: false,
    isUpdated: false,
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: 'Checking for update.' })
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.shownUpdateAnimation()
        this.setState({ syncMessage: 'Downloading package.' })
        break
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: 'Awaiting user action.' })
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: 'Installing update.' })
        break
      case codePush.SyncStatus.UP_TO_DATE:
        this.setState({
          syncMessage: 'App up to date.',
          progress: false,
          isTimout: false,
          isUpdated: false,
        })
        break
      case codePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: false,
          isTimout: false,
          isUpdated: false,
        })
        store.dispatch(setOverflowAnimation(null))
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        if (this.state.isTimout) {
          codePush.restartApp()
        }
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: false,
          isTimout: false,
          isUpdated: true,
        })
        break
      case codePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'An unknown error occurred.',
          progress: false,
          isTimout: false,
          isUpdated: false,
        })
        store.dispatch(setOverflowAnimation(null))
        break
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress })
  }

  showAnimation() {
    store.dispatch(
      setOverflowAnimation({
        name: 'update',
        text: NEW_VERSION_TEXT,
        isInfinitely: true,
      }),
    )
  }

  restartAppAfterTimer() {
    this.timer = setTimeout(() => {
      this.setState({ isTimout: true })
      if (this.state.isUpdated) {
        codePush.restartApp()
      }
    }, TIMOUT_FOR_RESTART_APP)
  }

  shownUpdateAnimation() {
    this.showAnimation()
    this.restartAppAfterTimer()
  }

  removeConsoleErrors() {
    if (!__DEV__) {
      console.debug = console.log = console.warn = console.error = error => handleError(error)
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)

    this.removeConsoleErrors()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)

    clearTimeout(this.timer)
  }

  _handleAppStateChange = nextAppState => {
    sendbird.changeAppState(nextAppState)
    this._trackUserSession(nextAppState)
  }

  _trackUserSession = nextAppState => {
    if (nextAppState !== 'active' && !Config.IS_DEBUG) {
      api.trackEndSession()
    }
    if (nextAppState !== 'background' && !Config.IS_DEBUG) {
      api.trackStartSession()
    }
  }

  render() {
    return (
      <InAppNotificationProvider
        notificationBodyComponent={InAppNotification}
        height={100}
        closeInterval={10000}
      >
        <Provider store={store}>
          <ReduxNavigator />
        </Provider>
      </InAppNotificationProvider>
    )
  }
}

const NEW_VERSION_TEXT =
  "A new version of the app is available. But hang on one minute while we update it. Please don't close the app before this update completes."

const mapStateToProps = state => ({
  nav: state.nav,
})

const ReduxNavigator = connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true },
)(AppWithNavigationState)

if (!Config.IS_DEBUG) {
  App = codePush(codePushOptions)(App)
}
export default App
