import React from 'react'
import { useDispatch } from 'react-redux'
import CommonEventListModal from 'components/Stats/CommonEventListModal'
import { getFeedVideoStatsViewEvent, setFeedVideoViewEventsPage } from 'store/feed/feed.actions'
import {
  useFeedVideoViewEvents,
  useFeedVideoViewEventsCount,
  useFeedVideoViewEventsPagination,
} from 'store/feed/feed.uses'

export default ({ isVisible, videoUrl, onClose, navigation, onStatsClose }) => {
  const dispatch = useDispatch()

  const data = useFeedVideoViewEvents()
  const count = useFeedVideoViewEventsCount()
  const pagination = useFeedVideoViewEventsPagination()

  const getData = (page, callback) => {
    dispatch(getFeedVideoStatsViewEvent(page, pagination.size, videoUrl, callback))
  }

  const setPage = page => {
    dispatch(setFeedVideoViewEventsPage(page))
  }

  return (
    <CommonEventListModal
      isVisible={isVisible}
      onClose={onClose}
      data={data}
      count={count}
      currentPage={pagination?.page}
      getData={getData}
      setPage={setPage}
      navigation={navigation}
      onStatsClose={onStatsClose}
    />
  )
}
