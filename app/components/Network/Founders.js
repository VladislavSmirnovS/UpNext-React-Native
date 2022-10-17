import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import PaginationList from 'components/Control/PaginationList'
import Member from 'components/Network/Member'
import { getFounderMembers, setMembersPage, setMembersSearch } from 'store/lobby/lobby.actions'
import {
  useMembers,
  useMembersPagination,
  useMembersSearch,
  useMembersFilters,
} from 'store/lobby/lobby.uses'
import SearchInput from 'components/Network/SearchWithFilters'
import { Animated } from 'react-native'
import AppHeader from 'root/app/navigation/AppHeader'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const members = useMembers()
  const memberSearch = useMembersSearch()
  const membersFilters = useMembersFilters()
  const membersPagination = useMembersPagination()

  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')

  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 200)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  })

  const onClearSearch = () => {
    setValue('')
  }

  const getData = (page, callback) => {
    getDataWithSearch(page, memberSearch, callback)
  }

  const getDataWithSearch = (page, search, callback) => {
    dispatch(getFounderMembers(page, membersPagination.size, search, membersFilters, callback))
  }

  const setPage = page => {
    dispatch(setMembersPage(page))
  }

  const renderItem = ({ item: member }) => {
    return <Member navigation={navigation} member={member} />
  }
  const onScroll = e => {
    scrollY.setValue(e?.nativeEvent?.contentOffset.y)
  }

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 200,
          position: 'absolute',
        }}
      >
        <ContainerForHeader>
          <AppHeader />
          <SearchInput
            search={value}
            onChangeText={setValue}
            onSearch={setSearch}
            placeholder="Search"
            clearSearch={onClearSearch}
          />
        </ContainerForHeader>
      </Animated.View>
      <PaginationList
        onScroll={onScroll}
        noPadding
        data={members}
        currentPage={membersPagination.page}
        getData={getData}
        setPage={setPage}
        paddingTop="140px"
        renderItem={renderItem}
      />
    </View>
  )
}

const View = styled.View`
  width: 100%;
`
const ContainerForHeader = styled.View`
  padding: 0 20px;
  padding-top: 45px;
  background-color: #fff;
  min-width: 100%;
`
