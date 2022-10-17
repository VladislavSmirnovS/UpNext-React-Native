import React, { useState, useEffect } from 'react'
import { PermissionsAndroid, Platform, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import { handleError } from 'services/logger'

const { width } = Dimensions.get('window')

export default ({ onLoad, ...props }) => {
  const [isAllow, setIsAllow] = useState(false)

  useEffect(() => {
    checkPermissions()
  }, [])

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ])
        .then(result => {
          setIsAllow(true)
        })
        .catch(error => handleError(error))
    } else {
      setIsAllow(true)
    }
  }

  return isAllow ? (
    <WebView
      useWebKit={true}
      {...props}
      style={{ marginTop: 10, height: '100%', width: width }}
      onLoadEnd={onLoad}
    />
  ) : null
}
