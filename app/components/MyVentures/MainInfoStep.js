import React, { useState } from 'react'
import StepContainer from 'components/MyVentures/StepContainer'
import Padding from 'components/MyVentures/Padding'
import ColoredInputCard from 'components/MyVentures/ColoredInputCard'
import { useTeam } from 'store/team/team.uses'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ navigation, currentStepInfo, onSave, onShowSuccessAnimation }) => {
  const team = useTeam()

  const [currentSection, setCurrentSection] = useState('pain')

  const onHandleSave = (item, callback) => {
    onSave({
      resTeam: item,
      callback,
    })
  }

  return (
    <StepContainer navigation={navigation} currentStepInfo={currentStepInfo}>
      <Padding>
        <ColoredInputCard
          title="The Problem"
          titleColor="red"
          image={Images.theProblem}
          field="pain"
          onSave={onHandleSave}
          callback={onShowSuccessAnimation}
          placeholder="Tell us more about the problem..."
          maxCharactes={140}
          isOpenned={true}
          setCurrentSection={setCurrentSection}
          item={team}
        />
        <ColoredInputCard
          title="The Solution"
          titleColor="blue"
          image={Images.solution}
          field="solution"
          onSave={onHandleSave}
          callback={onShowSuccessAnimation}
          placeholder="Tell us more about the solution..."
          maxCharactes={140}
          isOpenned={true}
          setCurrentSection={setCurrentSection}
          item={team}
        />
        <ColoredInputCard
          title="Uniqueness"
          titleColor="purple"
          image={Images.uniq}
          field="secret"
          onSave={onHandleSave}
          callback={onShowSuccessAnimation}
          placeholder="Tell us more about the uniqueness..."
          maxCharactes={140}
          isOpenned={true}
          setCurrentSection={setCurrentSection}
          item={team}
        />
      </Padding>
    </StepContainer>
  )
}
