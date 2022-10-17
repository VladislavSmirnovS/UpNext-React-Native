import React, { useState } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Spacer from 'components/Page/Spacer'
import CheckBox from 'components/Network/Checkbox'

export default ({ modalVisible, setModalVisible, setSuggestedFilter }) => {
  const [investor, setInvestor] = useState(false)
  const [founder, setFounder] = useState(false)

  const onClosePress = () => {
    setModalVisible(false)
    setSuggestedFilter('')
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <CloseButton onPress={onClosePress}>
            <EditIcon resizeMode="contain" source={Images.cross} />
          </CloseButton>
          <ViewCheckbox>
            <CheckBox
              label="Founder"
              value={founder}
              onChange={newValue => setFounder(newValue)}
              borderColor={Colors.MENU_PURPLE}
            />
            <Spacer w={40} />
            <CheckBox
              label="Investor"
              value={investor}
              onChange={newValue => setInvestor(newValue)}
              borderColor={Colors.MENU_PURPLE}
            />
          </ViewCheckbox>
          <OkButton onPress={onClosePress}>
            <TextOk>ok</TextOk>
          </OkButton>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const ViewCheckbox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const CloseButton = styled.TouchableOpacity`
  margin-bottom: 30px;
  align-self: flex-start;
`

const OkButton = styled.TouchableOpacity`
  margin-top: 50px;
  align-self: flex-end;
`

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 0 25px 15px 25px;
  background-color: rgba(255, 255, 255, 0.6);
`

const ModalView = styled.View`
  z-index:10;
  width:100%;
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

const TextOk = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 16px;
  font-weight: 600;
`
