import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'
import * as Sentry from '@sentry/react-native'
import Config from 'root/config'

export const handleError = (error, isFatal) => {
  if (__DEV__ && Config.IS_DEBUG) {
    // console.warn('ERROR', isFatal, error)
  } else {
    Sentry.captureException(error)
  }

  if (isFatal) {
    const isFatalText = isFatal ? 'Fatal' : ''
    const helpText = '\r\nWe have reported this to our team! Please close app and try again!'
    const errText = typeof error === 'string' && error
    alert(`Error: ${isFatalText} ${error?.name} ${error?.message} ${errText}. ${helpText}`)
  }
}

setJSExceptionHandler((error, isFatal) => {
  handleError(error, isFatal)
})

setNativeExceptionHandler(errorString => {
  handleError(errorString, true)
})
