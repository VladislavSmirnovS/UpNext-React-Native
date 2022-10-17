import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'components/Feed/Report/Modal'
import MarketingStats from 'components/Stats/MarketingStats'
import InviteViewEventsListModal from 'components/Stats/InviteViewEventsListModal'
import InviteCoinEventsListModal from 'components/Stats/InviteCoinEventsListModal'
import {
  setInviteCoinEvents,
  setInviteCoinEventsPage,
  setInviteViewEvents,
  setInviteViewEventsPage,
} from 'store/user/user.actions'
import api from 'services/api'
import { handleError } from 'services/logger'
import useModal from 'hooks/useModal'

export default ({ isVisible, onClose, navigation }) => {
  if (!isVisible) {
    return null
  }

  const dispatch = useDispatch()

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [isViewEventsVisible, onViewEventsShow, onViewEventsClose] = useModal()
  const [isCoinEventsVisible, onCoinEventsShow, onCoinEventsClose] = useModal()

  useEffect(() => {
    setIsLoading(true)
    api
      .getInviteStats()
      .then(res => {
        setData(res.data.result)
        setIsLoading(false)
      })
      .catch(error => handleError(error))
  }, [])

  const getLinkClickData = () => {
    return {
      label: 'Unique clicks',
      value: data?.views_count,
      onPress: data?.views_count ? onViewEventsShow : null,
    }
  }

  const getInvestData = () => {
    return {
      label: 'Extra Coins',
      value: data?.coins_count,
      onPress: data?.coins_count ? onCoinEventsShow : null,
    }
  }

  const handleClose = () => {
    dispatch(setInviteViewEventsPage(0))
    dispatch(setInviteViewEvents(null, 0))

    dispatch(setInviteCoinEventsPage(0))
    dispatch(setInviteCoinEvents(null, 0))

    onClose()
  }

  return (
    <>
      <Modal isVisible={isVisible} onClose={handleClose}>
        <MarketingStats
          key="invite"
          isLoading={isLoading}
          linkClickData={getLinkClickData()}
          investData={getInvestData()}
        />
      </Modal>
      <InviteViewEventsListModal
        isVisible={isViewEventsVisible}
        onClose={onViewEventsClose}
        navigation={navigation}
        onStatsClose={handleClose}
      />
      <InviteCoinEventsListModal
        isVisible={isCoinEventsVisible}
        onClose={onCoinEventsClose}
        navigation={navigation}
        onStatsClose={handleClose}
      />
    </>
  )
}