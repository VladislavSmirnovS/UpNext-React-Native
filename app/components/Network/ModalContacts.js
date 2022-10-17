import React, { useState } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'

export default ({ modalVisible, setModalVisible, setSuggestedFilter }) => {
  const [value, setValue] = useState(false)
  const contacts = [
    { label: '1-10', value: 0 },
    { label: '10-100', value: 1 },
    { label: '100-500', value: 2 },
    { label: '500-1000', value: 3 },
    { label: 'above 1000', value: 4 },
  ]

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
          <Title>Number of contacts</Title>
          <RadioForm animation={true}>
            {contacts.map((obj, i) => (
              <RadioButton key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={value === i}
                  onPress={value => setValue(value)}
                  borderWidth={1}
                  buttonInnerColor={Colors.MENU_BLUE}
                  buttonOuterColor={Colors.TEXT_DARK_PURPLE}
                  buttonSize={7}
                  buttonOuterSize={12}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginTop: 4 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={value => setValue({ value: value })}
                  labelStyle={{ fontSize: 16, color: '#3D005B' }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>

          <OkButton onPress={onClosePress}>
            <TextOk>ok</TextOk>
          </OkButton>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

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
  align-items: flex-start;
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
const Title = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 16px;
  text-align: center;
  line-height: 18px;
  font-weight: 600;
  padding-bottom: 20px;
  align-self: center;
`
