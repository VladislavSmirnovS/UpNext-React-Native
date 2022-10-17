import React from 'react'
import { Dimensions } from 'react-native'
import Player from 'components/Video/Player'

export default ({ activity }) => {
  const { video_url } = activity

  if (!video_url) {
    return null
  }

  return <Player url={video_url} maxHeight={width} withPlayButton vimeoData={activity.vimeoData} />
}

const { width } = Dimensions.get('window')
