import React from 'react'
import styled from 'styled-components'
import FilterOption from 'components/Notifications/FilterOption'
import Styles from 'appearance/styles'
import Colors from 'appearance/colors'

export default ({ isOpen, options, selected, onSelected, renderFilterToggleButton }) => {
  if (!isOpen) {
    return null
  }

  const renderItem = item => {
    const isSelected = item.key === selected.key
    return (
      <FilterOption key={item.key} item={item} isSelected={isSelected} onSelected={onSelected} />
    )
  }

  return (
    <Container>
      {renderFilterToggleButton()}
      <Border />
      <Padder>{options.map(renderItem)}</Padder>
    </Container>
  )
}

const Container = ({ children }) => {
  return (
    <Modal transparent>
      <Background>
        <Content>{children}</Content>
      </Background>
    </Modal>
  )
}

const Modal = styled.Modal``

const Background = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
`

const Content = styled.View`
  background: ${Colors.WHITE};
`

const Padder = styled.View`
  padding: ${p => (p.noPadding ? '0px' : Styles.PAGE_PADDING)};
`

const Border = styled.View`
  background: ${Colors.INPUT_BORDER_GREY};
  height: 1px;
`
