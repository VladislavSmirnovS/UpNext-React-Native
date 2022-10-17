import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import TopInvestUserInfo from 'components/MyProfile/TopInvestUserInfo'
import InvestmentsInfo from 'components/MyProfile/InvestmentsInfo'
import MyNetworkInfo from 'components/MyProfile/MyNetworkInfo'
import MyProfilePlaceholder from 'components/MyProfile/MyProfilePlaceholder'
import {
  getUserLikedFeed,
  setUserLikedFeedList,
  setUserLikedFeedPage,
} from 'store/feed/feed.actions'
import {
  useUserLikedFeed,
  useUserLikedFeedCount,
  useUserLikedFeedPagination,
} from 'store/feed/feed.uses'
import api from 'services/api'
import { handleError } from 'services/logger'
import { getUserFullName } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const { user_id } = navigation.state.params

  const [member, setMember] = useState(null)

  useEffect(() => {
    api
      .getMember(user_id)
      .then(res => {
        setMember(res.data)
        setPage(0)
        dispatch(setUserLikedFeedList(null, 0))
      })
      .catch(error => handleError(error))
  }, [user_id])

  const userLikedFeed = useUserLikedFeed()
  const userLikedCount = useUserLikedFeedCount()
  const userLikedFeedPagination = useUserLikedFeedPagination()
  const [isUserLikedFeedLoading, setUserIsLikedFeedLoading] = useState(false)

  const getList = (page, callback) => {
    dispatch(getUserLikedFeed(user_id, page, userLikedFeedPagination.size, callback))
  }

  const setPage = page => {
    dispatch(setUserLikedFeedPage(page))
  }

  const getTitle = () => {
    return `${getUserFullName(member)}'s Investments`
  }

  const renderPlaceholder = () => {
    return <MyProfilePlaceholder />
  }

  return (
    <PageContainer
      hideTopHeader
      navigation={navigation}
      noPadding
      renderPlaceholder={renderPlaceholder}
    >
      <TopInvestUserInfo navigation={navigation} member={member} />
      <InvestmentsInfo
        title={getTitle()}
        navigation={navigation}
        data={userLikedFeed}
        getList={getList}
        isLoading={isUserLikedFeedLoading}
        setIsLoading={setUserIsLikedFeedLoading}
        pagination={userLikedFeedPagination}
        count={userLikedCount}
        setPage={setPage}
      />
      <MyNetworkInfo navigation={navigation} />
    </PageContainer>
  )
}
