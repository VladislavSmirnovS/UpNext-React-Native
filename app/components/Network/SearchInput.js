import React from 'react'
import styled from 'styled-components'
import TextInput from 'components/Control/TextInput'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

let timer = null
export default ({
  search,
  onChangeText,
  onSearch = () => {},
  onBlur,
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
      onBlur={onBlur}
      placeholder={placeholder}
      withBottomPadding={withBottomPadding}
      backgroundColor={Colors.WHITE}
      image={Images.inputSearch}
      renderPreSymbol={renderPreSymbol}
      containerNoPadding
    />
  )
}

const SearchInput = styled(TextInput)`
  width: 100%;
`
