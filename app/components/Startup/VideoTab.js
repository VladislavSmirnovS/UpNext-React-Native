import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Images from 'appearance/images'
import { useDispatch } from 'react-redux'
import Player from 'components/Video/Player'
import api from 'services/api'
import { handleError } from 'services/logger'
import { openCardVideosPage } from '/services/navigation'
import FastImage from 'react-native-fast-image'
import PlayButton from 'components/Video/PlayButton'
import TotalViews from 'components/Video/TotalViews'
import { getTeamAvatarProps } from 'utils/team'

const VideoTab = ({ navigation }) => {
  const dispatch = useDispatch()
  const { id } = navigation.state.params
  const { views } = navigation.state.params
  const { pain_video } = navigation.state.params

  const [localTeam, setLocalTeam] = useState(null)
  const [isPlay, setIsPlay] = useState(false)

  useEffect(() => {
    api
      .getTeam(id)
      .then(res => setLocalTeam(res.data))
      .catch(error => handleError(error))
    return () => setLocalTeam()
  }, [id])

  const onPressPlayVideo = () => {
    const url = localTeam?.pain_video
    const title = localTeam?.slogan
    if (url) {
      const params = {
        videos: [
          {
            url,
            title,
          },
        ], withEditButton: 'true'
      }
      dispatch(openCardVideosPage(navigation, params))
    }
  }
  return (
    <VideoCard>
      <TouchableOpacity style={{ paddingBottom: 2, width: '33%', height: 220 }}>
        {isPlay ? (
          <Player
            url={pain_video}
            isPlay={isPlay}
            onTogglePlay={onPressPlayVideo}
            isContain
            withPlayButton
          />
        ) : (
          <Poster onPress={onPressPlayVideo}>
            <FastImage
              source={getTeamAvatarProps(navigation.state.params)}
              style={{ height: '100%', width: '100%' }}
            />
            <PlayButton isPlay={false} />
            <TotalViews views={views} />
          </Poster>
        )}
      </TouchableOpacity>
    </VideoCard>
  )
}

const VideoCard = styled.View`
flexDirection: row;
flexWrap: wrap;
justifyContent: space-between;
width: 100%;
`

const Poster = styled.TouchableOpacity``

export default VideoTab
