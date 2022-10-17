import { AppRegistry } from 'react-native'
import { startNetworkLogging } from 'react-native-network-logger'
import App from 'root/App'
import { name as appName } from 'root/app.json'
import Config from 'root/config'
import notifications from 'services/notifications'
import sentry from 'services/sentry'

if (Config.IS_DEBUG) {
  startNetworkLogging()
} else {
  sentry.init()
}

notifications.handleBackgroundNotification()

const HeadlessCheck = ({ isHeadless }) => {
  return isHeadless ? null : <App /> // for ios
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
