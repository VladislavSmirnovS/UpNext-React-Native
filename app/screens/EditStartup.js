import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import ScrollScreen from 'components/MyVentures/ScrollScreen'
import useStartupVideos from 'hooks/useStartupVideos'
import { updateTeam } from 'store/team/team.actions'
import { setOverflowAnimation } from 'store/app/app.actions'
import { useUserIsMentor, useUserInitialized } from 'store/user/user.uses'
import useCurrentActivity from 'components/MyVentures/hooks/useCurrentActivity'
import useStreamio from 'components/Feed/hooks/useStreamio'
import styled from 'styled-components'
import LaunchTutorial from 'components/Tutorials/Launch'
import { useState } from 'react'
import Images from '../appearance/images'
import { useSelector } from 'react-redux'

const EditStartUp = ({ navigation }) => {
  const { isLoading } = useStartupVideos()
  const isUserInitialized = useUserInitialized()
  const userIsMentor = useUserIsMentor()
  const { streamIoToken } = useStreamio()
  const currentPage = useSelector(state => state.startup?.currentPage)

  if (isUserInitialized && userIsMentor) {
    return null
  }

  return (
    <PageContainer
      paddingTop
      navigation={navigation}
      withoutInteractions
      titleBack
      noPadding
      cancelCross
      hideTopHeader
      isLoading={isLoading || !streamIoToken}
      titleWithCross
      currentPage={currentPage}
    >
      <StartupContainer navigation={navigation} />
    </PageContainer>
  )
}

const StartupContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const [localActivity] = useCurrentActivity()
  const [visibleTutorialStartUp, setVisibleTutorialStartUp] = useState(false)

  const COUNT_LOGINS = 1
  const COUNT_LOGINS_VISIBLE = 3

  useEffect(() => {
    if (COUNT_LOGINS <= COUNT_LOGINS_VISIBLE) {
      setVisibleTutorialStartUp(true)
    }
  }, [COUNT_LOGINS, COUNT_LOGINS_VISIBLE])

  const hideTutorialStartUp = () => {
    setVisibleTutorialStartUp(false)
  }

  const onSave = ({ resTeam, isTeamNameChanged, callback }) => {
    dispatch(
      updateTeam({
        team: resTeam,
        activityTime: localActivity?.time,
        isTeamNameChanged,
        callback,
      }),
    )
  }

  const onShowSuccessAnimation = () => {
    dispatch(
      setOverflowAnimation({
        name: 'blueSuccess',
        timout: 1000,
      }),
    )
  }

  const checkAutoFeedHide = newTeam => {
    if (
      newTeam?.permissions?.lobby ||
      newTeam?.permissions?.mentors ||
      newTeam?.permissions?.investors
    ) {
      const permissions = {
        ...newTeam?.permissions,
        lobby: false,
        mentors: false,
        investors: false,
      }
      onSave({ resTeam: { ...newTeam, permissions } })
    }
  }

  return (
    <>
      {visibleTutorialStartUp ? (
        <LaunchTutorial
          videoUrl={Images.launchVideo}
          isVisible={visibleTutorialStartUp}
          onHide={hideTutorialStartUp}
        />
      ) : (
        <ScrollScreen
          navigation={navigation}
          onSave={onSave}
          localActivity={localActivity}
          onShowSuccessAnimation={onShowSuccessAnimation}
          checkAutoFeedHide={checkAutoFeedHide}
        />
      )}
    </>
  )
}

EditStartUp.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default EditStartUp
