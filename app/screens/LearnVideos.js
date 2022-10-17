import React, { useState, forwardRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import VideoList from 'components/Video/VideoList'
import Tutorial from 'components/LearnVideos/Tutorial'
import { doneCardVideo, updateCardVideoItem } from 'store/startup/startup.actions'
import { AVAILABLE_HEIGHT } from 'components/Control/DeviceHeight'
import mixpanel from 'services/mixpanel'
import LearnVideoPlayer from 'components/Video/LearnVideoPlayer'

const LearnVideos = ({ navigation }) => {
  const dispatch = useDispatch()
  const [videos, setVideos] = useState()

  useEffect(() => {
    setVideos(navigation?.state?.params?.videos)
  }, [navigation?.state?.params?.videos])

  const onVideoStart = item => {
    mixpanel.trackEvent(`Cards video viewed - ${item.title}`)
  }

  const localSetDoneStatus = videoId => {
    setVideos(videos?.map(item => (item.id === videoId ? { ...item, is_done: true } : item)))
  }

  const onVideoEnd = item => {
    if (!item.is_done && navigation?.state?.params?.key) {
      localSetDoneStatus(item?.id)
      dispatch(doneCardVideo(navigation?.state?.params?.key, item?.id))
      mixpanel.trackEvent(`Cards video completed - ${item.title}`)
    }
  }

  // const onSetVideoData = item => {
  //   dispatch(updateCardVideoItem(item))
  // }

  return (
    <PageContainer
      navigation={navigation}
      hideTopHeader
      noPadding
      withoutInteractions
      isLoading={!videos?.length}
    >
      <LearnVideoPlayer
        navigation={navigation}
        data={videos || []}
        withEditButton={navigation?.state?.params.withEditButton}
        onVideoStart={onVideoStart}
        onVideoEnd={onVideoEnd}
        height={`${AVAILABLE_HEIGHT}px`}
        // onSetVideoData={onSetVideoData}
      />
      <Tutorial videos={videos} />
    </PageContainer>
  )
}

const FlatList = styled.FlatList.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  width: 100%;
`
LearnVideos.navigationOptions = screenProps => {
  return { headerShown: false }
}
export default LearnVideos
