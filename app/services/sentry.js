import * as Sentry from '@sentry/react-native'
import { getAppVersion } from 'services/app'
import { SENTRY_APP_TOKEN } from '@env'

const DSN = `https://${SENTRY_APP_TOKEN}.ingest.sentry.io/5570317`

class MySentry {
  init = () => {
    Sentry.init({
      dsn: DSN,
      enableNative: false,
    })
    Sentry.setTag('app_version', getAppVersion())
  }
}

const sentry = new MySentry()
export default sentry
