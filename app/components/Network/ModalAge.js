import React, { useState } from 'react'
import styled from 'styled-components'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Spacer from 'components/Page/Spacer'
import SliderCustomLabel from 'components/Network/SlyderCustom'
import SliderCustomMarker from 'components/Network/SlyderMarker'
import Input from 'components/MyVentures/Input'
import Texts from 'appearance/texts'

export default ({ modalVisible, setModalVisible, setSuggestedFilter }) => {
  const [selected, setSelected] = useState([14, 24])
  const [minValue, setMinValue] = useState(14)
  const [maxValue, setMaxValue] = useState(24)
  const [sliderVisible, setSliderVisible] = useState(true)

  if (!selected) {
    setSelected([14, 24])
  }

  const onValuesChangeFinish = values => {
    setSelected(values)
  }

  const onClosePress = () => {
    setModalVisible(false)
    setSuggestedFilter('')
  }

  const onChangePress = () => {
    setSliderVisible(!sliderVisible)
  }

  const onChangedMin = text => {
    let value = onChanged(text)
    if (value > 13 && value < 25) {
      setMinValue(value)
    } else {
      alert('please enter from  14 to 24')
    }
  }

  const onChangedMax = text => {
    let value = onChanged(text)
    if (value > 13 && value < 25) {
      setMaxValue(value)
    } else {
      alert('please enter from  14 to 24')
    }
  }

  const onChanged = text => {
    let newText = ''
    let numbers = '0123456789'
    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        return (newText = newText + text[i])
      } else {
        alert('please enter numbers only')
      }
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <CenteredView>
        <ModalView>
          <Buttons>
            <CloseButton onPress={onClosePress}>
              <EditIcon resizeMode="contain" source={Images.cross} />
            </CloseButton>
            <EditButton onPress={onChangePress}>
              <EditIcon resizeMode="contain" source={Images.filter} />
            </EditButton>
          </Buttons>

          <Title>Age range</Title>
          <Spacer h={15} />
          <SliderWrapper sliderVisible={sliderVisible}>
            <Title>14</Title>
            <Spacer w={15} />
            <MultiSlider
              trackStyle={{
                height: 2,
              }}
              selectedStyle={{
                backgroundColor: Colors.MENU_BLUE,
              }}
              unselectedStyle={{
                backgroundColor: Colors.MENU_PURPLE,
              }}
              values={selected}
              onValuesChangeFinish={onValuesChangeFinish}
              min={14}
              max={24}
              sliderLength={220}
              enableLabel={true}
              customLabel={SliderCustomLabel()}
              customMarker={SliderCustomMarker}
            />
            <Spacer w={15} />
            <Title>24</Title>
          </SliderWrapper>
          <InputWrapper sliderVisible={sliderVisible}>
            <Title>from</Title>
            <Spacer w={8} />
            <Input
              keyboardNumber
              value={minValue}
              onChange={onChangedMin}
              placeholder="14"
              placeholderTextColor={Colors.TEXT_DARK_BLUE}
              color={Colors.TEXT_DARK_BLUE}
              textSizes={Texts.sizes.NewHeaderSize}
              maxLength={2}
              underlineColor={Colors.TEXT_DARK_BLUE}
            />
            <Spacer w={20} />
            <Title>to</Title>
            <Spacer w={8} />
            <Input
              keyboardNumber
              value={maxValue}
              onChange={onChangedMax}
              placeholder="24"
              placeholderTextColor={Colors.TEXT_DARK_BLUE}
              color={Colors.TEXT_DARK_BLUE}
              textSizes={Texts.sizes.NewHeaderSize}
              maxLength={2}
              underlineColor={Colors.TEXT_DARK_BLUE}
            />
          </InputWrapper>
          <OkButton onPress={onClosePress}>
            <Text>ok</Text>
          </OkButton>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const SliderWrapper = styled.View`
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: ${p => (p.sliderVisible ? 'flex' : 'none')};
`
const InputWrapper = styled.View`
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: ${p => (!p.sliderVisible ? 'flex' : 'none')};
`

const Buttons = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const CloseButton = styled.TouchableOpacity`
  margin-bottom: 30px;
  align-self: flex-start;
`

const EditButton = styled.TouchableOpacity`
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
  tint-color: ${Colors.TEXT_BRIGHT_BLUE};
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

const Text = styled.Text`
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
`
