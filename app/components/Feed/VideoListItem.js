import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AnimatedCoin from 'components/Feed/AnimatedCoin'
import VideoListItem from 'components/Video/VideoListItem'
import VideoBottom from 'components/Feed/VideoBottom'
import { saveVideoProgress } from 'store/app/app.actions'
import { viewFeedVideo } from 'store/feed/feed.actions'
import useCoinsButton from 'components/Feed/hooks/useCoinsButton'
import streamio from 'services/streamio'

export default ({ item, feedId, feedGroup, navigation, onLongPress, ...props }) => {
  const dispatch = useDispatch()

  const { onDoubleTap, isCoinPress, ...coinsButtonProps } = useCoinsButton({
    item,
    feedGroup,
    navigation,
  })

  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleLongPress = () => {
    onSaveVideoProgress()
    onLongPress && onLongPress(item, feedGroup)
  }

  const onVideoStop = item => {
    if (duration > 0 && progress > 0) {
      const progressSec = (duration * progress) / 100
      if (progressSec >= 1) {
        dispatch(viewFeedVideo(item, progress, duration))
      }
    }
  }

  const onSaveVideoProgress = () => {
    dispatch(saveVideoProgress({ url: item?.video_url, progress }))
  }

  const renderVideoBottom = () => {
    return <AnimatedCoin isCoinPress={isCoinPress} />
  }

  // const onSetVideoData = item => {
  //   streamio.quietEditActivity({
  //     activityId: item?.id,
  //     vimeoData: item.vimeoData, // { ...res, rotate: '90deg' }
  //   })
  // }

  return (
    <VideoListItem
      item={item}
      onDoubleTap={onDoubleTap}
      renderVideoBottom={renderVideoBottom}
      onLongPress={handleLongPress}
      onVideoStop={onVideoStop}
      setDuration={setDuration}
      setProgress={setProgress}
      // onSetVideoData={onSetVideoData}
      {...props}
    >
      <VideoBottom
        item={item}
        navigation={navigation}
        feedId={feedId}
        feedGroup={feedGroup}
        coinsButtonProps={coinsButtonProps}
        onSaveVideoProgress={onSaveVideoProgress}
      />
    </VideoListItem>
  )
}
