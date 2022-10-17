import React from 'react'
import { useDispatch } from 'react-redux'
import AvatarBtn from 'components/Common/AvatarBtn'
import { openHomePage } from 'services/navigation'
import { setFeedPage, getFeed, setFeedList } from 'store/feed/feed.actions'
import { useFeedPagination } from 'store/feed/feed.uses'

export default ({ navigation, item, size }) => {
  const dispatch = useDispatch()
  const feedPagination = useFeedPagination()

  const openCurrentActivity = () => {
    dispatch(setFeedList(null, 0))
    dispatch(setFeedPage(0))
    dispatch(getFeed(0, feedPagination.size, item?.id))

    setTimeout(() => {
      const params = { activity_id: item?.id }
      dispatch(openHomePage(navigation, params))
    }, 300)
  }

  return (
    <AvatarBtn
      uri={item?.teamImage}
      size={size || TEAM_AVATAR_SIZE}
      id={item?.teamId}
      firsName={item?.teamName}
      onPress={openCurrentActivity}
    />
  )
}

const TEAM_AVATAR_SIZE = 60
