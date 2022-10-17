import React, { useState } from 'react'
import PageContainer from 'components/Page/PageContainer'
import Container from 'components/Feed/Container'
import Tabs from 'components/Feed/Tabs'
import useStartupVideos from 'hooks/useStartupVideos'
import styled from 'styled-components'
import GestureRecognizer from 'react-native-swipe-gestures'

const Feed = ({ navigation }) => {
  return (
    <SwipeContainer>
      <ContainerForContent>
        <PageWrapper navigation={navigation}>
          <Container navigation={navigation}>
            <Tabs navigation={navigation} />
          </Container>
        </PageWrapper>
      </ContainerForContent>
    </SwipeContainer>
  )
}

const PageWrapper = ({ navigation, children }) => {
  const { isLoading } = useStartupVideos()

  return (
    <PageContainer navigation={navigation} hideHeader noPadding isLoading={isLoading}>
      {children}
    </PageContainer>
  )
}

const ContainerForContent = styled.View`
  flex: 1;
`

const SwipeContainer = styled(GestureRecognizer)`
  flex: 1;
  width: 100%;
`
Feed.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default Feed
