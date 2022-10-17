import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import StepContainer from 'components/MyVentures/StepContainer'
import ColoredVideoPart from 'components/MyVentures/Video/ColoredVideoPart'
import MergedVideoPlayer from 'components/MyVentures/Video/MergedVideoPlayer'
import Spacer from 'components/Page/Spacer'
import Loader from 'components/Page/Loader'
import { getTeamVideoParts } from 'store/team/team.actions'
import { useTeam, useTeamPainVideoParts } from 'store/team/team.uses'
import { useUserId } from 'store/user/user.uses'
import Styles from 'appearance/styles'
import Colors from 'appearance/colors'
import LastActivity from 'components/Feed/LastActivity'
import { getUserId } from 'utils/user'
import Images from 'appearance/images'
import useModal from 'hooks/useModal'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { RNCamera } from 'react-native-camera'
import { AppRegistry, Text, TouchableOpacity } from 'react-native'
import RNFS from 'react-native-fs'
import CameraRoll from '@react-native-community/cameraroll'

const VIDEO_DURATION_LIMIT = 60
const VIDEO_TYPE = 'video'
const PHOTO_TYPE = 'photo'
const SIZE = 128
const DURATION_LIMIT = 60
const DEFATUL_TITLE = 'Select video'

export default ({
  isVisible = false,
  type = VIDEO_TYPE,
  maxDuration = 60,
  maxDurationError,
  launchImageOptions = {},
  navigation,
  currentStepInfo,
  localActivity,
  onSave,
  checkAutoFeedHide,
  currentStep,
  stepIndex,
  onConfirm = () => {},
  onHide = () => {},
}) => {
  const dispatch = useDispatch()
  const team = useTeam()
  const userId = useUserId()
  const painVideoParts = useTeamPainVideoParts()

  const [isLoading, setIsLoading] = useState(true)
  const [videoDurationLimit, setVideoDurationLimit] = useState(0)
  const [videosDurations, setVideosDuratons] = useState({})
  const [isCameraVisible, showCamera, hideCamera] = useModal()
  const [lastVideo, setLastVideo] = useState([])
  const [video, setVideo] = useState('')

  const optionsLoadVideo = {
    title: DEFATUL_TITLE,
    takePhotoButtonTitle: 'Take a video',
    allowsEditing: false,
    width: SIZE,
    height: SIZE,
    quality: 0.5,
    mediaType: 'mixed',
    durationLimit: DURATION_LIMIT,
    storageOptions: {
      skipBackup: false,
      path: 'videos',
    },
  }

  const optionsTakeVideo = {
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

  const onTakePress = () => {
    launchCamera(optionsTakeVideo, response => {
      if (response.didCancel) {
        // onCancel && onCancel()
      } else if (response.error) {
        // onError && onError(response.error)
      } else if (response.customButton) {
        // onError && onError()
      } else {
        onClose()
        setVideo(response?.assets?.[0].uri)
        onConfirm(response?.assets?.[0])
      }
    })
  }
  const onClose = () => {
    hideCamera()
    onHide()
  }
  const onSelectPress = () => {
    launchImageLibrary(optionsLoadVideo, response => {
      if (response.didCancel) {
        // onCancel && onCancel()
      } else if (response.error) {
        // onError && onError(response.error)
      } else if (response.customButton) {
        // onError && onError()
      } else {
        onClose()
        setVideo(response?.assets?.[0].uri)
        onConfirm(response?.assets?.[0])
      }
    })
  }
  useEffect(() => {
    if (team?.id) {
      setIsLoading(true)
      dispatch(
        getTeamVideoParts(team?.id, () => {
          setIsLoading(false)
        }),
      )
    }
  }, [team?.id])

  useEffect(() => {
    CameraRoll.getPhotos({
      assetType: 'Videos',
      first: 1,
    }).then(result => {
      const video = result.edges
      setLastVideo(video)
    })
  }, [])

  useEffect(() => {
    if (!isLoading) {
      let limit = VIDEO_DURATION_LIMIT
      Object.keys(videosDurations)?.map(key => {
        limit -= videosDurations[key]
      })
      setVideoDurationLimit(limit < 0 ? 0 : limit)
    }
  }, [isLoading, videosDurations])

  const onVideoLoad = (videoPart, duration) => {
    setVideosDuratons({ ...videosDurations, [videoPart]: duration })
  }

  const videoPlayerProps = {
    navigation,
    currentStep,
    stepIndex,
    localActivity,
    onVideoLoad,
    videoDurationLimit,
    fullVideoDurationLimit: VIDEO_DURATION_LIMIT,
    painVideoParts,
    onSave,
    checkAutoFeedHide,
    team,
  }

  const getTeamVideoPart = videoPart => {
    const item = painVideoParts?.[videoPart]
    const itemUserId = getUserId(item?.user)
    const isUserChanged = itemUserId && userId === itemUserId
    const isUserDraft = isUserChanged && !item?.is_merged
    return item?.is_merged || isUserDraft ? item : null
  }

  return (
    <StepContainer navigation={navigation} currentStepInfo={currentStepInfo}>
      {isLoading ? (
        <WrapLoader>
          <Loader />
        </WrapLoader>
      ) : (
        <PageView>
          {isCameraVisible ? (
            <Modal animationType="slide" transparent={true}>
              <Camera
                isVisible={isCameraVisible}
                type={type}
                maxDuration={maxDuration}
                maxDurationError={maxDurationError}
                onHide={onClose}
                onConfirm={onConfirm}
              />
            </Modal>
          ) : (
            <PageView>
              <MergedVideoPlayer
                url={video}
                activityTime={LastActivity?.time}
                localActivity={localActivity}
                {...videoPlayerProps}
              >
                <Padding>
                  <ImageButton source={Images.startVideo} title="Camera" onPress={onTakePress} />
                  <GalleryButton
                    source={{
                      uri: [...lastVideo][0]?.node.image.uri,
                    }}
                    title="Gallery"
                    onPress={onSelectPress}
                  />
                </Padding>
              </MergedVideoPlayer>
            </PageView>
          )}
        </PageView>
      )}
    </StepContainer>
  )
}

const Padding = styled.View`
  flexDirection: row
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom:20;

`
const PageView = styled.View`
  flex: 1;
  justify-content: center;
`

const WrapLoader = styled.View`
  flex: 1;
  justify-content: center;
`

const ImageButton = ({ source, onPress }) => {
  return (
    <SelectButton onPress={onPress}>
      <VideoIcon source={source} resizeMode="contain" />
    </SelectButton>
  )
}

const GalleryButton = ({ source, onPress }) => {
  return (
    <SelectGallery onPress={onPress}>
      <GalleryIcon source={source} resizeMode="cover" />
      <IconCount />
    </SelectGallery>
  )
}

const SelectGallery = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 130;
  justify-content: center;
  align-items: center;
`
const SelectButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`
const VideoIcon = styled.Image`
  height: 86px;
  width: 86px;
`

const GalleryIcon = styled.Image`
  height: 61px;
  width: 61px;
  border-radius: 7px;
`
const IconWrapper = styled.View`
  position: absolute;
  bottom: -7;
  left: 48;
`
const AddIcon = styled.Image`
  height: 27px;
  width: 27px;
`
const IconCount = () => {
  return (
    <IconWrapper>
      <AddIcon source={Images.addButton} resizeMode="contain" />
    </IconWrapper>
  )
}

const FRONT_TYPE = RNCamera.Constants.Type.front
const BACK_TYPE = RNCamera.Constants.Type.back
const FLASH_MODE = RNCamera.Constants.FlashMode.on
const ANDROID_CAMERA_PERMISSION_OPTIONS = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
}
const ANDROID_RECORD_AUDIO_PERMISSIONS = {
  title: 'Permission to use audio recording',
  message: 'We need your permission to use your audio',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
}

