import React from 'react'
import styled from 'styled-components'
import TextInput from 'components/Control/NewTextInput'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

let timer = null
export default ({
  search,
  onChangeText,
  onSearch = () => {},
  onBlur,
  clearSearch,
  withBottomPadding,
  placeholder,
  renderPreSymbol,
}) => {
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
    <SearchInput
      value={search}
      onChangeText={handleChangeText}
      placeholder={placeholder}
      backgroundColor={Colors.WHITE}
      clearSearch={clearSearch}
      image={!search.length ? Images.newSearch : Images.backArrowBlue}
      clearImage={!search.length ? null : Images.clearSearch}
      placeholderTextColor={Colors.MENU_PURPLE}
      renderPreSymbol={renderPreSymbol}
    />
  )
}

const SearchInput = styled(TextInput)``
