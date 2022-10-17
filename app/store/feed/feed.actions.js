import streamio from 'services/streamio'
import api from 'services/api'
import { setAppAlert } from 'store/app/app.actions'
import {
  setTeam,
  updateTeam,
  updateTeamInTeamOptions,
  saveTeamsOptions,
} from 'store/team/team.actions'
import { updateChatsWithAdd, removeChatsListItem } from 'store/chat/chat.actions'
import { updateTextHashtags } from 'store/startup/startup.actions'
import { getUserReportVideos } from 'store/user/user.actions'
import { handleError } from 'services/logger'
import { parseVideoUrl, onlyUnique } from 'services/utils'
import vimeo from 'services/vimeo'
import Config from 'root/config'
import { getUserId } from 'utils/user'

export const SET_FEED_SINGLE_ACTIVITY = 'SET_FEED_SINGLE_ACTIVITY'
export const SET_FEED_LIST = 'SET_FEED_LIST'
export const SET_FOLLOW_FEED_LIST = 'SET_FOLLOW_FEED_LIST'
export const SET_ME_FEED_LIST = 'SET_ME_FEED_LIST'
export const SET_FEED_PAGE = 'SET_FEED_PAGE'
export const SET_FOLLOW_FEED_PAGE = 'SET_FOLLOW_FEED_PAGE'
export const SET_ME_FEED_PAGE = 'SET_ME_FEED_PAGE'
export const SET_FEED_LOADING = 'SET_FEED_LOADING'
export const SET_FOLLOW_FEED_LOADING = 'SET_FOLLOW_FEED_LOADING'
export const SET_ME_FEED_LOADING = 'SET_ME_FEED_LOADING'
export const FEED_UPDATE_ACTIVITY_CHAT_URL = 'FEED_UPDATE_ACTIVITY_CHAT_URL'
export const FEED_UPDATE_ACTIVITY_FEED = 'FEED_UPDATE_ACTIVITY_FEED'
export const FEED_UPDATE_ACTIVITY_INVESTMENTS = 'FEED_UPDATE_ACTIVITY_INVESTMENTS'
export const FEED_UPDATE_ACTIVITY_MY = 'FEED_UPDATE_ACTIVITY_MY'
export const FEED_VIDEO_VIEW_EVENTS_SET_LIST = 'FEED_VIDEO_VIEW_EVENTS_SET_LIST'
export const FEED_VIDEO_VIEW_EVENTS_SET_PAGE = 'FEED_VIDEO_VIEW_EVENTS_SET_PAGE'
export const FEED_VIDEO_COIN_EVENTS_SET_LIST = 'FEED_VIDEO_COIN_EVENTS_SET_LIST'
export const FEED_VIDEO_COIN_EVENTS_SET_PAGE = 'FEED_VIDEO_COIN_EVENTS_SET_PAGE'
export const FEED_HASHTAGS_SET_LIST = 'FEED_HASHTAGS_SET_LIST'
export const FEED_HASHTAGS_SET_PAGE = 'FEED_HASHTAGS_SET_PAGE'
export const FEED_SET_HASHTAG_FILTER = 'FEED_SET_HASHTAG_FILTER'
export const FEED_UPDATE_FIRST_EXISTED_IDS = 'FEED_UPDATE_FIRST_EXISTED_IDS'
export const SET_LIKED_FEED_LIST = 'SET_LIKED_FEED_LIST'
export const SET_LIKED_FEED_PAGE = 'SET_LIKED_FEED_PAGE'
export const SET_USER_LIKED_FEED_LIST = 'SET_USER_LIKED_FEED_LIST'
export const SET_USER_LIKED_FEED_PAGE = 'SET_USER_LIKED_FEED_PAGE'
export const FEED_REMOVE_ACTIVITY = 'FEED_REMOVE_ACTIVITY'
export const FEED_REMOVE_ACTIVITY_INVESTMENTS = 'FEED_REMOVE_ACTIVITY_INVESTMENTS'
export const FEED_ADD_NEW_TO_QUEUE = 'FEED_ADD_NEW_TO_QUEUE'
export const FEED_REMOVE_FROM_QUEUE = 'FEED_REMOVE_FROM_QUEUE'
export const FEED_UPDATE_LIKED_FEED_LIST = 'FEED_UPDATE_LIKED_FEED_LIST'

