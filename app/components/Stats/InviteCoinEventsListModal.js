import React from 'react'
import { useDispatch } from 'react-redux'
import CommonEventListModal from 'components/Stats/CommonEventListModal'
import { getInviteStatsCoinEvent, setInviteCoinEventsPage } from 'store/user/user.actions'
import {
  useInviteCoinEvents,
  useInviteCoinEventsCount,
  useInviteCoinEventsPagination,
} from 'store/user/user.uses'

export default ({ isVisible, onClose, navigation, onStatsClose }) => {
  const dispatch = useDispatch()

  const data = useInviteCoinEvents()
  const count = useInviteCoinEventsCount()
  const pagination = useInviteCoinEventsPagination()

  const getData = (page, callback) => {
    dispatch(getInviteStatsCoinEvent(page, pagination.size, callback))
  }

  const setPage = page => {
    dispatch(setInviteCoinEventsPage(page))
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