let timer = null
export const Camera = ({
  type = PHOTO_TYPE,
  isVisible = false,
  onHide,
  onConfirm = () => {},
  maxDuration = 60,
  maxDurationError,
}) => {
  const cameraRef = useRef(null)

  const [cameraType, setCameraType] = useState(BACK_TYPE)
  const [isRecording, setIsRecording] = useState(false)
  const [photo, setPhoto] = useState()
  const [video, setVideo] = useState()
  const [isDisabled, setIsDisabled] = useState(false)
  const [time, setTime] = useState(0)

  const resetData = () => {
    setPhoto()
    setVideo()
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const options = { quality: 0.5 }
      const data = await cameraRef.takePictureAsync(options)
      setPhoto(data.uri)
    }
  }

  const stopRecord = () => {
    setIsRecording(false)
    cameraRef.stopRecording()
    stopTimer()
  }
  const startRecord = async () => {
    if (cameraRef && !isRecording) {
      try {
        const options = { maxDuration }
        const promiss = cameraRef.recordAsync(options)

        if (promiss) {
          setIsRecording(true)
          startDuration()

          const data = await promiss
          setVideo(data.uri)
          // setIsRecording(false) // if auto stop after limit is reached
        }
      } catch (error) {
        setIsRecording(false)
        handleError(error)
        onError(error)
      }
    }
  }

  const startDuration = () => {
    if (maxDurationError) {
      setTimeout(() => {
        setTime(0)
        startTimer()
      })
    }
  }

  const startTimer = () => {
    timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime >= maxDuration) {
          stopTimer()

          Alert.alert(
            'Limit is reached',
            maxDurationError || '',
            [{ text: 'OK', onPress: () => {} }],
            { cancelable: false },
          )
        }
        return prevTime + 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const cancel = () => {
    stopRecord()
    resetData()

    if (photo) {
      RNFS.unlink(photo)
    }
    if (video) {
      RNFS.unlink(video)
    }
  }

  const confirm = () => {
    const uri = type === PHOTO_TYPE ? photo : video
    close()
    onConfirm({ uri })
  }

  const close = () => {
    stopRecord()
    resetData()
    onHide()
  }

  const onError = error => {
    Alert.alert(
      'Error',
      `You can not create video/photo, ${error}`,
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: true },
    )
  }

  const pressStartRecord = () => {
    disableButtonForTimout()
    startRecord()
  }

  const pressStopRecord = () => {
    disableButtonForTimout()
    stopRecord()
  }

  const disableButtonForTimout = () => {
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled(false)
    }, 1000)
  }

  const renderContent = () => {
    if (photo) {
      return (
        <AbsoluteContainer>
          <PhotoPreview source={{ uri: photo }} resizeMode="contain" />
          <VideoButtons>
            <CancelButton onPress={cancel} />
            <ConfirmButton onPress={confirm} />
          </VideoButtons>
        </AbsoluteContainer>
      )
    }

    if (video) {
      return (
        <AbsoluteContainer>
          <Player url={video} isContain withPlayButton isFlex />
          <VideoButtons>
            <CancelButton onPress={cancel} />
            <ConfirmButton onPress={confirm} />
          </VideoButtons>
        </AbsoluteContainer>
      )
    }

    return null
  }

  return (
    <>
      {renderContent()}
      <Container>
        {isVisible ? (
          <>
            <RNCamera
              ref={ref => {
                cameraRef = ref
              }}
              type={cameraType}
              flashMode={FLASH_MODE}
              androidCameraPermissionOptions={ANDROID_CAMERA_PERMISSION_OPTIONS}
              androidRecordAudioPermissionOptions={ANDROID_RECORD_AUDIO_PERMISSIONS}
              style={CAMERA_STYLE}
              onMountError={onError}
            />
            <VideoButtons>
              <CloseButton onPress={close} />
              
              {type === PHOTO_TYPE ? <TakePhotoButton onPress={takePhoto} /> : null}

              {type === VIDEO_TYPE ? (
                isRecording ? (
                  <RecordButton isRecording onPress={pressStopRecord} disabled={isDisabled} />
                ) : (
                  <RecordButton onPress={pressStartRecord} disabled={isDisabled} />
                )
              ) : null}

              <SwithCameraButton
                cameraType={cameraType}
                setCameraType={setCameraType}
                isRecording={isRecording}
              />
            </VideoButtons>
          </>
        ) : null}
      </Container>
    </>
  )
}

