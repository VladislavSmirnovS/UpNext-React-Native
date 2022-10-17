import React from 'react'
import styled from 'styled-components'
import { PermissionsAndroid, Platform, Alert } from 'react-native'
import { Button, Icon } from 'native-base'
import { launchImageLibrary } from 'react-native-image-picker'
import sendbird from 'services/sendbird'
import { handleError } from 'services/logger'
import { getLimitFromSec } from 'services/utils'
import Images from '/appearance/images'

const DURATION_LIMIT = 30
const options = {
  title: 'Upload Image/Video To Send',
  mediaType: 'mixed',
  durationLimit: DURATION_LIMIT,
  noData: true,
}

export default ({ onSendFile }) => {
  const checkPermission = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE])
          .then(result => {
            const res = Object.keys(result).map(key => result[key])
            if (res.every(res => res === PermissionsAndroid.RESULTS.GRANTED)) {
              resolve()
            } else {
              reject('Permisson is canceled')
            }
          })
          .catch(error => handleError(error))
      } else {
        resolve()
      }
    })
  }

  const startPicker = () => {
    checkPermission()
      .then(() => uploadFile())
      .catch(error => handleError(error))
  }

  const uploadFile = () => {
    if (Platform.OS === 'android') {
      sendbird.disableStateChange()
    }

    launchImageLibrary(options, response => {
      if (Platform.OS === 'android') {
        sendbird.enableStateChange()
      }

      if (response.didCancel) {
      } else if (response.error) {
        handleError(response.error)
      } else {
        const res = response?.assets?.[0]
        if (res.duration && res.duration < 1) {
          Alert.alert('Sorry', 'Video is too short', [{ text: 'OK', onPress: () => {} }], {
            cancelable: false,
          })
        } else if (res.duration && res.duration > DURATION_LIMIT) {
          Alert.alert(
            'Sorry',
            `Uploaded video should not be longer than ${getLimitFromSec(DURATION_LIMIT)}`,
            [{ text: 'OK', onPress: () => {} }],
            {
              cancelable: false,
            },
          )
        } else {
          sendFile(res, options.mediaType)
        }
      }
    })
  }

  const sendFile = (response, mediaType) => {
    let file = {
      uri: response.uri,
    }

    if (response.fileName) {
      file.name = response.fileName
    } else {
      const paths = response.uri.split('/')
      file.name = paths[paths.length - 1]
    }

    if (response.type) {
      file.type = response.type
    } else {
      file.type = 'video/mp4'
    }

    onSendFile && onSendFile(file)
  }

  return (
    <WrapButton>
      <Button onPress={startPicker} transparent rounded>
        <AttachIcon source={Images.attach} />
      </Button>
    </WrapButton>
  )
}

const WrapButton = styled.View`
  margin: 0;
`

const AttachIcon = styled.Image`
  margin-right: 20px;
`
