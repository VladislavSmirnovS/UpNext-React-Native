import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ modalVisible, setModalVisible }) => {
 
  const onClosePress = () => {
    setModalVisible(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <CloseButton onPress={onClosePress}>
            <EditIcon resizeMode="contain" source={Images.cross} />
          </CloseButton>
          <MenuDeleteTitle>This project has been terminated !</MenuDeleteTitle>
          <Icon source={Images.deleteTrash} resizeMode="contain" />
          <Description>Most founders fail before they nail it keep on pushing</Description>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const CloseButton = styled.TouchableOpacity`
  margin-bottom: 30px;
  align-self: flex-end;
`

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
`

const Icon = styled.Image`
  align-self: center;
  height: 215px;
  width: 194px;
  margin-bottom: 25px;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
`


const ModalView = styled.View`
  z-index:10;
  margin: 22px;
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
  font-size: 24px;
  text-align: center;
  line-height: 29px;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const Description = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 16px;
  text-align: center;
  line-height: 22px;
`