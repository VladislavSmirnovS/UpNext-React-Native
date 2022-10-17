import React from 'react'
import { ScrollView } from 'react-native'
import PageContainer from 'components/Page/PageContainer'
import VideoTab from 'components/Startup/VideoTab'
import Container from '../components/CurrentTeam/Container'
import styled from 'styled-components'

const VideoGallery = ({ navigation }) => {
  return (
    <GalleryScreen>
          <PageContainer navigation={navigation} hideTopHeader noPadding addBtn titleBack>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VideoTab navigation={navigation} />
        </ScrollView>
      </Container>
    </PageContainer>
    </GalleryScreen>

  )
}

const GalleryScreen = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 10px;
`

export default VideoGallery
