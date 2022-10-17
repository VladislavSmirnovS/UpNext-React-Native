import { Platform, PermissionsAndroid } from 'react-native'
import { handleError } from 'services/logger'
import { toggleCamera } from 'store/app/app.actions'

const DEFAULT_SIZE = 128
const DEFAULT_TITLE = 'Select Avatar'

export const DEFAULT_IMAGE_PICKER_OPTIONS = {
  quality: 0.5,
  allowsEditing: false,
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
}

class MyImagePicker {
  getOptions = (size, title) => {
    return {
      ...DEFAULT_IMAGE_PICKER_OPTIONS,
      width: size || DEFAULT_SIZE,
      height: size || DEFAULT_SIZE,
      title: title || DEFAULT_TITLE,
    }
  }

  checkPermissions = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
          .then(result => {
            const resultKeys = Object.keys(result)
            const res = resultKeys.map(key => result[key])
            if (res.every(res => res === PermissionsAndroid.RESULTS.GRANTED)) {
              resolve()
            } else {
              reject('Permission denied')
            }
          })
          .catch(error => reject(error))
      } else {
        resolve()
      }
    })
  }

  startImagePicker = props => {
    this.checkPermissions()
      .then(() => this.uploadImage(props))
      .catch(error => handleError(error))
  }

  startVideoPicker = props => {
    this.checkPermissions()
      .then(() => this.uploadVideo(props))
      .catch(error => handleError(error))
  }

  uploadImage = ({ options, size, title, onCancel, onError, onUpload, dispatch }) => {
    const resOptions = options || this.getOptions(size, title)

    dispatch(
      toggleCamera({
        isVisible: true,
        options: { type: 'photo' },
        launchImageOptions: resOptions,
        callback: res => {
          const file = this.getImageFile(res)
          onUpload && onUpload(file)
        },
      }),
    )
  }

  uploadVideo = ({ options, onLoad, onCancel, onError, onUpload, dispatch, maxDurationError }) => {
    dispatch(
      toggleCamera({
        isVisible: true,
        cameraOptions: {
          type: 'video',
          maxDuration: options?.durationLimit,
          maxDurationError,
        },
        launchImageOptions: options,
        onImageLibraryLoad: onLoad,
        callback: res => {
          const file = this.getVideoFile(res, options.mediaType)
          onUpload && onUpload(file)
        },
      }),
    )
  }

  getImageFile = response => {
    return {
      name: response.fileName || response.uri.split('/').pop(),
      type: `image/${response.uri.split('.').pop()}`,
      uri: response.uri,
    }
  }

  getVideoFile = (response, mediaType) => {
    let file = {
      uri: response.uri,
      videoPathName: response.fileName || response.uri,
    }
    if (response.fileName) {
      file.name = response.fileName
    } else {
      const paths = response.uri.split('/')
      file.name = paths[paths.length - 1]
    }
    if (response.type) {
      file.type = response.type
    } else if (mediaType === 'video') {
      file.type = 'video/mp4'
    }
    return file
  }
}

const imagepicker = new MyImagePicker()
export default imagepicker
