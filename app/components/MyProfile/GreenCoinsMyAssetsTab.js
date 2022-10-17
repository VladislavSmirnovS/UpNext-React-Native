import React from 'react'
import styled from 'styled-components'
import FlatListData from 'components/Control/FlatListData'
import AlmostMineCard, { MyAssetsBottomElement } from 'components/MyProfile/AlmostMineCard'
import { useUserId } from 'store/user/user.uses'
import Texts from 'appearance/texts'
import testUsers from 'services/testUsers'

export default ({ navigation }) => {
  const userId = useUserId()

  if (!userId) {
    return null
  }

  if (testUsers.includes(userId)) {
    return <DemoDataList navigation={navigation} />
  }

  return renderPlaceholderText()
}

const DEMO_DATA = [
  {
    id: '16a112b0-c163-11eb-8080-80005d5528b0',
    video_url: 'https://vimeo.com/556884263/4181e26627',
    teamImage: 'https://s3.amazonaws.com/prod.upnext/avatars/avatar_60b3c70e04ae2%20.%20png',
    teamName: 'Demo startup',
    balance: 0.01,
  },
  {
    id: '16a112b0-c163-11eb-8080-80005d5528b0',
    video_url: 'https://vimeo.com/556884263/4181e26627',
    teamImage: 'https://s3.amazonaws.com/prod.upnext/avatars/avatar_60b3c70e04ae2%20.%20png',
    teamName: 'Demo startup',
    balance: 1,
  },
  {
    id: '16a112b0-c163-11eb-8080-80005d5528b0',
    video_url: 'https://vimeo.com/556884263/4181e26627',
    teamImage: 'https://s3.amazonaws.com/prod.upnext/avatars/avatar_60b3c70e04ae2%20.%20png',
    teamName: 'Demo startup',
    balance: 55,
  },
]

const DemoDataList = ({ navigation }) => {
  const renderItem = ({ item }) => {
    const renderBottomEl = () => {
      return <MyAssetsBottomElement item={item} />
    }

    return <AlmostMineCard item={item} navigation={navigation} renderBottomEl={renderBottomEl} />
  }

  return (
    <FlatListData
      isLoading={false}
      setIsLoading={() => {}}
      data={DEMO_DATA}
      getData={() => {}}
      pagination={{}}
      setPage={() => {}}
      count={DEMO_DATA?.length}
      ListEmptyComponent={renderPlaceholderText}
      renderItem={renderItem}
      noPadding
    />
  )
}

const renderPlaceholderText = () => {
  return (
    <Wrapper>
      <CenteredText>{'It looks like you don`t own any\r\nNFT yet'}</CenteredText>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const CenteredText = styled(Texts.GreyTitleText)`
  text-align: center;
`
