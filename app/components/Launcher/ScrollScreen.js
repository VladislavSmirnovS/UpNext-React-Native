import React, { useState } from 'react'
import ScrollView from 'components/Control/ScrollView'
import StepContainer from 'components/MyVentures/StepContainer'
import StepsProgress from 'components/MyVentures/StepsProgress'
import LauncherType from 'components/Launcher/LauncherType'
import Padding from 'components/Launcher/Padding'
import Skills from 'components/Launcher/Skills'
import Video from 'components/Launcher/Video'
import MainInfo from 'components/Launcher/MainInfo'
import SocialLinks from 'components/Launcher/SocialLinks'
import Upload from 'components/Launcher/Upload'
import mixpanel from 'services/mixpanel'

const STEP_LAUNCHER_TYPE = 'step_launcher_type'
const STEP_SKILLS = 'step_skills'
const STEP_VIDEO = 'step_video'
const STEP_MAIN_INFO = 'step_main_info'
const STEP_LINKS = 'step_links'
const STEP_UPLOAD = 'step_upload'

const TABS = [
  { key: STEP_LAUNCHER_TYPE, title: 'Launcher Type' },
  { key: STEP_SKILLS, title: 'Launcher Skills' },
  { key: STEP_VIDEO, title: 'Launcher Video' },
  { key: STEP_MAIN_INFO, title: 'Launcher Main Info' },
  { key: STEP_LINKS, title: 'Launcher Social Links' },
  { key: STEP_UPLOAD, title: 'Launcher Upload' },
]

export default ({ navigation, item, onSave, onShowSuccessAnimation, onGoBackPress }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const onChangeCurrentStep = currentStep => {
    setCurrentStep(currentStep)
    mixpanelTrackMyVentureStep(currentStep)
  }

  const renderScene = ({ route }) => {
    const currentStepInfo = route

    const getScreen = () => {
      switch (currentStepInfo.key) {
        case STEP_LAUNCHER_TYPE:
          return <LauncherType item={item} onSave={onSave} />

        case STEP_SKILLS:
          return <Skills item={item} onSave={onSave} />

        case STEP_VIDEO:
          return <Video navigation={navigation} item={item} onSave={onSave} />

        case STEP_MAIN_INFO:
          return (
            <MainInfo item={item} onSave={onSave} onShowSuccessAnimation={onShowSuccessAnimation} />
          )

        case STEP_LINKS:
          return (
            <SocialLinks
              item={item}
              onSave={onSave}
              onShowSuccessAnimation={onShowSuccessAnimation}
            />
          )

        case STEP_UPLOAD:
          return (
            <Upload
              navigation={navigation}
              item={item}
              onSave={onSave}
              onShowSuccessAnimation={onShowSuccessAnimation}
              onGoBackPress={onGoBackPress}
            />
          )
      }
    }

    return (
      <StepContainer>
        <Padding>{getScreen()}</Padding>
      </StepContainer>
    )
  }

  return (
    <>
      <ScrollView
        currentStep={currentStep}
        setCurrentStep={onChangeCurrentStep}
        tabs={TABS}
        renderScene={renderScene}
      />
      <StepsProgress step={currentStep} stepsLength={TABS.length} />
    </>
  )
}

const getCurrentStepInfo = currentStep => {
  return TABS[currentStep]
}

const mixpanelTrackMyVentureStep = currentStep => {
  const currentStepInfo = getCurrentStepInfo(currentStep)
  mixpanel.trackEvent(`Card viewed - ${currentStepInfo.title}`)
}