export const updateFeedActivityInLikedList = activityId => async (dispatch, getState) => {
  try {
    const { likedFeedList, userLikedCount } = getState().feed
    if (likedFeedList?.length) {
      const isExistIndex = likedFeedList?.findIndex(item => item?.id === activityId)
      if (isExistIndex !== -1) {
        const updatedActivity = await getActvityById(activityId)
        const updatedLikedList = likedFeedList?.map(item =>
          item?.id === activityId ? updatedActivity : item,
        )
        dispatch(setLikedFeedList(updatedLikedList, userLikedCount))
      }
    }
  } catch (error) {
    handleError(error)
  }
}

export const disableTeamFromFeed = activity => (dispatch, getState) => {
  const { user } = getState().user
  const userId = getUserId(user)
  const usersDisable = activity.usersDisable
    ? [...activity.usersDisable, userId].filter(onlyUnique)
    : [userId]
  streamio
    .editActivityFields({
      activityId: activity?.id,
      usersDisable,
    })
    .then(() => {
      dispatch(_updateFeed('my_investments'))
      dispatch(_updateFeed('videos'))
    })
    .catch(error => handleError(error))
}

export const addToFaforite = (activity, callback) => (dispatch, getState) => {
  const { user } = getState().user
  const userId = getUserId(user)

  if (!activity.favorites?.includes(userId)) {
    const favorites = activity.favorites
      ? [...activity.favorites, userId].filter(onlyUnique)
      : [userId]

    streamio
      .editActivityFields({
        activityId: activity?.id,
        favorites,
      })
      .then(res => {
        dispatch(updateFeedActivityFeed(res.data))

        const { followFeedList } = getState().feed
        const index = followFeedList?.findIndex(item => item?.id === res?.data?.id)
        if (index !== -1) {
          dispatch(updateFeedActivityInvestments(res.data))
          callback && callback()
        } else {
          dispatch(_updateFeed('my_investments', callback))
        }
      })
      .catch(error => handleError(error))
  }
}

export const removeFromFaforite = activity => (dispatch, getState) => {
  const { user } = getState().user
  const userId = getUserId(user)

  if (activity.favorites?.includes(userId)) {
    const favorites = activity.favorites.filter(item => item !== userId).filter(onlyUnique)

    streamio
      .editActivityFields({
        activityId: activity?.id,
        favorites,
      })
      .then(res => {
        dispatch(updateFeedActivityFeed(res.data))
        dispatch(_updateFeed('my_investments'))
      })
      .catch(error => handleError(error))
  }
}

export const reportVideo = (item, report) => dispatch => {
  api
    .reportVideo(item?.teamId, report)
    .then(res => {
      dispatch(getUserReportVideos())
    })
    .catch(error => handleError(error))
}

export const endFeedVideo = feedItem => dispatch => {
  if (!Config.IS_DEBUG) {
    api
      .endFeedVideo(feedItem?.id, feedItem?.teamId, feedItem?.poster)
      .catch(error => handleError(error))
  }
}

export const viewFeedVideo = (feedItem, progress, duration) => (dispatch, getState) => {
  const { user } = getState().user

  const isMyTeamVideo = user?.teams?.length
    ? user?.teams?.map(item => item?.id).includes(feedItem?.teamId)
    : false

  if (!Config.IS_DEBUG && !isMyTeamVideo) {
    api
      .trackStopVideo(
        feedItem?.id,
        progress,
        duration,
        feedItem?.views_count,
        feedItem?.reaction_counts?.like,
        feedItem?.favorites?.length,
      )
      .catch(error => handleError(error))
  }
}

const getFirstNewFeed = async (userId, page, size) => {
  const res = await streamio.getFeed({
    feedType: 'common',
    feedId: 'videos',
    page,
    size,
    ranking: 'rank_without_popularity',
  })
  return res.results.filter(item => {
    const isProgress = item?.is_progress
    const isDisabledForThisUser = item?.usersDisable?.includes(userId)
    return !isDisabledForThisUser && !isProgress
  })
}

export const getActvityById = async activityId => {
  const activitiesRes = await api.getActivitiesByIds([activityId])
  return activitiesRes?.data?.results?.[0]
}

