import React from 'react'
import { useDispatch } from 'react-redux'
import CommonEventListModal from 'components/Stats/CommonEventListModal'
import { getInviteStatsViewEvent, setInviteViewEventsPage } from 'store/user/user.actions'
import {
  useInviteViewEvents,
  useInviteViewEventsCount,
  useInviteViewEventsPagination,
} from 'store/user/user.uses'

export default ({ isVisible, onClose, navigation, onStatsClose }) => {
  const dispatch = useDispatch()

  const data = useInviteViewEvents()
  const count = useInviteViewEventsCount()
  const pagination = useInviteViewEventsPagination()

  const getData = (page, callback) => {
    dispatch(getInviteStatsViewEvent(page, pagination.size, callback))
  }

  const setPage = page => {
    dispatch(setInviteViewEventsPage(page))
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
