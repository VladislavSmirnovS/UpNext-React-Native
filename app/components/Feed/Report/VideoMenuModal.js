import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'components/Feed/Report/Modal'
import FirstScreen from 'components/Feed/Report/FirstScreen'
import ReportScreen from 'components/Feed/Report/ReportScreen'
import ThanksScreen from 'components/Feed/Report/ReportThanksScreen'
import DoubleScreen from 'components/Feed/Report/ReportDoubleScreen'
import useUserReportVideos from 'components/Feed/hooks/useUserReportVideos'
import { setOverflowAnimation } from 'store/app/app.actions'
import { doIfLoginUser } from 'store/user/user.actions'
import {
  reportVideo,
  disableTeamFromFeed,
  addToFaforite,
  removeFromFaforite,
} from 'store/feed/feed.actions'

export default ({ isVisible, item, onClose, navigation, isCompleted, openProfileErrorModal }) => {
  const dispatch = useDispatch()

  const { isReportNotAvailable, isMarAvailable } = useUserReportVideos()

  const [currentScreen, setCurrentScreen] = useState(0)

  const openReportScreen = () => {
    setCurrentScreen('report')
  }

  const openThanksScreen = () => {
    setCurrentScreen('thanks')
  }

  const openReportDoubleScreen = () => {
    setCurrentScreen('double')
  }

  const onReport = option => {
    openThanksScreen()
    dispatch(reportVideo(item, option))
  }

  const close = () => {
    setCurrentScreen(0)
    onClose()
  }

  const doIfLogin = callback => {
    dispatch(doIfLoginUser(callback))
  }

  const onReportPress = () => {
    doIfLogin(handleReportPress)
  }

  const handleReportPress = () => {
    if (!isCompleted) {
      close()
      openProfileErrorModal()
    } else if (isReportNotAvailable(item)) {
      openReportDoubleScreen()
    } else {
      openReportScreen()
    }
  }

  const onTeamBlockPress = () => {
    close()
    dispatch(disableTeamFromFeed(item))
  }

  const onFavoritPress = () => {
    doIfLogin(() => {
      close()
      dispatch(addToFaforite(item, showFavoriteDoneAnimation))
    })
  }

  const showFavoriteDoneAnimation = () => {
    dispatch(
      setOverflowAnimation({
        name: 'mark',
        timout: 1500,
      }),
    )
  }

  const onRemoveFavoritPress = () => {
    doIfLogin(() => {
      close()
      dispatch(removeFromFaforite(item))
    })
  }

  const renderCurrentScreen = () => {
    return {
      0: (
        <FirstScreen
          onReportPress={onReportPress}
          onFavoritPress={onFavoritPress}
          onRemoveFavoritPress={onRemoveFavoritPress}
          isMarAvailable={isMarAvailable(item)}
        />
      ),
      report: <ReportScreen onPress={onReport} />,
      thanks: <ThanksScreen item={item} onBlock={onTeamBlockPress} />,
      double: <DoubleScreen item={item} onBlock={onTeamBlockPress} />,
    }[currentScreen]
  }

  return (
    <Modal isVisible={isVisible} onClose={close}>
      {renderCurrentScreen()}
    </Modal>
  )
}
