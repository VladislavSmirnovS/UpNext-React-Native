import React from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import TopUserInfo from 'components/MyProfile/TopUserInfo'
import InvestmentsInfo from 'components/MyProfile/InvestmentsInfo'
import MyNetworkInfo from 'components/MyProfile/MyNetworkInfo'
import MyProfilePlaceholder from 'components/MyProfile/MyProfilePlaceholder'
import { useUser } from 'store/user/user.uses'
import { getLikedFeed, setLikedFeedPage } from 'store/feed/feed.actions'
import { useLikedFeed, useLikedFeedCount, useLikedFeedPagination } from 'store/feed/feed.uses'
import MentorProfile from 'screens/Profile/MentorProfile'
import MyGeneralProfile from 'screens/Profile/MyGeneralProfile'
import { openHomePage } from 'services/navigation'
import styled from 'styled-components'

const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const likedFeed = useLikedFeed()
  const likedCount = useLikedFeedCount()
  const likedFeedPagination = useLikedFeedPagination()

  if (user?.is_mentor) {
    return <MentorProfile navigation={navigation} />
  }

  if (!user) {
    return null
  }

  const getList = (page, callback) => {
    dispatch(getLikedFeed(page, likedFeedPagination.size, callback))
  }

  const setPage = page => {
    dispatch(setLikedFeedPage(page))
  }

  const onGoBack = () => {
    dispatch(openHomePage(navigation))
  }

  const renderPlaceholder = () => {
    return <MyProfilePlaceholder />
  }

  return (
    <ProfileScreen>
      <PageContainer
      title="Profile"
      titleBack
      hideTopHeader
      navigation={navigation}
      noPadding
      onGoBack={onGoBack}
      renderPlaceholder={renderPlaceholder}
    >
      <MyGeneralProfile navigation={navigation}/>
    </PageContainer>
    </ProfileScreen>
    
  )
}

const ProfileScreen = styled.View`
  flex: 1;
  backgroundColor: white;
  padding-top:10px;
`

export default MyProfile
