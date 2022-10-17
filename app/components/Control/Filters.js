import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Styles from 'appearance/styles'
import ShadowView from 'react-native-simple-shadow-view'
import Texts from 'appearance/texts'
import { ScrollView } from 'react-native'

export default ({
  label,
  error,
  sidePadding,
  required,
  height,
  width,
  clearSearch,
  isFlex,
  withBottomPadding = true,
  backgroundColor,
  image,
  clearImage,
  renderPreSymbol,
  containerNoPadding,
  activeFilter,
  setActiveFilter,
  setNationaltyVisible,
  suggestedFilter,
  setSuggestedFilter,
  setAgeVisible,
  setRoleVisible,
  setContactsVisible,
  ...p
}) => {
  const filters = ['nationalty', 'Age', 'role', 'Contacts']

  const showFilters = () => {
    setActiveFilter(!activeFilter)
  }

  const showModal = newValue => {
    switch (newValue) {
      case 'nationalty':
        return setNationaltyVisible(true)
      case 'Age':
        return setAgeVisible(true)
      case 'role':
        return setRoleVisible(true)
      case 'Contacts':
        return setContactsVisible(true)
    }
  }
  const handleChangeFilter = newValue => {
    setNationaltyVisible(false)
    setAgeVisible(false)
    setRoleVisible(false)
    setContactsVisible(false)
    setSuggestedFilter(newValue)
    showModal(newValue)
  }

  return (
    <Container>
      <TouchableOpacity onPress={showFilters} resizeMode="contain">
        <Icon source={Images.filter} resizeMode="contain" />
      </TouchableOpacity>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {activeFilter ? (
          <Tags>
            {filters &&
              filters.map(item => (
                <SelectedTag
                  key={item}
                  text={item}
                  selection={suggestedFilter}
                  onSelect={handleChangeFilter}
                />
              ))}
          </Tags>
        ) : null}
      </ScrollView>
    </Container>
  )
}

const Container = styled(ShadowView)`
  height: 50px;
  width: 100%;
  flex-direction: row;
  background-color: ${p => p.background || Colors.WHITE};
  padding-left: 0px;
  padding-right: 15px;
  width: ${p => p.width || 'auto'};

  justify-content: center;
  align-items: center;
  ${p =>
    p.isFlex &&
    css`
      flex: 1;
    `}
`

const TouchableOpacity = styled.TouchableOpacity``

const Icon = styled.Image`
  height: 19px;
  width: 27px;
  align-self: center;
  tint-color: ${Colors.MENU_PURPLE};
`
const Tags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const SelectedTag = ({ text, selection, onSelect }) => {
  const isSelected = selection.includes(text)

  const onPress = () => {
    onSelect(text, !isSelected)
  }

  return (
    <TagView selected={isSelected} onPress={onPress}>
      <Wrapper>
        <TagShadow style={CARD_STYLE}>
          <TagText selected={isSelected}>{text}</TagText>
        </TagShadow>
      </Wrapper>
    </TagView>
  )
}
const CARD_STYLE = {
  shadowColor: Colors.COMMON_GREY,
  shadowOpacity: 0.3,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 0 },
}

const Wrapper = styled.View`
  padding: 5px 10px;
  display: flex;
`

const TagShadow = styled(ShadowView)`
  min-width: 68px;
  border-radius: 18px;
  height: 33px;
  background-color: ${p => p.background || Colors.WHITE};
  border-radius: ${Styles.MAIN_BORDER_RADIUS}px;
  border: ${Styles.BOX_BORDER};
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`
const TagView = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  align-items: center;
`

const TagText = styled(Texts.TutorialText)`
  font-size: 16px;
  font-weight: 600;
  color: ${p => (p.selected ? Colors.MENU_BLUE : Colors.MENU_PURPLE)};
`
