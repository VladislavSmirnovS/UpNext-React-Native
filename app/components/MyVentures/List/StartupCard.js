import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import BlueCard from 'components/MyProfile/BlueCard'
import Avatar from 'components/Common/Avatar'
import Carousel from 'components/Control/Carousel'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import { getTeam } from 'store/team/team.actions'
import { useUser } from 'store/user/user.uses'
import { useTeamId } from 'store/team/team.uses'
import useTeamActivity from 'components/MyVentures/hooks/useTeamActivity'
import { openEditPage, openEditStartupPage, openVideoGalleryPage } from 'services/navigation'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import { getTeamAvatarProps } from 'utils/team'
import { getUserAvatarProps } from 'utils/user'
import Colors from 'root/app/appearance/colors'
import { EMPTY_COUNT } from 'root/app/constants'
import ModalStepOne from 'components/Control/DeleteModalStepOne'
import ModalStepTwo from 'components/Control/DeleteModalStepTwo'
import ModalStepFinish from 'components/Control/DeleteModalFinish'

export default ({ team, navigation, onOpenStatsPress }) => {
  const [menuVisible, setMenulVisible] = useState(false)
  const [modalOneVisible, setModalOneVisible] = useState(false)
  const [modalTwoVisible, setModalTwoVisible] = useState(false)
  const [modalFinishVisible, setModalFinishVisible] = useState(false)

  const [localActivity] = useTeamActivity(team?.pain_video_feed_id)
  const dispatch = useDispatch()
  const teamId = useTeamId()

  const getLikeCounts = () => {
    return localActivity?.reaction_counts?.like
  }

  const onStatsPress = () => {
    onOpenStatsPress(localActivity)
  }

  const onEdit = () => {
    dispatch(openEditStartupPage(navigation))
    changeDefaultTeam()
  }

  const onOpenVideoGallery = () => {
    dispatch(openVideoGalleryPage(navigation, team))
  }

  const changeDefaultTeam = () => {
    if (team?.id !== teamId) {
      dispatch(getTeam(team?.id))
      // dispatch(setTeam(item))
    }
  }

  const onMenuPress = () => {
    setMenulVisible(!menuVisible)
  }

  const onDeletePress = () => {
    setMenulVisible(false)
    setModalOneVisible(true)
    setModalTwoVisible(false)
    setModalFinishVisible(false)
  }

  return (
    <>
      <BlueCard>
        <EditContainer>
          <TitleStartUpContainer>
            <Avatar {...getTeamAvatarProps(team)} size={TEAM_AVATAR_SIZE} />
            <Spacer w={10} />
            <ViewFlex>
              <TeamName>{team?.name || 'Startup Name'}</TeamName>
              <TeamSlogan>{team?.slogan || 'Startup description'}</TeamSlogan>
            </ViewFlex>
          </TitleStartUpContainer>

          <StatsContainer>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.video} />
              <StatsTitle>Videos</StatsTitle>
              <StatsCount>1</StatsCount>
            </StatsItem>
            <StatsItem onPress={onStatsPress}>
              <StatsIcon resizeMode="contain" source={Images.viewStats} />
              <StatsTitle>Total Views</StatsTitle>
              <StatsCount>{team?.views || EMPTY_COUNT}</StatsCount>
            </StatsItem>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.coinsStats} />
              <StatsTitle>Up Coins</StatsTitle>
              <StatsCount>{getLikeCounts() || EMPTY_COUNT}</StatsCount>
            </StatsItem>
          </StatsContainer>
          <StatsButtonsContainer>
            <StatsItem onPress={onOpenVideoGallery}>
              <StatsIcon resizeMode="contain" source={Images.videos} />
              <StatsTitle>Video Gallery</StatsTitle>
            </StatsItem>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.message} />
              <StatsTitle>Message Followers</StatsTitle>
            </StatsItem>
            <StatsItem>
              <StatsIcon resizeMode="contain" source={Images.mainShare} />
              <StatsTitle>Share</StatsTitle>
            </StatsItem>
          </StatsButtonsContainer>
          <EditButton onPress={onMenuPress}>
            <EditIcon
              tintColor={Colors.TEXT_BRIGHT_BLUE}
              resizeMode="contain"
              source={Images.editCard}
            />
          </EditButton>
        </EditContainer>
      </BlueCard>
      <Menu visible={menuVisible}>
        <MenuButton onPress={onEdit}>
          <MenuItemTitle>Edit project</MenuItemTitle>
        </MenuButton>
        <MenuButton onPress={onDeletePress}>
          <MenuItemTitle>Delete project</MenuItemTitle>
        </MenuButton>
        <MenuButton onPress={() => {}}>
          <MenuItemTitle>Share</MenuItemTitle>
        </MenuButton>
        <EditMenuButton onPress={onMenuPress}>
          <EditIcon
            tintColor={Colors.TEXT_BRIGHT_BLUE}
            resizeMode="contain"
            source={Images.editCard}
          />
        </EditMenuButton>
      </Menu>
      <ModalStepOne
        modalVisible={modalOneVisible}
        setModalVisible={setModalOneVisible}
        setModalTwoVisible={setModalTwoVisible}
      />
      <ModalStepTwo
        modalVisible={modalTwoVisible}
        setModalVisible={setModalTwoVisible}
        setModalFinishVisible={setModalFinishVisible}
      />
      <ModalStepFinish modalVisible={modalFinishVisible} setModalVisible={setModalFinishVisible} />
    </>
  )
}

const { width } = Dimensions.get('window')

const TEAM_AVATAR_SIZE = 80
const AVATAR_SIZE = 40
const TeamName = styled(Texts.BoldTitleText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 22px;
`
const TeamSlogan = styled(Texts.TitleText)`
  color: ${Colors.TEXT_DARK_PURPLE};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`
const TitleStartUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const EditContainer = styled.TouchableOpacity``

const StatsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  border-bottom-color: ${Colors.TEXT_BRIGHT_BLUE};
  border-bottom-width: 3px;
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 20px;
`
const StatsItem = styled.TouchableOpacity`
  align-items: center;
  width: 65px;
`
const StatsIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
`
const StatsTitle = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  color: ${Colors.TEXT_DARK_PURPLE};
`
const MenuItemTitle = styled.Text`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const StatsCount = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: 700;
`
const StatsButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 30px;
`

const ViewFlex = styled.View``

const Coin = styled.Image`
  width: 30px;
  height: 30px;
  align-self: center;
`

const Wrapper = styled.View`
  flex: 1;
  width: 200px;
`

const Icon = styled.Image`
  height: 25px;
  width: 25px;
`

const TouchableOpacity = styled.TouchableOpacity``

const RightAlign = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
`
const MenuButton = styled.TouchableOpacity``

const EditButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  width: 30px;
  height: 30px;
  top: 10px;
`

const EditMenuButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 15px;
`

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
`

const Menu = styled.View`
  background-color: white;
  border-radius: 20;
  align-items: flex-start;
  shadow-offset: {
  width: 0,
  height: 2
  };
  shadow-opacity: 0.3;
  shadow-radius: 4;
  elevation: 5;
  margin: 2px;
  padding: 20px 25px;
  display: ${p => (p.visible ? 'flex' : 'none')};
  position: ${p => (p.visible ? 'absolute' : 'relative')};
  right: 8px;
  top: 13px;
  z-index:50;
`
