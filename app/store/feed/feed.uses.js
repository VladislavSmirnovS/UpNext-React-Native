import { useSelector } from 'react-redux'

export const useFeedNewQueueLength = () => useSelector(state => state.feed?.feedNewQueue?.length)
export const useFeed = () => useSelector(state => state.feed?.feedList)
export const useIsFeedExist = () => useSelector(state => !!state.feed?.feedList)
export const useFeedPagination = () => useSelector(state => state.feed?.feedPagination)

export const useFollowFeed = () => useSelector(state => state.feed?.followFeedList)
export const useFollowFeedCount = () => useSelector(state => state.feed?.followFeedCount)
export const useFollowFeedPagination = () => useSelector(state => state.feed?.followFeedPagination)

export const useMeFeed = () => useSelector(state => state.feed?.meFeedList)
export const useMeFeedPagination = () => useSelector(state => state.feed?.meFeedPagination)

export const useFeedVideoViewEvents = () => useSelector(state => state.feed?.feedVideoViewEvents)
export const useFeedVideoViewEventsCount = () =>
  useSelector(state => state.feed?.feedVideoViewEventsCount)
export const useFeedVideoViewEventsPagination = () =>
  useSelector(state => state.feed?.feedVideoViewEventsPagination)

export const useFeedVideoCoinEvents = () => useSelector(state => state.feed?.feedVideoCoinEvents)
export const useFeedVideoCoinEventsCount = () =>
  useSelector(state => state.feed?.feedVideoCoinEventsCount)
export const useFeedVideoCoinEventsPagination = () =>
  useSelector(state => state.feed?.feedVideoCoinEventsPagination)

export const useFeedHashtags = () => useSelector(state => state.feed?.feedHashtags)
export const useFeedHashtagsCount = () => useSelector(state => state.feed?.feedHashtagsCount)
export const useFeedHashtagsPagination = () =>
  useSelector(state => state.feed?.feedHashtagsPagination)
export const useHashtagFilter = () => useSelector(state => state.feed?.feedHashtagFilter)

export const useLikedFeed = () => useSelector(state => state.feed?.likedFeedList)
export const useLikedFeedCount = () => useSelector(state => state.feed?.likedCount)
export const useLikedFeedPagination = () => useSelector(state => state.feed?.likedFeedPagination)

export const useUserLikedFeed = () => useSelector(state => state.feed?.userLikedFeedList)
export const useUserLikedFeedCount = () => useSelector(state => state.feed?.userLikedCount)
export const useUserLikedFeedPagination = () =>
  useSelector(state => state.feed?.userLikedFeedPagination)
