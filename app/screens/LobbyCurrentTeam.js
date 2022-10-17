import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import PageContainer from 'components/Page/PageContainer'
import Container from 'components/CurrentTeam/Container'
import ScrollWrapper from 'components/CurrentTeam/ScrollWrapper'
import Padder from 'components/CurrentTeam/Padder'
import TextButton from 'components/CurrentTeam/TextButton'
import Field from 'components/CurrentTeam/Field'
import LeftTitle from 'components/CurrentTeam/LeftTitle'
import LeftText from 'components/CurrentTeam/LeftText'
import Avatar from 'components/Common/Avatar'
import BigTitle from 'components/Startup/BigTitle'
import MoreStartups from 'components/Startup/MoreStartups'
import Spacer from 'components/Page/Spacer'
import Player from 'components/Video/Player'
import Team from 'components/MyDesk/Team'
import api from 'services/api'
import { getDate } from 'services/utils'
import { handleError } from 'services/logger'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import { useDispatch } from 'react-redux'
import { openCardVideosPage } from '../services/navigation'

export default ({ navigation }) => {
  const { teamId } = navigation.state.params

  const [localTeam, setLocalTeam] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    api
      .getTeam(teamId)
      .then(res => setLocalTeam(res.data))
      .catch(error => handleError(error))

    return () => setLocalTeam()
  }, [teamId])

  const onPressPlayVideo = () => {
    const url = localTeam?.pain_video
    const title = localTeam?.slogan
    if (url) {
      const params = {
        videos: [
          {
            url,
            title,
          },
        ],
      }
      dispatch(openCardVideosPage(navigation, params))
    }
  }

  return (
    <PageContainer
      navigation={navigation}
      hideTopHeader
      titleBack
      noPadding
      isLoading={!localTeam}
      blackArrow="black"
    >
      <Container>
        <StartUpDeck>
          <StartUpHeaderContainer>
            <Avatar uri={localTeam?.avatar} firsName={localTeam?.name} size={TEAM_AVATAR_SIZE} />
            <StartUpHeaderItems>
              <StartUpTitle>{localTeam?.name || DEFAULT_STARTUP_NAME}</StartUpTitle>
              <StartUpDescription>{localTeam?.slogan || ''}</StartUpDescription>
            </StartUpHeaderItems>
          </StartUpHeaderContainer>
          <StartUpTeamContainer>
            <StartUpTeamTitle>{TEAM}</StartUpTeamTitle>
            <StartUpTeamAvatars horizontal showsHorizontalScrollIndicator={false}>
              <Team navigation={navigation} members={localTeam?.new_team_members} />
            </StartUpTeamAvatars>
          </StartUpTeamContainer>
          <StartUpVideoContainer>
            {localTeam?.pain_video ? (
              <StartUpPlayerContainer>
                <Player
                  url={localTeam?.pain_video}
                  withPlayButton
                  onTogglePlay={onPressPlayVideo}
                />
              </StartUpPlayerContainer>
            ) : null}
          </StartUpVideoContainer>
          <StatsContainer>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.playStats} />
              <StatsTitle>Videos</StatsTitle>
              <StatsCount>1</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.viewStats} />
              <StatsTitle numberOfLines={1}>Total views</StatsTitle>
              <StatsCount>1250</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.coinsStats} />
              <StatsTitle>Up Coins</StatsTitle>
              <StatsCount>550</StatsCount>
            </StatsItem>
          </StatsContainer>
          <StartUpDescrContainer>
            <StartUpDescrItems>
              <StartUpDescrImage source={Images.theProblem} />
              <StartUpDescrTitle color="red">The problem</StartUpDescrTitle>
            </StartUpDescrItems>
            <StartUpDescrText>{localTeam?.pain}</StartUpDescrText>
          </StartUpDescrContainer>
          <StartUpDescrContainer>
            <StartUpDescrItems>
              <StartUpDescrImage source={Images.solution} />
              <StartUpDescrTitle color="blue">Solution</StartUpDescrTitle>
            </StartUpDescrItems>
            <StartUpDescrText>{localTeam?.solution}</StartUpDescrText>
          </StartUpDescrContainer>
          <StartUpDescrContainer>
            <StartUpDescrItems>
              <StartUpDescrImage source={Images.uniq} />
              <StartUpDescrTitle color="purple">Uniqeness</StartUpDescrTitle>
            </StartUpDescrItems>
            <StartUpDescrText>{localTeam?.secret}</StartUpDescrText>
          </StartUpDescrContainer>
        </StartUpDeck>
      </Container>
    </PageContainer>
  )
}

const TEAM_AVATAR_SIZE = 100
const MAX_HEIGHT = (16 / 9) * (200 - 30)
const DEFAULT_STARTUP_NAME = 'Startup Name'
const TEAM = 'Team'

const PlayerWrapper = styled.View`
  width: 100%;
  max-height: ${MAX_HEIGHT}px;
`
const StartUpDeck = styled.ScrollView``
const StartUpHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`
const StartUpHeaderItems = styled.View`
  margin-left: 30px;
  max-width: 200px;
`
const StartUpTitle = styled.Text`
  font-size: 26px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: bold;
`
const StartUpDescription = styled.Text`
  font-size: 16px;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const StartUpTeamContainer = styled.View``
const StartUpTeamTitle = styled.Text`
  font-size: 26px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: bold;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
`
const StartUpTeamAvatars = styled.ScrollView``

const StartUpVideoContainer = styled.View`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StartUpPlayerContainer = styled.TouchableOpacity`
  padding: 0 20px;
  width: 200px;
  height: ${MAX_HEIGHT}px;
  margin: 20px 0;
`

const StartUpStatsContainer = styled.View`
  margin: 0 40px;
  border-style: solid;
  border-top-color: ${Colors.TEXT_BRIGHT_BLUE};
  border-top-width: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5px;
  align-items: center;
`
const StartUpStatsVideo = styled.View`
  align-items: center;
`
const StartUpStatsViews = styled.View`
  align-items: center;
`
const StartUpStatsCoins = styled.View`
  align-items: center;
`
const StartUpStatsImage = styled.Image`
  margin-bottom: 8px;
`
const StartUpStatsTitle = styled.Text`
  font-size: 16px;
  color: ${Colors.TEXT_DARK_PURPLE};
  font-weight: 600;
  margin-bottom: 5px;
`
const StartUpStatsCount = styled.Text`
  font-size: 16px;
  color: ${Colors.TEXT_DARK_PURPLE};
  font-weight: 600;
`

const StartUpDescrContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`
const StartUpDescrItems = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`
const StartUpDescrImage = styled.Image``
const StartUpDescrTitle = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin-left: 20px;
  color: ${({ color }) =>
    color === 'red'
      ? '#f7005f'
      : color === 'blue'
      ? `${Colors.TEXT_BRIGHT_BLUE}`
      : color === 'purple'
      ? `${Colors.TEXT_DARK_PURPLE}`
      : 'black'};
`
const StartUpDescrText = styled.Text`
  padding: 0 40px;
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 18px;
`
const StatsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
 
  align-items: center;
  margin: 0 40px;
  padding: 20px 5px;
  align-items: center;
`
const StatsItem = styled.TouchableOpacity`
  align-items: center;
  width: 85px;
`
const StatsIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
`
const StatsTitle = styled.Text`
font-size: 16px;
color: ${Colors.TEXT_DARK_PURPLE};
font-weight: 500;
`
const StatsCount = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-weight: 700;
`