const CloseButton = ({ onPress }) => {
  return (
    <ButtonStyled onPress={onPress}>
      <Icon source={Images.closeCamera} resizeMode="contain" />
    </ButtonStyled>
  )
}

const TakePhotoButton = ({ onPress }) => {
  return (
    <MainButtonStyled onPress={onPress}>
      <StopRecordView />
    </MainButtonStyled>
  )
}

const RecordButton = ({ isRecording, onPress, disabled }) => {
  return (
    <MainButtonStyled onPress={onPress} disabled={disabled}>
      {isRecording ? <RecordView /> : <StopRecordView />}
    </MainButtonStyled>
  )
}

const SwithCameraButton = ({ cameraType, setCameraType, isRecording }) => {
  const onToggleType = () => {
    setCameraType(cameraType === FRONT_TYPE ? BACK_TYPE : FRONT_TYPE)
  }

  return (
    <ButtonStyled onPress={onToggleType} disabled={isRecording}>
      <Icon source={Images.switchCamera} resizeMode="contain" />
    </ButtonStyled>
  )
}

const CancelButton = ({ onPress }) => {
  return (
    <ButtonStyled onPress={onPress}>
      <Icon source={Images.closeCamera} resizeMode="contain" />
    </ButtonStyled>
  )
}

const ConfirmButton = ({ onPress }) => {
  return (
    <ButtonStyled onPress={onPress}>
      <Icon source={Images.check} resizeMode="contain" />
    </ButtonStyled>
  )
}

