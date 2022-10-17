import React from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import { TopPlaceholder } from 'components/MyProfile/MyProfilePlaceholder'
import WalletValue from 'components/MyProfile/WalletValue'
import { useUserId, useUserIsMentor } from 'store/user/user.uses'
import MentorProfile from 'screens/Profile/MentorProfile'
import styled from 'styled-components'
import InvestmentsInfo from 'components/MyProfile/InvestmentsInfo'
import MyNetworkInfo from 'components/MyProfile/MyNetworkInfo'
import { getLikedFeed, setLikedFeedPage } from 'store/feed/feed.actions'
import { openHomePage } from 'services/navigation'
import { useLikedFeed, useLikedFeedCount, useLikedFeedPagination } from 'store/feed/feed.uses'
import Spacer from 'components/Page/Spacer'

const Wallet = ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useUserId()
  const userIsMentor = useUserIsMentor()

  const likedFeed = useLikedFeed()
  const likedCount = useLikedFeedCount()
  const likedFeedPagination = useLikedFeedPagination()

  if (!userId) {
    return null
  }

  if (userIsMentor) {
    return <MentorProfile navigation={navigation} />
  }

  const getList = (page, callback) => {
    dispatch(getLikedFeed(page, likedFeedPagination.size, callback))
  }

  const setPage = page => {
    dispatch(setLikedFeedPage(page))
  }

  const renderPlaceholder = () => {
    return <TopPlaceholder />
  }

  const onGoBack = () => {
    dispatch(openHomePage(navigation))
  }

  return (
    <WalletScreen>
      <PageContainer
        title="Wallet"
        hideTopHeader
        titleBack
        onGoBack={onGoBack}
        navigation={navigation}
        noPadding
        renderPlaceholder={renderPlaceholder}
      >
        <WalletValue navigation={navigation} />
        <Spacer h={10} />
        <InvestmentsInfo
          title="My Investments"
          navigation={navigation}
          data={likedFeed}
          getList={getList}
          pagination={likedFeedPagination}
          count={likedCount}
          setPage={setPage}
          withEmpty
        />
        <MyNetworkInfo navigation={navigation} />
      </PageContainer>
    </WalletScreen>
  )
}


const WalletScreen = styled.View`
  flex: 1;
  backgroundColor: white;
  padding-top:10px;
`

export default Wallet