import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import ButtonOuter from 'components/Control/ButtonOuter'
import Spacer from 'components/Page/Spacer'

export default ({ modalVisible, setModalVisible }) => {
  const onDeletePress = () => {
    setModalVisible(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible)
        }}
      />
      <CenteredView>
        <ModalView>
          <MenuDeleteTitle>
            Deleting this video will triger a push notification to all of your supporters to let
            them know it was deleted
          </MenuDeleteTitle>
          <BottomRow>
            <ButtonOuter
              text="Cansel"
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
              color={Colors.TEXT_BRIGHT_BLUE}
              width="90px"
              height={30}
            />
            <Spacer w={66} />
            <ButtonOuter
              text="Delete"
              backgroundColor={Colors.TEXT_BRIGHT_BLUE}
              onPress={onDeletePress}
              color={Colors.WHITE}
              width="90px"
              height={30}
            />
          </BottomRow>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  flex: 1;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  position: absolute;
  top: 90px;
`

const ModalView = styled.View`
  z-index:10;
  margin: 20px;
  background-color: ${Colors.WHITE};
  border-radius: 20px;
  padding: 25px;
  align-items: center;
  shadowColor: #000;
  shadowOffset: {
  width: 0,
  height: 2
  };
  shadowColor: "#000",
  shadow-offset: {
  width: 0,
  height: 2
  };
  shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5;

`

const MenuDeleteTitle = styled.Text`
  margin-bottom: 50px;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`
