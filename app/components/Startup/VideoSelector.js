import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Platform, Alert } from 'react-native'
import styled, { css } from 'styled-components'
import imagepicker from 'services/imagepicker'
import Video from 'react-native-video'
import AlertModal from 'components/Control/AlertModal'
import ProgressBar from 'components/Control/ProgressBar'
import Spacer from 'components/Page/Spacer'
import vimeo from 'services/vimeo'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { useUser } from 'store/user/user.uses'
import { getLimitFromSec } from 'services/utils'
import { handleError } from 'services/logger'
import { getUserFullName } from 'utils/user'

const SIZE = 128
const DURATION_LIMIT = 60
const DEFATUL_TITLE = 'Select video'
const options = {
  title: DEFATUL_TITLE,
  takePhotoButtonTitle: 'Take a video',
  allowsEditing: false,
  width: SIZE,
  height: SIZE,
  quality: 0.5,
  mediaType: 'video',
  durationLimit: DURATION_LIMIT,
  storageOptions: {
    skipBackup: false,
    path: 'videos',
  },
}

export default ({
  onCancel,
  onError,
  onUpload,
  optionTitle,
  durationLimit = DURATION_LIMIT,
  maxDurationError,
  align,
  isFull,
  withErrorText = true,
  withProgress = true,
  onSetProgress,
  onSetDuration,
  videoPart,
  textAlertBeforeCamera,
  textAlertVideoChange,
  onSetUploadProgress,
  onGetUploadProgress,
  children,
}) => {
  const dispatch = useDispatch()
  const user = useUser()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isVideoChangeModalVisible, setIsVideoChangeModalVisible] = useState(false)

  const [videoPathName, setVideoPathName] = useState(null)
  const [videoPath, setVideoPath] = useState(null)
  const [loadingUrl, setLoadingUrl] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    const getProgressUpload = async () => {
      const data = await onGetUploadProgress()
      const link = await vimeo.continueUploading({
        data,
        progressCallback: progress => handleSetProgress(progress),
        onSetUploadProgress,
        setLink,
      })
      resetProgress()
    }
    !progress && onGetUploadProgress && getProgressUpload()
  }, [])

  const onModalOpen = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onStartPicker = () => {
    onModalClose()
    onVideoChangeModalClose()

    imagepicker.startVideoPicker({
      options: { ...options, title: optionTitle, durationLimit },
      onLoad: onModalClose,
      onUpload: response => {
        setLoadingUrl(response.uri)
        setVideoPath(response.path || response.uri)
        setVideoPathName(response.videoPathName)
      },
      onCancel,
      onError,
      dispatch,
      maxDurationError: maxDurationError || getVideoLimitError(durationLimit),
    })
  }

  const getVideoLimitError = durationLimit => {
    return `Uploaded video should not be longer than ${getLimitFromSec(durationLimit)}`
  }

  const onLoad = ({ duration, naturalSize }) => {
    if (duration < 1) {
      Alert.alert('Sorry', 'Video is too short', [{ text: 'OK', onPress: () => {} }], {
        cancelable: false,
      })
    } else if (duration > durationLimit + 1) {
      Alert.alert('Sorry', getVideoLimitError(durationLimit), [{ text: 'OK', onPress: () => {} }], {
        cancelable: false,
      })
    } else {
      onSetDuration && onSetDuration({ duration })
      videoPath && onVideoUpload(videoPath)
    }
    setLoadingUrl(null)
    setVideoPath(null)
  }

  const getVideoRes = link => {
    return {
      uri: link,
      name: 'user_pain.mp4',
      poster: 'https://s3.amazonaws.com/dev.upnext/asset_videos/default_video_thumbnail.png',
    }
  }

  const setLink = link => {
    const videoRes = getVideoRes(link)
    onUpload && onUpload(videoRes)
  }

  const resetProgress = () => {
    setTimeout(() => handleSetProgress(null), 500)
  }

  const onVideoUpload = videoPath => {
    const resFile =
      Platform.OS === 'ios' ? videoPath.replace('file:///', '').replace('file://', '') : videoPath
    const videoName = `Startup video part ${videoPart ? `(${videoPart}) ` : ''}by ${getUserFullName(
      user,
    )}`

    vimeo
      .uploadPainVideoPart({
        videoPath: resFile,
        videoPathName,
        progressCallback: progress => handleSetProgress(progress),
        videoName,
        onSetUploadProgress,
        setLink,
      })
      .then(link => resetProgress())
      .catch(error => {
        handleError(error)
        handleSetProgress(null)
        Alert.alert(
          'Sorry',
          'There was an error uploading your video - ' + error,
          [{ text: 'OK', onPress: () => {} }],
          {
            cancelable: false,
          },
        )
      })
  }

  const handleSetProgress = progress => {
    setProgress(progress)
    onSetProgress(progress)
  }

  const onPress = () => {
    if (!!textAlertVideoChange) {
      onVideoChangeModalOpen()
    } else {
      onFirstModalPress()
    }
  }

  const onFirstModalPress = () => {
    if (!!textAlertBeforeCamera) {
      onModalOpen()
      onVideoChangeModalClose()
    } else {
      onStartPicker()
    }
  }

  const onVideoChangeModalOpen = () => {
    setIsVideoChangeModalVisible(true)
  }

  const onVideoChangeModalClose = () => {
    setIsVideoChangeModalVisible(false)
  }

  return (
    <>
      <TouchableOpacity onPress={onPress} align={align} isFull={isFull} disabled={!!progress}>
        {progress && withProgress ? (
          <>
            <ProgressBar progress={progress} />
            <Spacer h={10} />
          </>
        ) : withProgress ? (
          <Spacer h={20} />
        ) : null}
        {loadingUrl ? (
          <VideoBox source={{ uri: loadingUrl }} paused={true} onLoad={onLoad} />
        ) : null}
        {children}
        {withErrorText ? (
          <SmallBlueText>{(durationLimit / 60)?.toFixed(2)} min max</SmallBlueText>
        ) : null}
      </TouchableOpacity>
      <AlertModal
        isVisible={isModalVisible}
        text={textAlertBeforeCamera}
        okText="OK"
        onConfirm={onStartPicker}
        cancelText="Cancel"
        onCancel={onModalClose}
      />
      <AlertModal
        isVisible={isVideoChangeModalVisible}
        text={textAlertVideoChange}
        okText="OK"
        onConfirm={onFirstModalPress}
        cancelText="Cancel"
        onCancel={onVideoChangeModalClose}
      />
    </>
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  align-self: ${p => p.align || 'flex-start'};
  ${p =>
    p.isFull &&
    css`
      width: 100%;
      flex: 1;
    `}
`

const VideoBox = styled(Video)`
  width: 0;
  height: 0;
`

const SmallBlueText = styled(Texts.SmallText)`
  color: ${Colors.COMMON_BLUE};
  text-align: center;
`