export const onAddNewToQueue = activityId => async (dispatch, getState) => {
  const { feedNewQueue, feedHashtagFilter, feedList } = getState().feed
  const { user } = getState().user

  try {
    let isNewForFeed = true
    let activity

    if (feedNewQueue?.length) {
      const index = feedNewQueue?.findIndex(id => id === activityId)
      isNewForFeed = index === -1
    }

    if (isNewForFeed && feedList?.length) {
      const index = feedList?.findIndex(item => item?.id === activityId)
      isNewForFeed = index === -1
    }

    if (isNewForFeed && feedHashtagFilter) {
      isNewForFeed = false
      // activity = await getActvityById(activityId)
      // isNewForFeed = activity?.hashtags?.includes(feedHashtagFilter)
    }

    if (isNewForFeed && user?.is_mentor && user?.min_coins_for_feed) {
      if (!activity) {
        activity = await getActvityById(activityId)
      }
      isNewForFeed = activity?.reaction_counts?.like >= user?.min_coins_for_feed
    }

    if (isNewForFeed) {
      dispatch(addNewToQueue(activityId))
    }
  } catch (error) {
    handleError(error)
  }
}

export const addNewToQueue = activityId => ({ type: FEED_ADD_NEW_TO_QUEUE, activityId })
export const removeFromNewQueue = ids => ({ type: FEED_REMOVE_FROM_QUEUE, ids })

const getFeedNewQueue = () => (dispatch, getState) => {
  const { feedNewQueue } = getState().feed
  const length = feedNewQueue.length
  const getingIds = feedNewQueue.slice(0, length >= 2 ? 2 : length)

  if (getingIds?.length) {
    dispatch(removeFromNewQueue(getingIds))
  }

  return getingIds
}

export const getFeed = (page, size, activityId, callback) => async (dispatch, getState) => {
  const { feedList, feedHashtagFilter, feedFirstEsixtedIds } = getState().feed
  const { user } = getState().user
  const userId = getUserId(user)
  const currentFeed = feedHashtagFilter || 'videos'

  try {
    let list = []
    let alreadyExistedIds = []

    if (!page && !activityId && !feedHashtagFilter && !user?.is_mentor) {
      const idsFromQueue = await dispatch(getFeedNewQueue())

      if (idsFromQueue?.length) {
        const activitiesRes = await api.getActivitiesByIds(idsFromQueue)
        const activitiesFromQueue = activitiesRes.data.results

        list = list.concat(activitiesFromQueue)
      }

      const countNeededMoreIds = 2 - idsFromQueue?.length
      if (countNeededMoreIds) {
        const activitiesFromLastRes = await getFirstNewFeed(userId, 0, countNeededMoreIds)
        let lastList = activitiesFromLastRes.filter(item => idsFromQueue.indexOf(item?.id) === -1)

        const countNeededMoreNewIds = countNeededMoreIds - lastList?.length
        if (countNeededMoreNewIds) {
          const additionalActivitiesFromLastRes = await getFirstNewFeed(
            userId,
            0,
            countNeededMoreNewIds,
          )
          lastList = additionalActivitiesFromLastRes.filter(
            item => idsFromQueue.indexOf(item?.id) === -1,
          )
        }

        list = list.concat(lastList)
      }

      alreadyExistedIds = list.map(item => item?.id)
      dispatch(setFeedFirstEsixtedIds(alreadyExistedIds))
    } else {
      alreadyExistedIds = feedFirstEsixtedIds
    }

    if (activityId || feedHashtagFilter) {
      alreadyExistedIds = []
      dispatch(setFeedFirstEsixtedIds([]))
    }

    const res = await streamio.getFeed({
      feedType: 'common',
      feedId: currentFeed,
      page,
      size,
      activityId,
      ranking: activityId ? null : user?.is_mentor ? 'rank_by_coins' : 'rank_by_popularity',
    })

    const filterRes = res.results
      .filter(item => {
        const isProgress = item?.is_progress
        const isDisabledForThisUser = item?.usersDisable?.includes(userId)
        const isMoreMinFeed =
          user?.is_mentor && user?.min_coins_for_feed
            ? item?.reaction_counts?.like >= user?.min_coins_for_feed
            : true
        return !isDisabledForThisUser && isMoreMinFeed
      })
      .filter(item => alreadyExistedIds.indexOf(item?.id) === -1)

    list = list?.length ? list.concat(filterRes) : filterRes

    dispatch(setFeedList(!page ? list : [...feedList, ...list], res.next))

    if (activityId && filterRes?.length && page === 0 && filterRes?.[0]?.id !== activityId) {
      dispatch(
        setAppAlert({
          text: 'This video has been hidden from users by its owner',
          okText: 'Got it',
          onConfirm: () => dispatch(resetFeed()),
        }),
      )
    }

    callback && callback()
  } catch (error) {
    handleError(error)
    dispatch(setFeedList(feedList ? feedList : []))
  }
}

