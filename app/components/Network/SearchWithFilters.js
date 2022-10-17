import React, { useState } from 'react'
import styled from 'styled-components'
import TextInput from 'components/Control/NewTextInput'
import Filters from 'components/Control/Filters'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import ModalNationalty from 'components/Network/ModalNationalty'
import ModalAge from 'components/Network/ModalAge'
import ModalRole from 'components/Network/ModalRole'
import ModalContacts from 'components/Network/ModalContacts'

let timer = null
export default ({
  search,
  onChangeText,
  onSearch = () => {},
  clearSearch,
  placeholder,
  renderPreSymbol,
}) => {
  const [suggestedFilter, setSuggestedFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState(false)
  const [nationaltyVisible, setNationaltyVisible] = useState(false)
  const [ageVisible, setAgeVisible] = useState(false)
  const [roleVisible, setRoleVisible] = useState(false)
  const [contactsVisible, setContactsVisible] = useState(false)
  const [modalFinishVisible, setModalFinishVisible] = useState(false)

  const handleChangeText = text => {
    onChangeText(text)
    resetTimer()

    timer = setTimeout(() => {
      onSearch(text)
    }, 500)
  }

  const resetTimer = () => {
    clearTimeout(timer)
    timer = null
  }

  return (
    <>
      <Row>
        <Filters
          value={search}
          setNationaltyVisible={setNationaltyVisible}
          setAgeVisible={setAgeVisible}
          setRoleVisible={setRoleVisible}
          setContactsVisible={setContactsVisible}
          onChangeText={handleChangeText}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          placeholder={placeholder}
          backgroundColor={Colors.WHITE}
          clearSearch={clearSearch}
          image={!search.length ? Images.newSearch : Images.backArrowBlue}
          clearImage={!search.length ? null : Images.clearSearch}
          placeholderTextColor={Colors.MENU_PURPLE}
          renderPreSymbol={renderPreSymbol}
          suggestedFilter={suggestedFilter}
          setSuggestedFilter={setSuggestedFilter}
        />
        {!activeFilter ? (
          <SearchInput
            width="300px"
            value={search}
            activeFilter={activeFilter}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            backgroundColor={Colors.WHITE}
            clearSearch={clearSearch}
            image={!search.length ? Images.newSearch : Images.backArrowBlue}
            clearImage={!search.length ? null : Images.clearSearch}
            placeholderTextColor={Colors.MENU_PURPLE}
            renderPreSymbol={renderPreSymbol}
          />
        ) : null}
      </Row>
      <ModalNationalty
        modalVisible={nationaltyVisible}
        setModalVisible={setNationaltyVisible}
        suggestedFilter={suggestedFilter}
        setSuggestedFilter={setSuggestedFilter}
      />
        <ModalAge
        modalVisible={ageVisible}
        setModalVisible={setAgeVisible}
        setSuggestedFilter={setSuggestedFilter}
      />
          <ModalRole
        modalVisible={roleVisible}
        setModalVisible={setRoleVisible}
        setSuggestedFilter={setSuggestedFilter}
      />
           <ModalContacts
        modalVisible={contactsVisible}
        setModalVisible={setContactsVisible}
        setSuggestedFilter={setSuggestedFilter}
      />
    </>
  )
}

const SearchInput = styled(TextInput)``

const Row = styled.View`
  width: 100%;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
`
