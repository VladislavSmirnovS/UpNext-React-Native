import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import Modal from 'components/Feed/Report/Modal'
import FlatList from 'components/Control/FlatList'
import EventItem from 'components/Stats/EventItem'
import Loader from 'components/Page/Loader'

export default ({
  isVisible,
  onClose,
  data,
  count,
  currentPage,
  getData,
  setPage,
  navigation,
  onStatsClose,
  eventType,
}) => {
  if (!isVisible) {
    return null
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getNewData(0)
  }, [])

  const getNewData = page => {
    setIsDataLoading(true)
    getData(page, () => {
      setIsDataLoading(false)
      setIsLoading(false)
    })
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onScroll = () => {
    if (!isEnd() && !isDataLoading) {
      onChangePage(currentPage + 1)
    }
  }

  const onChangePage = page => {
    getNewData(page)
    setPage(page)
  }

  const isEnd = () => {
    return data ? count === data?.length : true
  }

  const renderItem = ({ item }) => {
    return (
      <EventItem
        item={item}
        navigation={navigation}
        onClose={onClose}
        onStatsClose={onStatsClose}
        eventType={eventType}
      />
    )
  }

  const footerComp = () => {
    return !isEnd() ? <Loader /> : null
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          <FlatList
            data={data}
            onRefresh={onRefresh}
            refreshing={false}
            onEndReached={onScroll}
            onEndReachedThreshold={0.2}
            keyExtractor={getKey}
            renderItem={renderItem}
            ListFooterComponent={footerComp}
            shouldComponentUpdate={shouldComponentUpdate}
          />
        </Wrapper>
      )}
    </Modal>
  )
}

const getKey = item => {
  return item?.id
}

const shouldComponentUpdate = () => {
  return false
}

const { height } = Dimensions.get('window')

const Wrapper = styled.View`
  max-height: ${height - 100}px;
  width: 100%;
`