export const getFollowFeed = (page, size, callback) => async (dispatch, getState) => {
  const { followFeedList } = getState().feed
  const { user } = getState().user
  const userId = getUserId(user)

  try {
    if (userId) {
      const res = await api.getUserFavorites(userId, page, size)
      const ids = res?.data?.result?.map(item => item.activity_id)

      let activities = []
      if (ids?.length) {
        const activitiesRes = await api.getActivitiesByIds(ids)
        activities = activitiesRes.data.results
      }

      dispatch(
        setFollowFeedList(!page ? activities : [...followFeedList, ...activities], res.data?.count),
      )
    } else {
      dispatch(setFollowFeedList([], 0))
    }

    callback && callback()
  } catch (error) {
    handleError(error)
  }
}

export const getLikedFeed = (page, size, callback) => async (dispatch, getState) => {
  try {
    const { likedFeedList } = getState().feed
    const { user } = getState().user
    const userId = getUserId(user)

    const res = userId ? await api.getUserLikes(userId, page, size) : {}
    const ids = res?.data?.result?.map(item => item.activity_id)

    let activities = []
    if (ids?.length) {
      const activitiesRes = await api.getActivitiesByIds(ids)
      activities = activitiesRes.data.results
    }

    dispatch(
      setLikedFeedList(!page ? activities : [...likedFeedList, ...activities], res.data?.count),
    )

    callback && callback(activities)
  } catch (error) {
    handleError(error)
  }
}

export const getUserLikedFeed = (userId, page, size, callback) => async (dispatch, getState) => {
  try {
    const { userLikedFeedList } = getState().feed

    const res = userId ? await api.getUserLikes(userId, page, size) : {}
    const ids = res?.data?.result?.map(item => item.activity_id)
    const activitiesRes = await api.getActivitiesByIds(ids)
    const activities = activitiesRes.data.results

    dispatch(
      setUserLikedFeedList(
        !page ? activities : [...(userLikedFeedList || []), ...(activities || [])],
        res.data?.count,
      ),
    )

    callback && callback()
  } catch (error) {
    handleError(error)
  }
}

export const getMeFeed = (page, size, callback) => (dispatch, getState) => {
  const { meFeedList } = getState().feed
  const { user } = getState().user
  const userId = getUserId(user)

  if (userId) {
    streamio
      .getFeed({ feedType: 'common', feedId: `user-${userId}`, page, size })
      .then(res => {
        dispatch(setMeFeedList(!page ? res.results : [...meFeedList, ...res.results], res.next))
        callback && callback(res)
      })
      .catch(error => {
        handleError(error)
        dispatch(setMeFeedList(meFeedList ? meFeedList : []))
      })
  } else {
    dispatch(setMeFeedList([]))
    callback && callback()
  }
}

export const updateFeed = (callback, activityId) => (dispatch, getState) => {
  const { feedPagination } = getState().feed
  const { page, size } = feedPagination
  dispatch(getFeed(0, (page + 1) * size, activityId, callback))
}

export const resetAllFeed = (callback, activityId) => dispatch => {
  dispatch(resetFeed(callback, activityId))
  dispatch(resetFollowFeed(callback))
  // dispatch(resetMeFeed(callback))
}

export const resetFeed = (callback, activityId) => (dispatch, getState) => {
  const { feedPagination } = getState().feed
  dispatch(setFeedPage(0))
  dispatch(setFeedFirstEsixtedIds([]))
  dispatch(getFeed(0, feedPagination.size, activityId, callback))
}

export const updateFollowFeed = callback => (dispatch, getState) => {
  const { followFeedPagination } = getState().feed
  const { page, size } = followFeedPagination
  dispatch(getFollowFeed(0, (page + 1) * size, callback))
}

export const resetFollowFeed = callback => (dispatch, getState) => {
  const { followFeedPagination } = getState().feed
  dispatch(setFollowFeedPage(0))
  dispatch(getFollowFeed(0, followFeedPagination.size, callback))
}

