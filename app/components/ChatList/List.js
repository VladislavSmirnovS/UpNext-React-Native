import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FlatList from 'components/Control/FlatList'
import Loader from 'components/Page/Loader'
import EmptyList from 'components/ChatList/EmptyList'
import ListItem from 'components/ChatList/ListItem'
import SearchInput from 'components/Network/NewSearchInput'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Spacer from 'components/Page/Spacer'
import PageContainer from 'components/Page/PageContainer'
import {
  getFriendsRequests,
  getPersonalChats,
  getStartupsChats,
  getLikedStartupsChats,
  getFriendsPendings,
  resetChatsList,
  setChatsListPage,
  setChatsListRequestIndex,
  setChatsListIsEnd,
} from 'store/chat/chat.actions'
import { useChatsList, useChatsListPagination } from 'store/chat/chat.uses'
import { getUserId } from 'utils/user'
import images from 'appearance/images'
import { Animated } from 'react-native'
import AppHeader from 'root/app/navigation/AppHeader'

const MIN_NUMBER_LIST_ITEM = 10

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const chatList = useChatsList()
  const { page, size, requests, requestIndex, isEnd } = useChatsListPagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)

  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')

  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 100)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  })

  const scrollYForPageContainer = new Animated.Value(0)
  const diffClampForPageContainer = Animated.diffClamp(scrollY, 0, 50)
  const translateYForPageContainer = diffClampForPageContainer.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  })

  useEffect(() => {
    if (!chatList?.length && !isLoading) {
      onRefresh()
    }
  }, [chatList?.length])

  useEffect(() => {
    if (
      !isLoading &&
      !isDataLoading &&
      chatList?.length < MIN_NUMBER_LIST_ITEM &&
      isFullRequested()
    ) {
      onEndReached()
    }
  }, [isLoading, isDataLoading, chatList?.length, requestIndex])

  const onClearSearch = () => {
    setValue('')
  }

  const resetData = () => {
    dispatch(resetChatsList())
  }

  const onRefresh = () => {
    showLoading()
    resetData()
    getNewData(0, 0, hideLoading)
  }

  const showLoading = () => {
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const getNewData = (currentPage, currentRequestIndex, callback) => {
    setIsDataLoading(true)

    const currentRequest = requests[currentRequestIndex]

    const requestCallback = resLength => {
      checkEnd(resLength, currentRequestIndex)

      if (resLength || (!resLength && currentRequestIndex + 1 === requests?.length)) {
        setIsDataLoading(false)
      }

      callback && callback()
    }

    switch (currentRequest) {
      case 'get_friends_requests':
        dispatch(getFriendsRequests(currentPage, size, requestCallback))
        break

      case 'get_personal_chats':
        dispatch(getPersonalChats(currentPage, size, requestCallback))
        break

      case 'get_startups_chats':
        dispatch(getStartupsChats(currentPage, size, requestCallback))
        break

      case 'get_liked_startups_chats':
        dispatch(getLikedStartupsChats(currentPage, size, requestCallback))
        break

      case 'get_friends_pendings':
        dispatch(getFriendsPendings(currentPage, size, requestCallback))
        break
    }
  }

  const checkEnd = (resLength, currentRequestIndex) => {
    if (!resLength) {
      if (currentRequestIndex + 1 === requests?.length) {
        setIsEnd(true)
      } else {
        nextRequest(currentRequestIndex)
      }
    } else if (currentRequestIndex + 1 !== requests?.length) {
      onChangePage(page + 1, currentRequestIndex)
    }
  }

  const nextRequest = currentRequestIndex => {
    setRequestIndex(currentRequestIndex + 1)
    onChangePage(0, currentRequestIndex + 1)
  }

  const onEndReached = () => {
    if (!isEnd && !isDataLoading && isFullRequested()) {
      onChangePage(page + 1, requestIndex)
    }
  }

  const isFullRequested = () => {
    return requestIndex + 1 === requests?.length
  }

  const onChangePage = (currentPage, currentRequestIndex) => {
    getNewData(currentPage, currentRequestIndex)
    setPage(currentPage)
  }

  const setPage = currentPage => {
    dispatch(setChatsListPage(currentPage))
  }

  const setRequestIndex = currentRequestIndex => {
    dispatch(setChatsListRequestIndex(currentRequestIndex))
  }

  const setIsEnd = currentIsEnd => {
    dispatch(setChatsListIsEnd(currentIsEnd))
  }

  const renderListEmptyComponent = () => {
    return <EmptyList navigation={navigation} />
  }

  const renderItem = ({ item }) => {
    return <ListItem navigation={navigation} item={item} />
  }

  const renderListFooterComponent = () => {
    return isDataLoading ? <Loader /> : null
  }
  const onScroll = e => {
    scrollY.setValue(e?.nativeEvent?.contentOffset.y)
    scrollYForPageContainer.setValue(e?.nativeEvent?.contentOffset.y)
  }
  return (!isEnd && !chatList?.length) || isLoading ? (
    <Loading />
  ) : (
    <>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 201,
          position: 'absolute',
        }}
      >
        <ContainerForHeader>
          <AppHeader />
        </ContainerForHeader>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: translateYForPageContainer }],
          zIndex: 200,
          position: 'absolute',
        }}
      >
        <Container>
          <PageContainer
            title="Chats"
            navigation={navigation}
            hideTopHeader
            fontSize={24}
            titleBack
          />
          <SearchInput
            search={value}
            onChangeText={setValue}
            onSearch={setSearch}
            placeholder="Search"
            clearSearch={onClearSearch}
          />
        </Container>
      </Animated.View>

      <Spacer h={15} />
      <FlatList
        noPadding
        data={chatList}
        onRefresh={onRefresh}
        refreshing={false}
        onScroll={onScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        keyExtractor={getKeyExtractor}
        renderItem={renderItem}
        paddingTop="110px"
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={renderListFooterComponent}
        shouldComponentUpdate={shouldComponentUpdate}
      />
    </>
  )
}

const View = styled.View`
  width: 100%;
`

const END_REACHED_THRESHOLD = 0.5

const getKeyExtractor = item => {
  return getUserId(item)
}

const shouldComponentUpdate = () => {
  return false
}

const Loading = () => {
  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  )
}

const LoaderWrapper = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const ContainerForHeader = styled.View`
  padding: 0 20px;
  padding-top: 45px;
  background-color: #fff;
  min-width: 100%;
`
const Container = styled.View`
  padding: 0 20px;
  padding-top: 85px;
  background-color: #fff;
  min-width: 100%;
`
