import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'components/Feed/Report/Modal'
import MarketingStats from 'components/Stats/MarketingStats'
import VideoStats from 'components/Stats/VideoStats'
import VideoViewEventsListModal from 'components/Stats/VideoViewEventsListModal'
import VideoCoinEventsListModal from 'components/Stats/VideoCoinEventsListModal'
import api from 'services/api'
import { saveVideoProgress } from 'store/app/app.actions'
import { useSavedVideoProgress } from 'store/app/app.uses'
import { handleError } from 'services/logger'
import useModal from 'hooks/useModal'
import Spacer from 'components/Page/Spacer'

export default ({ isVisible, item, onClose, navigation }) => {
  if (!isVisible) {
    return null
  }

  const dispatch = useDispatch()
  const savedVideoProgress = useSavedVideoProgress()

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const [isViewEventsVisible, onViewEventsShow, onViewEventsClose] = useModal()
  const [isCoinEventsVisible, onCoinEventsShow, onCoinEventsClose] = useModal()

  useEffect(() => {
    if (item?.video_url) {
      setIsLoading(true)
      api
        .getVideoUrlStats(item?.video_url, item?.id)
        .then(res => {
          setData(res.data.result)
          setIsLoading(false)
        })
        .catch(error => handleError(error))
    }
  }, [item?.video_url])

  const getLinkClickData = () => {
    return {
      label: 'unique\r\nlinks clicks',
      value: data?.views_count,
      onPress: data?.views_count ? onViewEventsShow : null,
    }
  }

  const getInvestData = () => {
    return {
      label: 'invested\r\nfrom link ',
      value: data?.coins_count,
      onPress: data?.coins_count ? onCoinEventsShow : null,
    }
  }

  const getProgress = () => {
    const progress =
      savedVideoProgress && savedVideoProgress?.url === item?.video_url
        ? savedVideoProgress.progress
        : 0
    return progress
  }

  const handleClose = () => {
    requestAnimationFrame(() => {
      dispatch(saveVideoProgress(null))
    })

    onClose()
  }

  return (
    <>
      <Modal isVisible={isVisible} onClose={handleClose}>
        <VideoStats
          key="video"
          activityId={item?.id}
          coins={item?.reaction_counts?.like}
          progress={getProgress()}
        />
        <Spacer h={50} />
        <MarketingStats
          key="video_marketing"
          isLoading={isLoading}
          linkClickData={getLinkClickData()}
          investData={getInvestData()}
        />
        <Spacer h={70} />
      </Modal>

      <VideoViewEventsListModal
        isVisible={isViewEventsVisible}
        onClose={onViewEventsClose}
        videoUrl={item?.video_url}
        navigation={navigation}
        onStatsClose={handleClose}
      />
      <VideoCoinEventsListModal
        isVisible={isCoinEventsVisible}
        onClose={onCoinEventsClose}
        videoUrl={item?.video_url}
        navigation={navigation}
        onStatsClose={handleClose}
      />
    </>
  )
}