const MAIN_BUTTON_SIZE = 70
const BUTTON_SIZE = 50
const BUTTON_ICON_SIZE = 30

const CAMERA_STYLE = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
}

const Modal = styled.Modal``

const Container = styled.View`
  background: ${Colors.BLACK};
  flex: 1;
`

const AbsoluteContainer = styled.View`
  background: ${Colors.BLACK};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 99999;
`

const VideoButtons = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const MainButtonStyled = styled.TouchableOpacity`
  background: ${Colors.WHITE};
  width: ${MAIN_BUTTON_SIZE}px;
  height: ${MAIN_BUTTON_SIZE}px;
  border-radius: ${MAIN_BUTTON_SIZE / 2}px;
  padding: 5px;
  justify-content: center;
  align-items: center;
`

const ButtonStyled = styled.TouchableOpacity`
  background: #00000060;
  padding: 10px;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  border-radius: ${BUTTON_SIZE / 2}px;
  justify-content: center;
  align-items: center;
`

const StopRecordView = styled.View`
  background: ${Colors.COMMON_RED};
  border-radius: ${MAIN_BUTTON_SIZE / 2}px;
  width: 100%;
  height: 100%;
`

const RecordView = styled.View`
  background: ${Colors.COMMON_RED};
  width: ${MAIN_BUTTON_SIZE / 3}px;
  height: ${MAIN_BUTTON_SIZE / 3}px;
`

const Icon = styled.Image`
  align-self: center;
  height: ${BUTTON_ICON_SIZE}px;
  width: ${BUTTON_ICON_SIZE}px;
  tint-color: ${Colors.WHITE};
`

const PhotoPreview = styled.Image`
  flex: 1;
`
