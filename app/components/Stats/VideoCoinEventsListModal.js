import React from 'react'
import { useDispatch } from 'react-redux'
import CommonEventListModal from 'components/Stats/CommonEventListModal'
import { getFeedVideoStatsCoinEvent, setFeedVideoCoinEventsPage } from 'store/feed/feed.actions'
import {
  useFeedVideoCoinEvents,
  useFeedVideoCoinEventsCount,
  useFeedVideoCoinEventsPagination,
} from 'store/feed/feed.uses'

export default ({ isVisible, videoUrl, onClose, navigation, onStatsClose }) => {
  const dispatch = useDispatch()

  const data = useFeedVideoCoinEvents()
  const count = useFeedVideoCoinEventsCount()
  const pagination = useFeedVideoCoinEventsPagination()

  const getData = (page, callback) => {
    dispatch(getFeedVideoStatsCoinEvent(page, pagination.size, videoUrl, callback))
  }

  const setPage = page => {
    dispatch(setFeedVideoCoinEventsPage(page))
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
