import React, { useRef, useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'
import Player from 'components/Video/Player'
import Spacer from 'components/Page/Spacer'
import { RNCamera } from 'react-native-camera'
import { launchImageLibrary } from 'react-native-image-picker'
import RNFS from 'react-native-fs'
import { handleError } from 'services/logger'
import useModal from 'hooks/useModal'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import Images from 'appearance/images'

const VIDEO_TYPE = 'video'
const PHOTO_TYPE = 'photo'

export default ({
  isVisible = false,
  type = VIDEO_TYPE,
  maxDuration = 60,
  maxDurationError,
  launchImageOptions = {},
  onImageLibraryLoad = () => {},
  onConfirm = () => {},
  onHide = () => {},
}) => {
  const [isCameraVisible, showCamera, hideCamera] = useModal()

  const onTakePress = () => {
    showCamera()
  }

  const onSelectPress = () => {
    launchImageLibrary(launchImageOptions, response => {
      onImageLibraryLoad && onImageLibraryLoad()

      if (response.didCancel) {
        // onCancel && onCancel()
      } else if (response.error) {
        // onError && onError(response.error)
      } else if (response.customButton) {
        // onError && onError()
      } else {
        onClose()
        onConfirm(response?.assets?.[0])
      }
    })
  }

  const onClose = () => {
    hideCamera()
    onHide()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      {isCameraVisible ? (
        <Camera
          isVisible={isCameraVisible}
          type={type}
          maxDuration={maxDuration}
          maxDurationError={maxDurationError}
          onHide={onClose}
          onConfirm={onConfirm}
        />
      ) : (
        <CenteredView>
          <ChooseContainer>
            <Right>
              <TouchableOpacity onPress={onClose}>
                <CloseIcon source={Images.close} resizeMode="contain" />
              </TouchableOpacity>
            </Right>
            <Spacer h={10} />
            <Row>
              <ImageButton source={Images.videoCamera} title="Camera" onPress={onTakePress} />
              <ImageButton source={Images.gallery} title="Gallery" onPress={onSelectPress} />
            </Row>
          </ChooseContainer>
        </CenteredView>
      )}
    </Modal>
  )
}

const ImageButton = ({ source, title, onPress }) => {
  return (
    <SelectButton onPress={onPress}>
      <IconWrapper>
        <SelectIcon source={source} resizeMode="contain" />
      </IconWrapper>
      <Spacer h={10} />
      <Texts.GreyText>{title}</Texts.GreyText>
    </SelectButton>
  )
}

const SELECT_BUTTON_SIZE = 40

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
`

const ChooseContainer = styled.View`
  width: 100%;
  background: ${Colors.WHITE};
  padding: 15px;
  border-radius: 15px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

const Right = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
`

const CloseIcon = styled.Image`
  width: 15px;
  height: 15px;
`

const TouchableOpacity = styled.TouchableOpacity``

const SelectButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

const IconWrapper = styled.View`
  background: ${Colors.COMMON_BLUE};
  border-radius: ${SELECT_BUTTON_SIZE}px;
  padding: 20px;
`

const SelectIcon = styled.Image`
  height: ${SELECT_BUTTON_SIZE}px;
  width: ${SELECT_BUTTON_SIZE}px;
`

// -------------------------------------------------------------------------- //

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
  let _cameraRef = useRef(null)

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
    if (_cameraRef) {
      const options = { quality: 0.5 }
      const data = await _cameraRef.takePictureAsync(options)
      setPhoto(data.uri)
    }
  }

  const stopRecord = () => {
    setIsRecording(false)
    _cameraRef.stopRecording()
    stopTimer()
  }

  const startRecord = async () => {
    if (_cameraRef && !isRecording) {
      try {
        const options = { maxDuration }
        const promiss = _cameraRef.recordAsync(options)

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
                _cameraRef = ref
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
