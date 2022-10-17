import React from 'react'
import styled from 'styled-components'
import FilterOption from 'components/Startup/Filter/FilterOption'
import ButtonOuter from 'components/Control/ButtonOuter'

import Styles from 'appearance/styles'
import Colors from 'appearance/colors'

export default ({
  isOpen,
  setIsOpen,
  options,
  selected,
  onSelected,
  renderFilterToggleButton,
  onAddNewStartup,
}) => {
  if (!isOpen) {
    return null
  }

  const renderItem = item => {
    const isSelected = item?.id === selected?.id
    return (
      <FilterOption key={item?.id} item={item} isSelected={isSelected} onSelected={onSelected} />
    )
  }

  return (
    <Container setIsOpen={setIsOpen}>
      {renderFilterToggleButton(selected)}
      <Border />
      <Padder>
        {options.map(renderItem)}
        <BottomButtons>
          <ButtonOuter height={28} width="100px" text="Add new +" onPress={onAddNewStartup} />
        </BottomButtons>
      </Padder>
    </Container>
  )
}

const Container = ({ setIsOpen, children }) => {
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal transparent>
      <Background onPress={onClose}>
        <Content>{children}</Content>
      </Background>
    </Modal>
  )
}

const Modal = styled.Modal``

const Background = styled.TouchableOpacity`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
`

const Content = styled.View`
  background: ${Colors.WHITE};
  padding: ${Styles.PAGE_PADDING};
`

const Border = styled.View`
  background: ${Colors.INPUT_BORDER_GREY};
  height: 1px;
  margin-top: 10px;
`

const Padder = styled.View`
  padding: ${p => (p.noPadding ? '0px' : Styles.PAGE_PADDING)};
`

const BottomButtons = styled.View`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`
