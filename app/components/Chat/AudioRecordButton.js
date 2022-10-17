import React, { useRef, useState, useMemo, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Animated, PanResponder, PermissionsAndroid, Platform } from 'react-native'
import { Icon } from 'native-base'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { handleError } from 'services/logger'
import Images from 'appearance/images'

export default ({ isRecording, setIsRecording, onSendFile }) => {
  const pan = useRef(new Animated.ValueXY()).current
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current

  const [dropZoneValues, setDropZoneValues] = useState()
  const [recordSecs, setRecordSecs] = useState()
  const [recordTime, setRecordTime] = useState('00:00:00')
  const [isLoading, setIsLoading] = useState(false)
  const [isStopClicked, setIsStopClicked] = useState(false)
  const [isReadyToSend, setIsReadyToSend] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [filePath, setFilePath] = useState()
  const [isDrop, setIsDrop] = useState(false)

  const onClear = () => {
    setIsDrop(false)
    setRecordTime('00:00:00')
    setFilePath()
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderMove: (e, gestureState) => {
          setIsDrop(isDropZone(gestureState)) // change button icon
          if (gestureState.dx < 0)
            Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(e, gestureState)
        },

        onPanResponderRelease: (e, gesture) => {
          setIsSend(!isDropZone(gesture)) // true if in send zone
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start()
        },

        onPanResponderStart: () => startRecord(),
        onPanResponderEnd: () => stopRecord(),
      }),
    [dropZoneValues],
  )

  // if release btn too fast, stoped after recording start is done
  useEffect(() => {
    if (isStopClicked && !isLoading) {
      stopRecord()
      setIsStopClicked(false)
    }
  }, [isLoading, isStopClicked])

  // send audio
  useEffect(() => {
    if (isReadyToSend && isSend && isFilePath(filePath) && recordSecs >= 1500) {
      onSend()
      setIsReadyToSend(false)
    }
  }, [isReadyToSend, isSend, filePath, recordSecs])

  const isDropZone = gesture => {
    return gesture.moveX !== 0 && gesture.moveX < dropZoneValues.x + dropZoneValues.width
  }

  const startRecord = () => {
    setRecordSecs()
    setIsReadyToSend(false)
    setIsRecording(true)

    setIsLoading(true)
    checkPermission()
      .then(() => {
        onStartRecord()
      })
      .catch(error => handleError(error))
  }

  const stopRecord = () => {
    setIsRecording(false)

    onStopRecord()
    onClear()
  }

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder()
    audioRecorderPlayer.addRecordBackListener(e => {
      const recordTime = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
      setRecordSecs(e.currentPosition)
      setRecordTime(recordTime)
    })

    setIsLoading(false)
  }

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder()

    if (isFilePath(result)) {
      setFilePath(result)
      setIsStopClicked(false)
      setIsReadyToSend(true)
    } else {
      setIsStopClicked(true)
    }

    // This not working for ios
    if (Platform.OS === 'android') {
      audioRecorderPlayer.removeRecordBackListener()
    }
  }

  const onSend = () => {
    const file = {
      uri: filePath,
      type: 'audio/mp4',
      name: 'sound.mp4',
    }
    onSendFile(file)
  }

  const onSetDropZoneValues = event => {
    setDropZoneValues(event.nativeEvent.layout)
  }

  return (
    <>
      <DropZoneWrapper>
        <DropZone onLayout={onSetDropZoneValues} />
      </DropZoneWrapper>

      <Container isRecording={isRecording}>
        <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
          <Wrapper>
            {isRecording ? (
              <LeftWrapper>
                <LeftInfo>
                  <Texts.GreyText>{`< swipe to cancel`}</Texts.GreyText>
                  <Spacer />
                  <Texts.TitleText>{recordTime}</Texts.TitleText>
                </LeftInfo>
              </LeftWrapper>
            ) : null}
            {!isDrop ? (
              <RecordButton source={isRecording ? Images.isRecord : Images.record} />
            ) : (
              <ButtonIcon name="trash" />
            )}
          </Wrapper>
        </Animated.View>
      </Container>
    </>
  )
}

const isFilePath = res => {
  return res && res.includes('sound')
}

const checkPermission = () => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ])
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

const DropZoneWrapper = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
`

const DropZone = styled.View`
  width: 60%;
  height: 100%;
  position: absolute;
  left: 0;
`
const ButtonIcon = styled(Icon)`
  color: red;
`

const Container = styled.View`
  position: absolute;
  bottom: 0px;
  right: 3px;
  z-index: 5;
  ${p =>
    p.isRecording &&
    css`
      width: 100%;
    `};
`

const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
`

const LeftWrapper = styled.View`
  padding: 35px 0px 0 5px;
  flex: 1;
`

const Spacer = styled.View`
  flex: 1;
`

const LeftInfo = styled.View`
  background: #fff;
  flex: 1;
  align-items: center;
  padding: 0 15px;
  flex-direction: row;
  border: 1px solid ${Colors.SEPARATOR_GREY};
  border-radius: 30px;
`
const RecordButton = styled.Image``
