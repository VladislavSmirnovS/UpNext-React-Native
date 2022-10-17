import { useState, useEffect, useMemo, useRef } from 'react'
import { AppState } from 'react-native'
import { useDispatch } from 'react-redux'
import { getFeed, setFeedPage } from 'store/feed/feed.actions'
import { useFeed, useFeedPagination } from 'store/feed/feed.uses'
import { doIfLoginUser, setBranchObject } from 'store/user/user.actions'
import { useBranchObj } from 'store/user/user.uses'

const LIMIT_WITHOUT_LOGIN = 50

export default navigation => {
  const listRef = useRef()

  const dispatch = useDispatch()
  const branchObj = useBranchObj()

  const feed = useFeed()
  const feedPagination = useFeedPagination()

  const [isCommonLoading, setIsCommonLoading] = useState(false)
  const [initialActivityId, setInitialActivityId] = useState()
  const [lastActivityId, setLastActivityId] = useState(initialActivityId)

  useEffect(() => {
    if (branchObj) {
      const { redirectPath, redirectParams } = branchObj
      if (redirectPath === 'Home' && redirectParams) {
        setInitialActivityId(redirectParams?.activity_id)
      }
    }
  }, [branchObj])

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange)
  //   return () => AppState.removeEventListener('change', _handleAppStateChange)
  // }, [])

  // const _handleAppStateChange = nextAppState => {
  //   if (nextAppState === 'active') {
  //     getFirstTime()
  //   }
  // }

  const getFirstTime = () => {
    dispatch(setFeedPage(0))
    getNewFeed(0, initialActivityId)
  }

  useEffect(() => {
    const isNoParamsForHomePage = !branchObj || branchObj?.redirectPath !== 'Home'
    if (initialActivityId || (!initialActivityId && isNoParamsForHomePage)) {
      getFirstTime()
    }
  }, [initialActivityId])

  useEffect(() => {
    if (!feed?.length && !initialActivityId) {
      onEndReached()
    }
  }, [feed])

  const getNewFeed = (page, activityId) => {
    showLoading()
    dispatch(getFeed(page, feedPagination.size, activityId, hideLoading))
  }

  const showLoading = () => {
    setIsCommonLoading(true)
  }

  const hideLoading = () => {
    setIsCommonLoading(false)
  }

  const onRefresh = () => {
    onChangePage(0)
    clearNavigationParams()
  }

  const onNewPress = () => {
    onRefresh()
    scrollToTop()
  }

  const scrollToTop = () => {
    listRef.current?.scrollToIndex({ index: 0, animated: true })
  }

  const clearNavigationParams = () => {
    if (initialActivityId) {
      dispatch(setBranchObject(null))
      setInitialActivityId(null)
      navigation.setParams({ activity_id: null })
      setLastActivityId(null)
    }
  }

  const onEndReached = () => {
    const isEnd = !feedPagination.next
    const nextPage = feedPagination.page + 1

    if (!isEnd && !isCommonLoading && !isLimit()) {
      if (!initialActivityId) {
        onChangePage(nextPage)
      } else {
        onNextWithActivityId(nextPage)
      }
    }
  }

  const isLimit = () => {
    const nextPage = feedPagination.page + 1
    const itemsCount = feedPagination.size * nextPage
    return itemsCount >= LIMIT_WITHOUT_LOGIN
  }

  const onNextWithActivityId = nextPage => {
    const currenLastActivityId = feed?.[feed?.length - 1]?.id
    if (currenLastActivityId && currenLastActivityId !== lastActivityId) {
      setLastActivityId(currenLastActivityId)
      onChangePage(nextPage, currenLastActivityId)
    }
  }

  const onChangePage = (page, activityId) => {
    getNewFeed(page, activityId)
    dispatch(setFeedPage(page))
  }

  const onManualEndReached = () => {
    if (isLimit()) {
      setIsCommonLoading(true)
      dispatch(doIfLoginUser())
    }
  }

  return {
    listRef,
    feed,
    isCommonLoading,
    onNewPress,
    onRefresh,
    onEndReached,
    onManualEndReached,
  }
}
