import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FlatListData from 'components/Control/FlatListData'
import AlmostMineCard, { AlmostMineBottomElement } from 'components/MyProfile/AlmostMineCard'
import { getLikedFeed, setLikedFeedPage } from 'store/feed/feed.actions'
import { useUserId } from 'store/user/user.uses'
import { useLikedFeed, useLikedFeedCount, useLikedFeedPagination } from 'store/feed/feed.uses'
import Texts from 'appearance/texts'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useUserId()

  const likedFeed = useLikedFeed()
  const likedCount = useLikedFeedCount()
  const likedFeedPagination = useLikedFeedPagination()
  const [isLikedFeedLoading, setIsLikedFeedLoading] = useState(false)

  const getLiked = (page, callback) => {
    dispatch(getLikedFeed(page, likedFeedPagination.size, callback))
  }

  const setPage = page => {
    dispatch(setLikedFeedPage(page))
  }

  if (!userId) {
    return null
  }

  const renderItem = ({ item }) => {
    const renderBottomEl = () => {
      return <AlmostMineBottomElement item={item} />
    }

    return <AlmostMineCard item={item} navigation={navigation} renderBottomEl={renderBottomEl} />
  }

  return (
    <FlatListData
      isLoading={isLikedFeedLoading}
      setIsLoading={setIsLikedFeedLoading}
      data={likedFeed}
      getData={getLiked}
      pagination={likedFeedPagination}
      setPage={setPage}
      count={likedCount}
      ListEmptyComponent={renderPlaceholderText}
      renderItem={renderItem}
      noPadding
    />
  )
}

const renderPlaceholderText = () => {
  return (
    <Wrapper>
      <CenteredText>{'When you`ll invest a coin\r\nin a startup you`ll see it here'}</CenteredText>
    </Wrapper>
  )
}

const CenteredText = styled(Texts.TitleText)`
  text-align: center;
`

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
