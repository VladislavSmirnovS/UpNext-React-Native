import React, { useState } from 'react'
import styled from 'styled-components'
import Images from 'appearance/images'
import Colors from 'root/app/appearance/colors'
import Modal from 'components/Video/DeleteModal'

export default () => {
  const [menuVisible, setMenulVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const onMenuPress = () => {
    setMenulVisible(!menuVisible)
  }

  const onDeletePress = () => {
    setModalVisible(true)
    setMenulVisible(false)
  }

  return (
    <>
      <EditButton onPress={onMenuPress}>
        <EditIcon
          tintColor={Colors.TEXT_BRIGHT_BLUE}
          resizeMode="contain"
          source={Images.editCard}
        />
      </EditButton>
      <Menu visible={menuVisible}>
        <MenuButton onPress={onDeletePress}>
          <MenuItemTitle>Delete project</MenuItemTitle>
        </MenuButton>
        <MenuButton onPress={onDeletePress}>
          <MenuItemTitle>Share</MenuItemTitle>
        </MenuButton>
        <EditMenuButton onPress={onMenuPress}>
          <EditIcon
            tintColor={Colors.TEXT_BRIGHT_BLUE}
            resizeMode="contain"
            source={Images.editCard}
          />
        </EditMenuButton>
      </Menu>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  )
}

const MenuItemTitle = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: ${Colors.TEXT_BRIGHT_BLUE};
`

const MenuButton = styled.TouchableOpacity`
  margin-right: 10px;
`

const EditButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 55px;
  z-index: 1;
`

const EditMenuButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 15px;
`

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
`

const Menu = styled.View`
  background-color: white;
  border-radius: 20;
  align-items: flex-start;
  shadow-offset: {
  width: 0,
  height: 2
  };
  shadow-opacity: 0.3;
  shadow-radius: 4;
  elevation: 5;
  padding: 20px 30px 30px 20px;
  display: ${p => (p.visible ? 'flex' : 'none')};
  position: ${p => (p.visible ? 'absolute' : 'relative')};
  right: 0px;
  top: 45px;
  z-index:50;
`
