import React from 'react'
import StepContainer from 'components/MyVentures/StepContainer'
import BigTitle from 'components/Startup/BigTitle'
import Padding from 'components/MyVentures/Padding'
import Spacer from 'components/Page/Spacer'
import Logo from 'components/MyVentures/Logo'
import BlueCard from 'components/MyProfile/BlueCard'
import Input from 'components/MyVentures/Input'
import Hashtags from 'components/MyVentures/Hashtags'
import SeparateLine from 'components/Control/SeparateLine'
import { useTeam } from 'store/team/team.uses'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default ({ navigation, currentStepInfo, localActivity, onSave, onShowSuccessAnimation }) => {
  return (
    <StepContainer navigation={navigation} currentStepInfo={currentStepInfo}>
      <Logo />
      <EditInput
        field="name"
        placeholder="Startup Name"
        onSave={onSave}
        callback={onShowSuccessAnimation}
        textSizes={Texts.sizes.HeaderSize}
        maxCharactes={30}
        isBold
        color={Colors.TEXT_BRIGHT_BLUE}
      />
      <EditInput
        field="slogan"
        placeholder="Startup description"
        onSave={onSave}
        callback={onShowSuccessAnimation}
        maxCharactes={40}
        textSizes={Texts.sizes.SubtitleSize}
        color={Colors.TEXT_DARK_PURPLE}
        isBold
      />

      <SeparateLine borderColored borderWide />

      <Hashtags localActivity={localActivity} onSave={onSave} />
    </StepContainer>
  )
}

const EditInput = ({
  color,
  field,
  onSave,
  placeholder,
  maxCharactes,
  callback,
  textSizes,
  isBold,
}) => {
  const team = useTeam()

  const handleSave = newValue => {
    if (newValue !== team?.[field]) {
      onSave({
        resTeam: { ...team, [field]: newValue },
        callback,
        isTeamNameChanged: true,
      })
    }
  }

  return (
    <Input
      value={team?.[field]}
      onSave={handleSave}
      placeholder={placeholder}
      placeholderTextColor={color || Colors.TEXT_DARK_BLUE}
      color={color || Colors.TEXT_DARK_BLUE}
      maxCharactes={maxCharactes}
      textAlign="center"
      textSizes={textSizes}
      isBold={isBold}
    />
  )
}
