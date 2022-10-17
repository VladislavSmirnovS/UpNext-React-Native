import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FullScreen from 'components/Video/FullScreen'
import Player from 'components/Video/Player'
import VideoPoster from 'components/Video/VideoPoster'
import DoneStatus from 'components/Video/DoneStatus'
import { saveVideoProgress } from 'store/app/app.actions'
import { useSavedVideoProgress } from 'store/app/app.uses'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'

export default ({
  item,

  field = 'url',
  withProgressBar = true,
  isBottomProgressBar = false,
  isBlueProgressBar = false,
  withMutedBtn = false,
  isMuted = false,
  play = false,

  setDuration,
  setProgress,

  isPoster,
  height,

  renderVideoBottom,
  onVideoStart,
  onVideoStop,
  onVideoEmergencyStop,
  onVideoEnd,
  onSetIsMuted,
  onSetVideoData,
  onDoubleTap,
  onLongPress,

  children,
}) => {
  const dispatch = useDispatch()
  const savedVideoProgress = useSavedVideoProgress()

  const [isPlay, setIsPlay] = useState(false)
  const [withPlayButton, setWithPlayButton] = useState(false)
  const [isRestart, setIsRestart] = useState(false)

  useEffect(() => {
    if (isPlay !== play) {
      setIsPlay(play)
    }
    if (isRestart !== play) {
      if (savedVideoProgress && savedVideoProgress?.url === item[field]) {
        dispatch(saveVideoProgress(null))
      } else {
        setWithPlayButton(false)
        setIsRestart(play)
      }

      if (play) {
        onVideoStart && onVideoStart(item)
      } else {
        onVideoStop && onVideoStop(item)
      }
    }
  }, [play])

  const handleVideoEmergencyStop = (progress, duration) => {
    if (play) {
      onVideoEmergencyStop && onVideoEmergencyStop(item, progress, duration)
    }
  }

  const onTogglePlay = () => {
    setIsPlay(!isPlay)
    setWithPlayButton(true)
  }

  const onEnd = () => {
    onVideoEnd && onVideoEnd(item)
  }

  const handleSetVideoData = data => {
    onSetVideoData &&
      onSetVideoData({
        ...item,
        vimeoData: data,
      })
  }

  return (
    <>
      <FullScreen height={height}>
        {isPoster ? (
          <VideoPoster poster={item?.poster} vimeoData={item.vimeoData} />
        ) : (
          <Player
            url={item[field]}
            vimeoData={item.vimeoData}
            withProgressBar={withProgressBar}
            isBottomProgressBar={isBottomProgressBar}
            isBlueProgressBar={isBlueProgressBar}
            isPlay={isPlay}
            onTogglePlay={onTogglePlay}
            onEnd={onEnd}
            isRestart={isRestart}
            isMuted={isMuted}
            onSetIsMuted={onSetIsMuted}
            withMutedBtn={withMutedBtn}
            onSetVideoData={handleSetVideoData}
            poster={item?.poster}
            naturalSize={item?.naturalSize}
            onDoubleTap={onDoubleTap}
            renderVideoBottom={renderVideoBottom}
            withPlayButton={withPlayButton}
            onLongPress={onLongPress}
            onVideoEmergencyStop={handleVideoEmergencyStop}
            onSetDuration={setDuration}
            onSetProgress={setProgress}
          />
        )}

        <DoneStatus isDone={item.is_done} />
        {item.title ? <VideoTitle>{item.title}</VideoTitle> : null}
      </FullScreen>
      {children}
    </>
  )
}

const VideoTitle = styled(Texts.HeaderText)`
  color: ${Colors.WHITE};
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding: ${Styles.PAGE_PADDING};
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
`
