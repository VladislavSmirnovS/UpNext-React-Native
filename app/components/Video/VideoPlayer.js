import React, { useState, useRef, useEffect } from 'react'
import { AppState } from 'react-native'
import styled from 'styled-components'
import Video from 'react-native-video'
import PlayerWrapper from 'components/Video/PlayerWrapper'
import MutedButton from 'components/Video/MutedButton'
import ProgressBar from 'components/Video/ProgressBar'
import PlayButton from 'components/Video/PlayButton'
import ClickedComponent from 'components/Control/ClickedComponent'
import Colors from 'appearance/colors'

export default ({
  localUrl,
  url,
  poster,
  withProgressBar,
  isBottomProgressBar,
  isBlueProgressBar,
  isPlay,
  onTogglePlay,
  onVideoEmergencyStop,
  onEnd,
  isRestart,
  naturalSize,
  maxWidth,
  maxHeight,
  isContain,
  isCheckIfSmall,
  withMutedBtn = false,
  withPlayButton = false,
  isMuted = false,
  onSetIsMuted,
  onDoubleTap,
  renderVideoBottom,
  onLongPress,
  useCache,
  rotate,
  playButtonSize,
  onLoad,

  onSetDuration,
  onSetProgress,
  ...props
}) => {
  if (!url && !localUrl) {
    return null
  }

  const isVertical = () => {
    return +naturalSize?.height > +naturalSize?.width
  }

  const videoPlayer = useRef(null)

  const [play, setPlay] = useState(isPlay)
  const [duration, _setDuration] = useState(0)
  const [progress, _setProgress] = useState(0)
  const [isEnd, setIsEnd] = useState(false)

  const durationRef = React.useRef(duration)
  const setDuration = duration => {
    durationRef.current = duration
    _setDuration(duration)
    onSetDuration && onSetDuration(duration)
  }

  const progressRef = React.useRef(progress)
  const setProgress = progress => {
    progressRef.current = progress
    _setProgress(progress)
    onSetProgress && onSetProgress(progress)
  }

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    return () => AppState.removeEventListener('change', _handleAppStateChange)
  }, [])

  const _handleAppStateChange = nextAppState => {
    if (nextAppState !== 'active') {
      setPlay(false)
      onVideoEmergencyStop && onVideoEmergencyStop(progressRef.current, durationRef.current)
    }
  }

  useEffect(() => {
    changePlay(isPlay)
  }, [isPlay])

  const restartVideo = () => {
    videoPlayer?.current?.seek(0.1)
  }

  useEffect(() => {
    if (isRestart) {
      restartVideo()
    }
  }, [isRestart])

  const changePlay = isPlay => {
    setPlay(isPlay)
    if (isPlay && isEnd) {
      setIsEnd(false)
      restartVideo()
    }
  }

  const onProgress = ({ seekableDuration, currentTime }) => {
    const currentProgress = currentTime && duration ? (currentTime * 100) / duration : 0
    setProgress(currentProgress)

    if (!duration) {
      setDuration(seekableDuration)
    }
  }

  const togglePlay = () => {
    changePlay(!play)
    onTogglePlay && onTogglePlay()
  }

  const handleEnd = () => {
    togglePlay()
    setIsEnd(true)
    setProgress(100)
    onEnd && onEnd()
  }

  const handleLongPress = () => {
    if (play) {
      togglePlay()
    }
    onLongPress && onLongPress()
  }

  return (
    <ClickedComponent onPress={togglePlay} onLongPress={handleLongPress} onDoubleTap={onDoubleTap}>
      <PlayerWrapper
        naturalSize={naturalSize}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        isCheckIfSmall={isCheckIfSmall && !isVertical()}
      >
        <VideoBox
          ref={ref => (videoPlayer.current = ref)}
          source={localUrl || { uri: url }}
          poster={poster}
          resizeMode={isVertical() && !maxHeight && !isContain ? 'cover' : 'contain'}
          posterResizeMode={isVertical() ? 'cover' : 'contain'}
          paused={!play}
          muted={isMuted}
          onProgress={withProgressBar ? onProgress : null}
          onEnd={handleEnd}
          ignoreSilentSwitch="ignore"
          playInBackground={false}
          playWhenInactive={false}
          useCache={typeof useCache !== 'undefined' ? !!useCache : true}
          bufferConfig={BUFFER_CONFIG}
          style={rotate ? { transform: [{ rotate }] } : {}}
          onLoad={onLoad}
          {...props}
        />
      </PlayerWrapper>

      {withProgressBar ? (
        <ProgressBar
          progress={progress}
          isBottomProgressBar={isBottomProgressBar}
          isBlueProgressBar={isBlueProgressBar}
        />
      ) : null}
      {withPlayButton ? <PlayButton isPlay={play} playButtonSize={playButtonSize} /> : null}
      {withMutedBtn ? <MutedButton isMuted={isMuted} onSetIsMuted={onSetIsMuted} /> : null}
      {renderVideoBottom && renderVideoBottom()}
    </ClickedComponent>
  )
}

const BUFFER_CONFIG = {
  minBufferMs: 1000,
  maxBufferMs: 5000,
  bufferForPlaybackMs: 1000,
  bufferForPlaybackAfterRebufferMs: 1000,
}

const VideoBox = styled(Video)`
  width: 100%;
  height: 100%;
  background: ${Colors.BLACK};
  border-radius: ${p => p.borderRadius || 0}px;
`
