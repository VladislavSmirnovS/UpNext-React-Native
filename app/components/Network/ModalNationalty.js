import React, { useState } from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import Spacer from 'components/Page/Spacer'
import { ScrollView } from 'react-native'
import TextInput from 'components/Control/NewTextInput'
import { useCountries } from 'store/app/app.uses'

export default ({ modalVisible, setModalVisible, setSuggestedFilter }) => {
  const countryOptions = useCountries()

  const [value, setValue] = useState('')
  const [activeCountry, setActiveCountry] = useState('')

  const handleChangeText = text => {
    setValue(text)
  }
  
  const clearSearch = () => {
    setValue('')
  }
  const onBackPress = () => {
    setModalVisible(false)
    setSuggestedFilter('')
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPress={onBackPress}
      />
        <ModalView>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer h={10} />
            <SearchInput
              width="320px"
              value={value}
              onChangeText={handleChangeText}
              placeholder="Search for Country"
              backgroundColor={Colors.WHITE}
              clearSearch={clearSearch}
              onBackPress={onBackPress}
              image={Images.backArrowBlue}
              clearImage={!value.length ? null : Images.clearSearch}
              placeholderTextColor={Colors.MENU_BLUE}
            />
            <View>
              {countryOptions &&
                countryOptions.map(item => (
                  <SelectedTag
                    key={item}
                    text={item}
                    selection={activeCountry}
                    onSelect={newValue => setActiveCountry(newValue)}
                  />
                ))}
            </View>
          </ScrollView>
        </ModalView>
    </Modal>
  )
}

const Modal = styled.Modal``

const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 110px;
`

const View = styled.View`
  width: 100%;
  padding-top:10px;
`

const ModalView = styled.View`
  z-index:50;
  flex: 1;
  margin: 0;
  background-color: ${Colors.WHITE};
  padding: 0 20px;
  align-items: center;
  width: 100%;
`

const SearchInput = styled(TextInput)``

const SelectedTag = ({ text, selection, onSelect }) => {
  const isSelected = selection.includes(text)

  const onPress = () => {
    onSelect(text, !isSelected)
  }

  return (
    <TagView selected={isSelected} onPress={onPress}>
      <TagText selected={isSelected}>{text}</TagText>
    </TagView>
  )
}

const TagView = styled.TouchableOpacity`
  padding: 5px 10px;
  height: 27px;
  margin-bottom:7px;
`

const TagText = styled(Texts.TutorialText)`
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  color: ${p => (p.selected ? Colors.MENU_BLUE : Colors.MENU_PURPLE)};
`
