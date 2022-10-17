import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import EditMyLauncher from 'components/Launcher/EditMyLauncher'
import PaginationList from 'components/Control/PaginationList'
import LaunchPadItem from 'components/Launcher/LaunchPadItem'
import PlusButton from 'components/MyVentures/PlusButton'
import {
  getMyLaunchers,
  createMyLauncher,
  setMyLaunchersPage,
  setEditItem,
} from 'store/launcher/launcher.actions'
import { useMyLaunchers, useMyLaunchersPagination, useEditItem } from 'store/launcher/launcher.uses'
import Colors from 'appearance/colors'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const myLaunchers = useMyLaunchers()
  const myLaunchersPagination = useMyLaunchersPagination()
  const editItem = useEditItem()

  const getData = (page, callback) => {
    dispatch(getMyLaunchers(page, myLaunchersPagination.size, callback))
  }

  const setPage = page => {
    dispatch(setMyLaunchersPage(page))
  }

  const onPlusPress = () => {
    onEditItem(true)
    dispatch(createMyLauncher(onEditItem))
  }

  const onEditItem = item => {
    dispatch(setEditItem(item))
  }

  const onGoBackPress = () => {
    dispatch(setEditItem(null))
  }

  const renderItem = ({ item }) => {
    return <LaunchPadItem navigation={navigation} item={item} withEditButton onEdit={onEditItem} />
  }

  const renderFooterComp = () => {
    return (
      <Padder>
        <PlusButton
          onPress={onPlusPress}
          size={PLUS_SIZE}
          background={`${Colors.COMMON_BLUE}90`}
          iconColor={Colors.BLACK}
          borderRadius={5}
        />
      </Padder>
    )
  }

  return (
    <>
      <HiddenBlock isHidden={!editItem}>
        <EditMyLauncher navigation={navigation} onGoBackPress={onGoBackPress} item={editItem} />
      </HiddenBlock>
      <HiddenBlock isHidden={editItem}>
        <PaginationList
          noPadding
          data={myLaunchers}
          currentPage={myLaunchersPagination.page}
          getData={getData}
          setPage={setPage}
          renderItem={renderItem}
          renderFooterComp={renderFooterComp}
        />
      </HiddenBlock>
    </>
  )
}
const PLUS_SIZE = 60

const Padder = styled.View`
  padding: 5px;
  width: 100px;
`

const HiddenBlock = styled.View`
  flex: 1;
  display: ${p => (p.isHidden ? 'none' : 'flex')};
`
