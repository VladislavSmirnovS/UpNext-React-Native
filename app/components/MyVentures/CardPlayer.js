import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PlayButton from 'components/Video/PlayButton'
import Loading from 'components/Page/Loading'
import Player from 'components/Video/Player'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'

export default ({
  navigation,
  url,
  currentStep,
  stepIndex,
  playButtonSize,
  borderRadius,
  loadingSize,
  onSetVideoData,
  disablePlayer,
  isMerging,
  isContain = true,
  onLoad,
}) => {
  const [isPlay, setIsPlay] = useState(false)
  const [isRestart, setIsRestart] = useState(false)

  useEffect(() => {
    const blurSubscription = navigation.addListener('willBlur', () => {
      onStopVideo()
    })
    return () => blurSubscription.remove()
  }, [])

  useEffect(() => {
    if (+currentStep !== stepIndex) {
      onStopVideo()
    } else if (isRestart) {
      setIsRestart(false)
    }
  }, [currentStep])

  const onStopVideo = () => {
    setIsRestart(true)
    setIsPlay(false)
  }

  const onTogglePlay = () => {
    setIsPlay(!isPlay)
  }

  const radius = borderRadius || borderRadius === 0 ? borderRadius : Styles.MAIN_BORDER_RADIUS

  return (
    <Wrapper pointerEvents={disablePlayer ? 'none' : 'auto'}>
      {isMerging ? (
        <EmptyMergePlayer borderRadius={radius} playButtonSize={playButtonSize} />
      ) : url ? (
        <Player
          url={url}
          isRestart={isRestart}
          isPlay={isPlay}
          onTogglePlay={onTogglePlay}
          isContain={isContain}
          withPlayButton
          borderRadius={radius}
          playButtonSize={playButtonSize}
          loadingSize={loadingSize}
          onSetVideoData={onSetVideoData}
          onLoad={onLoad}
          isFlex
        />
      ) : (
        <EmptyPlayer borderRadius={radius} playButtonSize={playButtonSize} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%;
  flex: 1;
`

export const EmptyPlayer = ({ playButtonSize, borderRadius }) => {
  const radius = borderRadius || borderRadius === 0 ? borderRadius : Styles.MAIN_BORDER_RADIUS

  return (
    <GreyView borderRadius={radius}>
      <PlayButton isPlay={false} playButtonSize={playButtonSize} />
    </GreyView>
  )
}

const EmptyMergePlayer = ({ playButtonSize, borderRadius }) => {
  return (
    <BlackView borderRadius={borderRadius}>
      <LoadingText>{'Video\r\nis generated..'}</LoadingText>
      <Loading size={50} />
    </BlackView>
  )
}

const BlackView = styled.View`
  background: ${Colors.BLACK};
  flex: 1;
  border-radius: ${p => p.borderRadius}px;
  padding-top: 10px;
`

const GreyView = styled.View`
  background: ${Colors.COMMON_GREY};
  flex: 1;
  border-radius: ${p => p.borderRadius}px;
  align-items: center;
  justify-content: center;
`

const LoadingText = styled(Texts.SmallText)`
  color: ${Colors.WHITE};
  font-size: 10px;
  text-align: center;
`

const View = styled.View`
  height: 10px;
`
