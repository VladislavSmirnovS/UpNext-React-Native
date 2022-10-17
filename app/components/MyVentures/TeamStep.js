import React from 'react'
import StepContainer from 'components/MyVentures/StepContainer'
import BigTitle from 'components/Startup/BigTitle'
import Padding from 'components/MyVentures/Padding'
import Team from 'components/MyVentures/Team/Team'
import Spacer from 'components/Page/Spacer'
import styled from 'styled-components'
import Colors from 'root/app/appearance/colors'

export default ({ navigation, currentStepInfo }) => {
  return (
    <StepContainer navigation={navigation} currentStepInfo={currentStepInfo}>
      <Padding>
        <BigTitle color={Colors.TEXT_BRIGHT_BLUE} title="Team" />
        <BoldSubTitle>Invite people to join your team</BoldSubTitle>
        <Spacer h={20} />
      </Padding>

      <Team navigation={navigation} />
    </StepContainer>
  )
}
const BoldSubTitle = styled.Text`
  font-size: 17px;
  letter-spacing: -0.41px;
  color: ${Colors.TEXT_DARK_PURPLE};
`
