import React, { useState } from 'react'
import styled from 'styled-components'
import AnimationTab from 'components/Control/AnimationTab'
import Personal from 'components/MentorProfile/Personal'
import Professional from 'components/MentorProfile/Professional'
import Images from 'appearance/images'
import { useUser } from 'store/user/user.uses'

const DEFAULT_ACTIVE_TAB = 0

const MENTOR_PERSONAL = 'mentor_personal'
const MENTOR_PROFESSIONAL = 'mentor_professional'

const TABS = [
  { key: MENTOR_PERSONAL, title: 'Personal' },
  { key: MENTOR_PROFESSIONAL, title: 'Professional' },
]

export default ({ navigation }) => {
  const user = useUser()

  const [currentTab, setCurrentTab] = useState(DEFAULT_ACTIVE_TAB)

  const renderScene = ({ route }) => {
    switch (route.key) {
      case MENTOR_PERSONAL:
        return <Personal navigation={navigation} />

      case MENTOR_PROFESSIONAL:
        return <Professional navigation={navigation} />
    }
  }

  const renderIcon = ({ route }) => {
    let isComplete

    if (route.key === MENTOR_PERSONAL) {
      isComplete = user?.isBasicProfileCompleted
    }
    if (route.key === MENTOR_PROFESSIONAL) {
      isComplete = user?.isMentorProfileCompleted
    }

    return (
      <TabImage source={isComplete ? Images.complete : Images.notComplete} resizeMode="contain" />
    )
  }

  return (
    <AnimationTab
      tabs={TABS}
      activeTab={currentTab}
      setCurrentStep={setCurrentTab}
      renderScene={renderScene}
      tabStyle={TAB_STYLE}
      renderIcon={renderIcon}
    />
  )
}

const TAB_IMAGE_SIZE = 20
const TAB_STYLE = { padding: 0, flexDirection: 'row' }

const TabImage = styled.Image`
  width: ${TAB_IMAGE_SIZE}px;
  height: ${TAB_IMAGE_SIZE}px;
`
