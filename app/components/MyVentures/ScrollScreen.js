import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ScrollView from 'components/Control/ScrollView'
import StepsProgress from 'components/MyVentures/StepsProgress'
import Header from 'components/MyVentures/Header'
import TeamStep from 'components/MyVentures/TeamStep'
import MainInfoStep from 'components/MyVentures/MainInfoStep'
import VideoPitchStep from 'components/MyVentures/VideoPitchStep'
import TeamCardStep from 'components/MyVentures/TeamCardStep'
import UploadProjectStep from 'components/MyVentures/UploadProjectStep'
import mixpanel from 'services/mixpanel'
import { useDispatch, useSelector } from "react-redux";
import {  setPageAddStartUp } from 'store/startup/startup.actions'

const STEP_CREATE_TEAM = 'step_create_team'
const STEP_MAIN_INFO = 'step_main_info'
const STEP_VIDEO_PITCH = 'step_video_pitch'
const STEP_TEAM_CARD = 'step_team_card'
const STEP_UPLOAD_PROJECT = 'step_upload_project'

// @TODO: after version 4.5.1 need to remove videos_ids, and change StartupVideos table
const TABS = [
  { key: STEP_CREATE_TEAM, title: 'Create a Team', videos_ids: [11] },
  {
    key: STEP_MAIN_INFO,
    title: 'The Problem, The Solution and Uniqueness',
    videos_ids: [1, 3, 17],
  },
  { key: STEP_VIDEO_PITCH, title: 'Create Video Pitch', videos_ids: [15, 10] },
  { key: STEP_TEAM_CARD, title: 'Team Card', videos_ids: [6, 7, 19] },
  { key: STEP_UPLOAD_PROJECT, title: 'Final: Upload Project', videos_ids: [100, 101] },
]

export default ({ navigation, ...props }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.startup?.currentPage);

  const [currentStep, setCurrentStep] = useState(0)

  const onChangeCurrentStep = currentStep => {
    setCurrentStep(currentStep)
    mixpanelTrackMyVentureStep(currentStep)
    dispatch(setPageAddStartUp(currentStep));
  }

  useEffect(() => {
    if (navigation.state.params?.currentStep || navigation.state.params?.currentStep === 0) {
      onChangeCurrentStep(navigation.state.params?.currentStep)
      dispatch(setPageAddStartUp(navigation.state.params?.currentStep));
    }
  }, [navigation.state.params])

  const renderScene = ({ route }) => {
    const currentStepInfo = route

    switch (currentStepInfo.key) {
      case STEP_CREATE_TEAM:
        return <TeamStep navigation={navigation} currentStepInfo={currentStepInfo} />

      case STEP_MAIN_INFO:
        return <MainInfoStep navigation={navigation} currentStepInfo={currentStepInfo} {...props} />

      case STEP_VIDEO_PITCH:
        return (
          <VideoPitchStep
            navigation={navigation}
            currentStepInfo={currentStepInfo}
            currentStep={currentStep}
            stepIndex={2}
            {...props}
          />
        )

      case STEP_TEAM_CARD:
        return <TeamCardStep navigation={navigation} currentStepInfo={currentStepInfo} {...props} />

      case STEP_UPLOAD_PROJECT:
        return (
          <UploadProjectStep
            navigation={navigation}
            currentStepInfo={currentStepInfo}
            currentStep={currentStep}
            stepIndex={4}
            {...props}
          />
        )
    }
  }

  return (
    <View>
      {/* <Header navigation={navigation} currentStepInfo={getCurrentStepInfo(currentStep)} /> */}
      <ScrollView
        currentStep={currentStep}
        setCurrentStep={onChangeCurrentStep}
        tabs={TABS}
        renderScene={renderScene}
      />
      <StepsProgress step={currentStep} stepsLength={TABS.length} currentPage={currentPage}/>
    </View>
  )
}

const getCurrentStepInfo = currentStep => {
  return TABS[currentStep]
}

const mixpanelTrackMyVentureStep = currentStep => {
  const currentStepInfo = getCurrentStepInfo(currentStep)
  mixpanel.trackEvent(`Card viewed - ${currentStepInfo.title}`)
}

const View = styled.View`
  flex: 1;
  width: 100%;
`