export const updateMeFeed = callback => (dispatch, getState) => {
  const { meFeedPagination } = getState().feed
  const { page, size } = meFeedPagination
  dispatch(getMeFeed(0, (page + 1) * size, callback))
}

// export const resetMeFeed = callback => (dispatch, getState) => {
//   const { meFeedPagination } = getState().feed
//   dispatch(setMeFeedPage(0))
//   dispatch(getMeFeed(0, meFeedPagination.size, callback))
// }

export const addProgressFeedVideo = (team, activityId, url, isEdit, callback) => {
  const { id } = parseVideoUrl(url)

  api
    .addProgressFeedVideo(team?.id, activityId, url, id, isEdit)
    .then(() => {
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const getFileData = (isVideoAttached, fileUrl) => {
  return new Promise((resolve, reject) => {
    if (!isVideoAttached) {
      resolve()
    } else {
      const { id } = parseVideoUrl(fileUrl)
      vimeo
        .getExternalUrl(id)
        .then(res => resolve(res))
        .catch(error => resolve())
    }
  })
}

export const addActivity = ({
  feedId,
  text,
  isVideoAttached,
  fileUrl,
  team,
  callback,
}) => dispatch => {
  streamio
    .addActivity({ feedId, text, isVideoAttached, fileUrl, team })
    .then(() => {
      dispatch(resetAllFeed())
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const editActivity = ({
  text = '',
  isVideoAttached,
  fileUrl,
  activityId,
  team,
  callback,
}) => dispatch => {
  getFileData(isVideoAttached, fileUrl)
    .then(res => {
      let vimeoData
      if (+res?.naturalSize?.height) {
        vimeoData = res
      }
      return streamio.editActivity({ text, isVideoAttached, fileUrl, activityId, team, vimeoData })
    })
    .then(() => {
      dispatch(setFeedList(null))
      dispatch(setMeFeedList(null))

      dispatch(resetAllFeed())
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const setVideoInProgress = (activityId, videoUrl) => (dispatch, getState) => {
  const { team } = getState().team
  addProgressFeedVideo(team, activityId, videoUrl, true, () => dispatch(resetAllFeed()))
  api.clearVideoHistoryAfterChange(team?.id)
}

export const returnAllCoinsFromActivity = (team, callback) => async dispatch => {
  try {
    await api.returnAllCoinsFromActivity(team?.id, team?.pain_video_feed_id)
    callback && callback()
  } catch (error) {
    handleError(error)
  }
}

export const setVideoPainFeedId = callback => (dispatch, getState) => {
  const { team } = getState().team

  streamio.getFeed({ feedType: 'common', feedId: team?.id, page: 0, size: 1 }).then(res => {
    const activity = res?.results?.[0]
    const id = activity?.id
    if (id) {
      addProgressFeedVideo(team, id, activity?.video_url)
      api
        .setVideoPainFeedId(team?.id, id)
        .then(res => {
          dispatch(setTeam(res.data))
          dispatch(updateTeamInTeamOptions(res.data))
        })
        .catch(error => handleError(error))

      dispatch(updateTeam({ team, activityTime: activity?.time, callback }))

      if (team?.hashtags?.length) {
        dispatch(updateTextHashtags(id, team?.hashtags))
      }
    }
  })
}

export const likeActivity = (activity, feedGroup, activityId, callback) => dispatch => {
  streamio
    .likeActivity(activity)
    .then(res => {
      const reactions = {
        ...activity?.reaction_counts,
        like: activity?.reaction_counts?.like ? activity?.reaction_counts?.like + 1 : 1,
      }
      const ownReactions = {
        ...activity?.own_reactions,
        like: activity?.own_reactions?.length ? [...activity?.own_reactions, res.data] : [res.data],
      }
      dispatch(
        updateFeedActivityInvestments({
          ...activity,
          own_reactions: ownReactions,
          reaction_counts: reactions,
        }),
      )
      dispatch(
        updateFeedActivityFeed({
          ...activity,
          own_reactions: ownReactions,
          reaction_counts: reactions,
        }),
      )
      dispatch(_updateFeed('my_investments'))

      dispatch(saveTeamsOptions([]))

      dispatch(
        updateChatsWithAdd('likedStartupsChats', {
          id: activity?.chatUrl,
          channelType: 'open',
          url: activity?.chatUrl,
          name: `${activity?.teamName} Updates`,
          coverUrl: activity?.teamImage,
        }),
      )

      dispatch(setLikedFeedPage(0))
      dispatch(setLikedFeedList(null, 0))

      callback && callback()
    })
    .catch(error => handleError(error))
}

export const addLike = activityId => (dispatch, getState) => {
  try {
    const { feedList, followFeedList } = getState().feed
    const activity =
      feedList?.find(item => (item.id = activityId)) ||
      followFeedList?.find(item => (item.id = activityId))

    if (activity) {
      const reactions = {
        ...activity?.reaction_counts,
        like: activity?.reaction_counts?.like ? activity?.reaction_counts?.like + 1 : 1,
      }

      const newActivity = {
        ...activity,
        reaction_counts: reactions,
      }

      dispatch(updateFeedActivityInvestments(newActivity))
      dispatch(updateFeedActivityFeed(newActivity))
      dispatch(updateLikedFeedList(newActivity))
    }
  } catch (error) {
    handleError(error)
  }
}

export const unlikeActivity = (
  activity,
  reactionId,
  feedGroup,
  activityId,
  callback,
) => dispatch => {
  streamio
    .unlikeActivity(reactionId, activity)
    .then(res => {
      const reactions = {
        ...activity?.reaction_counts,
        like: activity?.reaction_counts?.like > 1 ? activity?.reaction_counts?.like - 1 : 0,
      }
      const ownReactions = {
        ...activity?.own_reactions,
        like: activity?.own_reactions?.like?.filter(item => item.id !== reactionId),
      }
      dispatch(
        updateFeedActivityInvestments({
          ...activity,
          own_reactions: ownReactions,
          reaction_counts: reactions,
        }),
      )
      dispatch(
        updateFeedActivityFeed({
          ...activity,
          own_reactions: ownReactions,
          reaction_counts: reactions,
        }),
      )
      dispatch(_updateFeed('my_investments'))

      dispatch(saveTeamsOptions([]))

      dispatch(removeChatsListItem('likedStartupsChats', activity?.chatUrl))

      dispatch(setLikedFeedPage(0))
      dispatch(setLikedFeedList(null, 0))

      callback && callback()
    })
    .catch(error => handleError(error))
}

export const unlikeActivityForUser = (activity, reactionId, feedGroup, activityId, callback) => (
  dispatch,
  getState,
) => {
  const { user } = getState().user
  const userId = getUserId(user)

  streamio
    .unlikeActivityForUser(reactionId, userId)
    .then(res => {
      const reactions = {
        ...activity?.reaction_counts,
        like: activity?.reaction_counts?.like > 1 ? activity?.reaction_counts?.like - 1 : 0,
      }
      const ownReactions = {
        ...activity?.own_reactions,
        like: activity?.own_reactions?.like?.filter(item => item?.id !== reactionId),
      }
      dispatch(_updateFeed('my_investments'))
      dispatch(
        updateFeedActivityInvestments({
          ...activity,
          own_reactions: ownReactions,
          reaction_counts: reactions,
        }),
      )
      dispatch(
        updateFeedActivityFeed({
          ...activity,
          own_reactions: ownReactions,
          reaction_counts: reactions,
        }),
      )
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const _updateFeed = (feedGroup, callback, activityId) => dispatch => {
  const func = {
    videos: updateFeed,
    my_investments: updateFollowFeed,
    my_videos: updateMeFeed,
  }[feedGroup]
  dispatch(func(callback, activityId))
}

export const removeActivity = (teamId, activityId) => dispatch => {
  streamio
    .removeActivity(teamId, activityId)
    .then(() => {
      dispatch(resetAllFeed())
    })
    .catch(error => handleError(error))
}

export const setFeedList = (feedList, next) => ({ type: SET_FEED_LIST, feedList, next })

export const removeActivityFromFeed = activityId => ({ type: FEED_REMOVE_ACTIVITY, activityId })

export const removeActivityFromInvestments = activityId => ({
  type: FEED_REMOVE_ACTIVITY_INVESTMENTS,
  activityId,
})

export const setFollowFeedList = (list, count) => ({
  type: SET_FOLLOW_FEED_LIST,
  list,
  count,
})

export const setMeFeedList = (meFeedList, next) => ({ type: SET_ME_FEED_LIST, meFeedList, next })

export const setFeedPage = page => ({ type: SET_FEED_PAGE, page })

export const setLikedFeedPage = page => ({ type: SET_LIKED_FEED_PAGE, page })

export const setUserLikedFeedPage = page => ({ type: SET_USER_LIKED_FEED_PAGE, page })

export const setFollowFeedPage = page => ({ type: SET_FOLLOW_FEED_PAGE, page })

export const setMeFeedPage = page => ({ type: SET_ME_FEED_PAGE, page })

export const updateFeedActivityChatUrl = (activityId, chatUrl) => ({
  type: FEED_UPDATE_ACTIVITY_CHAT_URL,
  activityId,
  chatUrl,
})

export const updateFeedActivityFeed = activity => ({ type: FEED_UPDATE_ACTIVITY_FEED, activity })
export const updateFeedActivityInvestments = activity => ({
  type: FEED_UPDATE_ACTIVITY_INVESTMENTS,
  activity,
})
export const updateLikedFeedList = activity => ({
  type: FEED_UPDATE_LIKED_FEED_LIST,
  activity,
})

export const updateFeedActivityMy = activity => ({ type: FEED_UPDATE_ACTIVITY_MY, activity })

export const getFeedVideoStatsViewEvent = (page, size, videoUrl, callback) => (
  dispatch,
  getState,
) => {
  api
    .getFeedVideoStatsViewEvent(page, size, videoUrl)
    .then(res => {
      const { feedVideoViewEvents } = getState().feed
      dispatch(
        setFeedVideoViewEvents(
          !page ? res.data.result : [...feedVideoViewEvents, ...res.data.result],
          res.data?.count,
        ),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setFeedVideoViewEvents([], 0))
    })
}

export const setFeedVideoViewEvents = (list, count) => ({
  type: FEED_VIDEO_VIEW_EVENTS_SET_LIST,
  list,
  count,
})

export const setFeedVideoViewEventsPage = page => ({ type: FEED_VIDEO_VIEW_EVENTS_SET_PAGE, page })

export const getFeedVideoStatsCoinEvent = (page, size, videoUrl, callback) => (
  dispatch,
  getState,
) => {
  api
    .getFeedVideoStatsCoinEvent(page, size, videoUrl)
    .then(res => {
      const { feedVideoCoinEvents } = getState().feed
      dispatch(
        setFeedVideoCoinEvents(
          !page ? res.data.result : [...feedVideoCoinEvents, ...res.data.result],
          res.data?.count,
        ),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setFeedVideoCoinEvents([], 0))
    })
}

export const setFeedVideoCoinEvents = (list, count) => ({
  type: FEED_VIDEO_COIN_EVENTS_SET_LIST,
  list,
  count,
})

export const setFeedVideoCoinEventsPage = page => ({ type: FEED_VIDEO_COIN_EVENTS_SET_PAGE, page })

export const getFeedHashtags = (page, size, search, callback) => (dispatch, getState) => {
  const { feedHashtags } = getState().feed

  api
    .getTeamHashtags(page, size, search)
    .then(res => {
      const resType = typeof res.data.result
      const list =
        resType === 'object'
          ? Object.keys(res.data.result).map(key => res.data.result[key])
          : res.data.result

      dispatch(setFeedHashtagsList(!page ? list : feedHashtags.concat(list), res.data?.count))
      callback && callback()
    })
    .catch(error => {
      handleError(error)
    })
}

export const setFeedHashtagsList = (list, count) => ({
  type: FEED_HASHTAGS_SET_LIST,
  list,
  count,
})

export const setHashtagsPage = page => ({ type: FEED_HASHTAGS_SET_PAGE, page })

export const setHashtagFilter = hashtag => ({ type: FEED_SET_HASHTAG_FILTER, hashtag })

export const setFeedFirstEsixtedIds = feedFirstEsixtedIds => ({
  type: FEED_UPDATE_FIRST_EXISTED_IDS,
  feedFirstEsixtedIds,
})

export const setLikedFeedList = (list, count) => ({
  type: SET_LIKED_FEED_LIST,
  list,
  count,
})

export const setUserLikedFeedList = (list, count) => ({
  type: SET_USER_LIKED_FEED_LIST,
  list,
  count,
})
