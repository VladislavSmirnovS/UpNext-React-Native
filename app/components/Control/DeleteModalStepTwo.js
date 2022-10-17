import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import ButtonOuter from 'components/Control/ButtonOuter'
import Spacer from 'components/Page/Spacer'
import { ScrollView } from 'react-native'
import { getUserAvatarProps } from 'utils/user'
import Avatar from 'components/Common/Avatar'
import { useUser } from 'store/user/user.uses'
import { EMPTY_STRING } from 'root/app/constants'
import Images from 'appearance/images'
import DeleteUSer from 'components/Control/UserDelete'
import FlatList from 'components/Control/FlatList'

export default ({ modalVisible, setModalVisible,setModalFinishVisible }) => {
  const onStayPress = () => {
    setModalVisible(!modalVisible)
  }
  const onDeletePress = () => {
    setModalVisible(!modalVisible)
    setModalFinishVisible(true)
  }
  const user = useUser()

  const testUsers = [
    { avatar: Images.exampleAvatar1, fullName: 'Stan Smith', role: 'hustler', status: 'deleted' },
    { avatar: Images.exampleAvatar2, fullName: 'Hailey Rose', role: 'social', status: 'active' },
    { avatar: Images.exampleAvatar1, fullName: 'Stan Smith', role: 'hustler', status: 'deleted' },
    { avatar: Images.exampleAvatar2, fullName: 'Hailey Rose', role: 'social', status: 'active' },
  ]

  const fullName = `${user?.first_name} ${user?.last_name}` || EMPTY_STRING
  const ageWithCountry = `${user?.age}, ${user?.school_country}` || EMPTY_STRING
  const typeProfile = EMPTY_STRING

  const renderItem = ({ item: user }) => {
    return <DeleteUSer user={user} />
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <MenuDeleteTitle>
              In order to completely delete your project from the app we need this action to be
              <BoldText> confirmed by all team members.</BoldText>
              {'\n'}
              {'\n'}If you'll delete it on your device and the rest of the team won't, you'll be out
              of the team and the rest of the team will continue existing without you.
            </MenuDeleteTitle>
            <TitleContainer>
              <Avatar {...getUserAvatarProps(user)} size={AVATAR_SIZE} />
              <FullName>{fullName}</FullName>
              <AgeWithCountry>{ageWithCountry}</AgeWithCountry>
              <TypeProfile>{typeProfile}</TypeProfile>
            </TitleContainer>

            <BottomRow>
              <ButtonView>
                <ButtonOuter
                  text="Stay"
                  onPress={onStayPress}
                  color={Colors.TEXT_BRIGHT_BLUE}
                  width="90px"
                  height={30}
                />
              </ButtonView>
              <Spacer w={40} />
              <ButtonView>
                <ButtonOuter
                  text="Delete"
                  backgroundColor={Colors.TEXT_BRIGHT_BLUE}
                  onPress={onDeletePress}
                  color={Colors.WHITE}
                  width="90px"
                  height={30}
                />
                <Spacer h={10} />
                <ButtonDescription>And notify other team members</ButtonDescription>
              </ButtonView>
            </BottomRow>
            <Description>
              This is the current termination <BoldText>confirmation status.</BoldText>
            </Description>
            <View>
              <FlatList noPadding data={testUsers} renderItem={renderItem} />
            </View>
          </ScrollView>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const View = styled.View`
  width: 100%;
`

export const AVATAR_SIZE = 80

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  background-color: rgba(255, 255, 255, 0.6);
`

const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonView = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 120px;
`

const ModalView = styled.View`
  z-index:10;
  margin: 20px;
  background-color: ${Colors.WHITE};
  border-radius: 20px;
  padding: 25px;
  align-items: center;
  shadow-offset: {
  width: 0,
  height: 2
  };
  shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5;
`

const MenuDeleteTitle = styled.Text`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: left;
  line-height: 22px;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: center
  text-align: center;
  margin-bottom: 28px;
`
const FullName = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 28px;
  margin-bottom: 5px;
  font-weight: 700;
`
const AgeWithCountry = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  margin-bottom: 10px;
  font-size: 16px;
`
const TypeProfile = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 22px;
  font-weight: 500;
`

const ButtonDescription = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 16px;
  text-align: center;
  line-height: 22px;
`
const Description = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 16px;
  line-height: 22px;
  margin-bottom:10px;
`

const BoldText = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
`
