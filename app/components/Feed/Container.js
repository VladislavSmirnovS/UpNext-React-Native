import React, { useEffect, useState } from 'react'
import StreamioContainer from 'components/Feed/StreamioContainer'
import LaunchTutorial from 'components/Tutorials/Launch'
import SwipeUpTutorial from 'components/Tutorials/SwipeUp'
import useFeedTutorials from 'components/Feed/hooks/useFeedTutorials'
import StartNavigate from './StartNavigate'
import { useUser } from 'root/app/store/user/user.uses'

export default ({ children, navigation }) => {
  const {
    isLaunchTutorialShow,
    isSwipeTutorialShow,
    hideLaunchTutorial,
    hideSwipeTutorial,
  } = useFeedTutorials()

  const [isStartNavigateShow, setIsStartNavigateShow] = useState(false)

  const isLogin = useUser()

  const OpenAppCount = 3
  useEffect(() => {
    if (OpenAppCount <= 3 && isLogin) {
      setIsStartNavigateShow(true)
    }
  }, [OpenAppCount])

  const focusListener = navigation.addListener('didFocus', () => {
    setIsStartNavigateShow(false)
  })

  useEffect(() => {
    return () => {
      focusListener.remove()
    }
  }, [])

  const hideStartNavigate = () => {
    setIsStartNavigateShow(false)
  }

  return (
    <>
      <LaunchTutorial isVisible={isLaunchTutorialShow} onHide={hideLaunchTutorial} />
      <SwipeUpTutorial
        isVisible={isSwipeTutorialShow}
        onHide={hideSwipeTutorial}
        onSwipeUp={hideSwipeTutorial}
      />
      {isLaunchTutorialShow ? null : isSwipeTutorialShow ? null : isStartNavigateShow ? (
        <StartNavigate navigation={navigation} hideStartNavigate={hideStartNavigate} />
      ) : (
        <StreamioContainer children={children} />
      )}
    </>
  )
}
