import React from 'react'
import styled from 'styled-components'
import VideoSelector from 'components/Startup/VideoSelector'
import { EmptyPlayer } from 'components/MyVentures/CardPlayer'
import VerticalEmptyVideoWrapper from 'components/MyVentures/Video/VerticalEmptyVideoWrapper'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import Header from 'components/Launcher/Header'
import Spacer from 'components/Page/Spacer'

export default ({ navigation, item, onSave }) => {
  const onUpload = ({ uri }) => {
    onSave({ ...item, video_url: uri })
  }

  return (
    <>
      <Header item={item} title="Video pitch " />
      <Centered>
        {item?.video_url ? (
          <Player url={item?.video_url} navigation={navigation} />
        ) : (
          <Selector onUpload={onUpload} />
        )}
        <Spacer h={20} />
      </Centered>
    </>
  )
}

const Player = ({ url, navigation }) => {
  return (
    <VerticalEmptyVideoWrapper>
      <FullScreenPlayer url={url} navigation={navigation} />
    </VerticalEmptyVideoWrapper>
  )
}

const Selector = ({ onUpload }) => {
  return (
    <VideoSelector
      onUpload={onUpload}
      onSetProgress={() => {}}
      onSetUploadProgress={() => {}}
      onGetUploadProgress={() => {}}
    >
      <VerticalEmptyVideoWrapper>
        <EmptyPlayer />
      </VerticalEmptyVideoWrapper>
    </VideoSelector>
  )
}

const Centered = styled.View`
  margin: auto;
  flex: 1;
`
