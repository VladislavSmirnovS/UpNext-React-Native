import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components'
import ProgressBar from 'components/Chat/ProgressBar'
import PlayButton from 'components/Chat/PlayButton'
import Texts from 'appearance/texts'
import Sound from 'react-native-sound'
import { handleError } from 'services/logger'

let intervalId = null

export default ({ item }) => {
  const { url } = item
  const [whoosh, setWhoosh] = useState()

  const [isLoading, setIsLoading] = useState(true)
  const [isPlay, setIsPlay] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progressDuration, setProgressDuration] = useState(0)

  useEffect(() => {
    if (url) {
      const whoosh = createPlayer(url, () => {
        setIsLoading(false)
        setDuration(whoosh.getDuration())
      })
      setWhoosh(whoosh)

      return () => {
        whoosh.stop()
        onClearInterval()
      }
    }
  }, [url])

  useEffect(() => {
    if (intervalId) {
      onClearInterval()
    }

    if (isPlay) {
      intervalId = setInterval(onProgress, 300)
    }
  }, [isPlay])

  const onClearInterval = () => {
    clearInterval(intervalId)
    intervalId = null
  }

  const onProgress = () => {
    whoosh.getCurrentTime(seconds => setProgressDuration(seconds))
  }

  const getProgress = () => {
    return progressDuration ? (progressDuration * 100) / duration : 0
  }

  const togglePlay = () => {
    isPlay ? onPause() : onPlay()
  }

  const onPlay = () => {
    setIsPlay(true)
    whoosh.play(success => onEnd())
  }

  const onPause = () => {
    setIsPlay(false)
    whoosh.pause()
  }

  const onEnd = () => {
    setIsPlay(false)
    setProgressDuration(duration)
  }

  return (
    <Row>
      <TouchableOpacity onPress={isLoading ? null : togglePlay}>
        <PlayButton isLoading={isLoading} isPlay={isPlay} />
      </TouchableOpacity>

      <ProgressBarWrapper>
        <ProgressBar progress={getProgress()} />
        {progressDuration ? renderDuration(progressDuration) : renderDuration(duration)}
      </ProgressBarWrapper>
    </Row>
  )
}

const createPlayer = (url, callback) => {
  const soundBundle = Platform.select({
    ios: () => '',
    android: () => Sound.MAIN_BUNDLE,
  })()

  return new Sound(url, soundBundle, error => {
    if (error) {
      handleError(error)
      return
    }
    callback && callback()
  })
}

const renderDuration = duration => {
  const time = secToMinutesAndSeconds(duration)
  return duration ? <Texts.GreyText>{time}</Texts.GreyText> : null
}

export const secToMinutesAndSeconds = s => {
  if (s <= 0) {
    return '00:00'
  }

  const minutes = Math.floor(s / 60)
  const seconds = (s % 60000).toFixed(0)

  const min = seconds == 60 ? minutes + 1 : minutes
  const sec = seconds == 60 ? 0 : seconds <= 0 ? 1 : seconds

  const extraNull = sec < 10 ? 0 : ''

  return `${min}:${extraNull}${sec}`
}

const Row = styled.View`
  flex-direction: row;
`

const TouchableOpacity = styled.TouchableOpacity``

const ProgressBarWrapper = styled.View`
  width: 120px;
  justify-content: center;
  margin-left: 10px;
`
