import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useTutorials from 'hooks/useTutorials'
import { removeStartupChatNotification } from 'store/team/team.actions'
import { likeActivity, unlikeActivity } from 'store/feed/feed.actions'
import { addUserCoins, minusUserCoins, doIfLoginUser } from 'store/user/user.actions'
import { createStartupChat } from 'store/chat/chat.actions'
import {
  addNotificationLike,
  removeNotificationLike,
} from 'store/notification/notification.actions'
import { useUserId, useUserCoins } from 'store/user/user.uses'
import mixpanel from 'services/mixpanel'

let timer = null

export default ({ item, feedGroup, navigation }) => {
  const dispatch = useDispatch()
  const userId = useUserId()
  const userCoins = useUserCoins()

  const [isLikeModalVisible, setIsLikeModalVisible] = useState(false)
  const [isDislikeModalVisible, setIsDislikeModalVisible] = useState(false)
  const [isLikeTutorialShow, hideLikeTutorial] = useTutorials('like')

  const [isLike, setIsLike] = useState(item?.own_reactions?.like?.length)
  const [likeCounts, setLikeCounts] = useState(item.reaction_counts?.like)
  const [isCoinPressLoading, setIsCoinPressLoading] = useState(false)

  const [isUpPressIn, setIsUpPressIn] = useState(false)
  const [isDownPressIn, setIsDownPressIn] = useState(false)
  const [isCoinPress, setIsCoinPress] = useState(false)

  useEffect(() => {
    myLikes = item?.own_reactions?.like?.filter(item => item?.user_id === userId)
    setIsLike(myLikes?.length)
  }, [item?.own_reactions?.like?.length])

  useEffect(() => {
    setLikeCounts(item.reaction_counts?.like)
  }, [item.reaction_counts?.like])

  const onPress = () => {
    requestAnimationFrame(() => {
      dispatch(doIfLoginUser(onToggleLike))
    })
  }

  const onDoubleTap = () => {
    if (!isCoinPressLoading) {
      requestAnimationFrame(() => {
        isLike ? null : onLike(true)
      })
    }
  }

  const onToggleLike = () => {
    isLike ? onDislike() : onLike()
  }

  const isUserHasCoins = () => {
    return userId && userCoins > 0
  }

  const onLike = isDoubleTap => {
    // @TODO: need to update logic
    if (!item?.own_reactions) {
      return
    }

    if (isUserHasCoins()) {
      setIsLike(true)
      if (isLikeTutorialShow) {
        setIsLikeModalVisible(true)
      }

      setLikeCounts(likeCounts + 1)

      isDoubleTap ? setCoinsPress() : setGreenPress()

      setIsCoinPressLoading(true)
      dispatch(minusUserCoins(like))

      if (!item?.chatUrl) {
        dispatch(createStartupChat(item))
      }

      mixpanel.trackEvent('Like video')
    }
  }

  const like = () => {
    const paramsActivityId = navigation.state.params?.activity_id
    dispatch(likeActivity(item, feedGroup, paramsActivityId, setUnloading))
    dispatch(addNotificationLike(item?.teamId, item?.id, item?.video_url))
  }

  // Dislike active only the first five minutes from the moment of creation
  // or if like created before video is editing and if video was editing
  const isDislikeDisable = () => {
    const aFiveMinAgo = new Date(Date.now() - 1000 * 60 * 5)
    const likeCreateTime = new Date(item.own_reactions.like?.[0].created_at)
    const lastEditVideoTime = new Date(item.last_edit_video_date)

    const isPassFiveMinAfterCreation = aFiveMinAgo > likeCreateTime

    if (item.last_edit_video_date) {
      if (likeCreateTime <= lastEditVideoTime) {
        const a48hAgo = new Date(Date.now() - 1000 * 60 * 2880)
        return a48hAgo > lastEditVideoTime
      } else {
        return isPassFiveMinAfterCreation
      }
    }
    return isPassFiveMinAfterCreation
  }

  const onDislike = () => {
    if (isDislikeDisable() && item?.own_reactions?.like?.length === 1) {
      setIsDislikeModalVisible(true)
    } else {
      setIsLike(false)

      setLikeCounts(likeCounts - 1)
      setRedPress()

      setIsCoinPressLoading(true)
      dispatch(addUserCoins(unlike))
      removeStartupChatNotification(item?.teamId)

      mixpanel.trackEvent('Dislike video')
    }
  }

  const unlike = () => {
    const paramsActivityId = navigation.state.params?.activity_id
    const reactionId = item?.own_reactions?.like?.[0]?.id
    dispatch(unlikeActivity(item, reactionId, feedGroup, paramsActivityId, setUnloading))
    removeNotificationLike(item?.teamId, item?.id)
  }

  const setUnloading = () => {
    setIsCoinPressLoading(false)
  }

  const setGreenPress = () => {
    setIsUpPressIn(true)
    resetTimer(() => {
      setIsUpPressIn(false)
    })
  }

  const setCoinsPress = () => {
    setIsCoinPress(true)
    resetTimer(() => {
      setIsCoinPress(false)
    }, 500)
  }

  const setRedPress = () => {
    setIsDownPressIn(true)
    resetTimer(() => {
      setIsDownPressIn(false)
    })
  }

  const onLikeModalConfirm = () => {
    setIsLikeModalVisible(false)
    hideLikeTutorial()
  }

  const onDislikeModalConfirm = () => {
    setIsDislikeModalVisible(false)
  }

  return {
    isCoinPressLoading,
    isUpPressIn,
    isDownPressIn,
    isLikeModalVisible,
    isLikeTutorialShow,
    isDislikeModalVisible,
    isCoinPress,
    isLike,
    likeCounts,
    onLikeModalConfirm,
    onDislikeModalConfirm,
    onPress,
    onDoubleTap,
    coins: userCoins,
  }
}

const resetTimer = (callback, timout = 800) => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(callback, timout)
}
