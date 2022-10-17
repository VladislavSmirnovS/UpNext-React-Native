import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import StepContainer from 'components/MyVentures/StepContainer'
import Permissions from 'components/MyVentures/Permissions'
import Avatar from 'components/Common/Avatar'
import Carousel from 'components/Control/Carousel'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import Spacer from 'components/Page/Spacer'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import { useTeam } from 'store/team/team.uses'
import { useUser } from 'store/user/user.uses'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import { getTeamAvatarProps } from 'utils/team'
import { getUserAvatarProps } from 'utils/user'
import Colors from 'root/app/appearance/colors'

export default ({
  navigation,
  currentStepInfo,
  currentStep,
  stepIndex,
  localActivity,
  onSave,
  onShowSuccessAnimation,
}) => {
  const team = useTeam()
  const user = useUser()

  const renderItem = ({ item }) => {
    return (
      <UserAvatarLobbyBtn
        {...getUserAvatarProps(item)}
        size={AVATAR_SIZE}
        navigation={navigation}
      />
    )
  }

  return (
    <StepContainer navigation={navigation} currentStepInfo={currentStepInfo}>
      <Padding>
        <TitleTeam>
          <Avatar {...getTeamAvatarProps(team)} size={TEAM_AVATAR_SIZE} />
          <Spacer w={10} />
          <View>
            <StartupNameText>{team?.name || 'Startup Name'}</StartupNameText>
            <StartupDescrText>{team?.slogan || 'Startup description'}</StartupDescrText>
          </View>
        </TitleTeam>

        <Spacer h={10} />

        <Centered>
          <Wrapper>
            <FullScreenPlayer
              borderRadius="0"
              url={team?.pain_video}
              title={team?.pain}
              navigation={navigation}
            />

            <Permissions
              localActivity={localActivity}
              onSave={onSave}
              onShowSuccessAnimation={onShowSuccessAnimation}
              navigation={navigation}
            />
          </Wrapper>
        </Centered>
      </Padding>
    </StepContainer>
  )
}

const { width } = Dimensions.get('window')

const TEAM_AVATAR_SIZE = 100
const AVATAR_SIZE = 40

const Padding = styled.View`
  padding: ${Styles.PAGE_PADDING};
  flex: 1;
`
const TitleTeam = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const StartupNameText = styled(Texts.BoldTitleText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 28px;
`
const StartupDescrText = styled(Texts.TitleText)`
  color: ${Colors.TEXT_DARK_PURPLE};
`

const Centered = styled.View`
  flex: 1;
  align-items: center;
`

const Wrapper = styled.View`
  flex: 1;
  width: 70%;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`

const View = styled.View``
