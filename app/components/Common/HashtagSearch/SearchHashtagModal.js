import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import Modal from 'components/Feed/Report/Modal'
import Spacer from 'components/Page/Spacer'
import SearchInput from 'components/Network/SearchInput'
import HashtagsList from 'components/Common/HashtagSearch/HashtagsList'
import { toggleShowSearchHashtagModal } from 'store/app/app.actions'
import { useIsShowSearchHashtagModal } from 'store/app/app.uses'
import Texts from 'appearance/texts'

const SearchHashtagModal = ({ isFocused }) => {
  const dispatch = useDispatch()
  const isShowSearchHashtagModal = useIsShowSearchHashtagModal()

  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')

  const onClose = () => {
    dispatch(toggleShowSearchHashtagModal(false))
  }

  const renderPreSymbol = () => {
    return (
      <>
        <Spacer w={10} />
        <Texts.TitleText>#</Texts.TitleText>
      </>
    )
  }

  return (
    <Modal isVisible={isFocused && !!isShowSearchHashtagModal} onClose={onClose}>
      <Centered>
        <Texts.TitleText>Search hashtags</Texts.TitleText>
        <View>
          <SearchInput
            search={value}
            onChangeText={setValue}
            onSearch={setSearch}
            placeholder="hashtag"
            renderPreSymbol={renderPreSymbol}
          />
        </View>
        <HashtagsListWrap>
          <HashtagsList search={search} onCloseHashtagSearchModal={onClose} />
        </HashtagsListWrap>
      </Centered>
    </Modal>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return true
}

export default memo(withNavigationFocus(SearchHashtagModal), arePropsEqual)

const Centered = styled.View`
  justify-content: center;
  align-items: center;
`

const View = styled.View`
  width: 100%;
`

const HashtagsListWrap = styled.View`
  height: 300px;
  width: 100%;
`
