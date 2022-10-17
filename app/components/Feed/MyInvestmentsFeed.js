import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import VideoList from 'components/Feed/VideoList'
import EmptyFavoritesFeed from 'components/Feed/EmptyFavoritesFeed'
import { getFollowFeed, setFollowFeedPage } from 'store/feed/feed.actions'
import { useFollowFeed, useFollowFeedCount, useFollowFeedPagination } from 'store/feed/feed.uses'
import { useUserIsMentor, useUserInitialized } from 'store/user/user.uses'

export default ({ navigation, isPlayRule }) => {
  const dispatch = useDispatch()

  const userIsMentor = useUserIsMentor()
  const isUserInitialized = useUserInitialized()

  const feed = useFollowFeed()
  const feedCount = useFollowFeedCount()
  const feedPagination = useFollowFeedPagination()
  const [isCommonLoading, setIsCommonLoading] = useState(false)

  useEffect(() => {
    if (!feed) {
      getNewFeed(0)
    }
  }, [])

  const getNewFeed = page => {
    setIsCommonLoading(true)
    dispatch(
      getFollowFeed(page, feedPagination.size, () => {
        setIsCommonLoading(false)
      }),
    )
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onEndReached = () => {
    if (!isEnd() && !isCommonLoading) {
      onChangePage(feedPagination.page + 1)
    }
  }

  const isEnd = () => {
    return feed ? feedCount === feed.length : true
  }

  const onChangePage = page => {
    getNewFeed(page)
    dispatch(setFollowFeedPage(page))
  }

  const getEmptyFeed = () => {
    if (isUserInitialized && userIsMentor) {
      return EmptyFavoritesFeed
    }
  }

  return (
    <VideoList
      feedId="videos"
      feedGroup="my_investments"
      data={feed}
      navigation={navigation}
      isLoading={isCommonLoading}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      isPlayRule={isPlayRule}
      ListEmptyComponent={getEmptyFeed()}
    />
  )
}
