import React, { useEffect, useState } from 'react'
import FlatList from 'components/Control/FlatList'
import Loader from 'components/Page/Loader'
import { getUserId } from 'utils/user'

export default ({
  data,
  currentPage = 0,
  getData = () => {},
  setPage = () => {},
  renderItem = () => null,
  renderListEmptyComponent = () => null,
  renderFooterComp = () => null,
  noPadding,
  onScroll,
  paddingTop,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    if (!data?.length && !isLoading) {
      showLoading()
      getNewData(0, hideLoading)

      resetData()
    }
  }, [data])

  useEffect(() => {
    if (!currentPage && isEnd) {
      setIsEnd(false)
    }
  }, [currentPage])

  const resetData = () => {
    if (currentPage) {
      setPage(0)
    }
    if (isEnd) {
      setIsEnd(false)
    }
  }

  const showLoading = () => {
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const getNewData = (page, callback) => {
    setIsDataLoading(true)
    getData(page, resLength => {
      checkEnd(resLength)
      setIsDataLoading(false)
      callback && callback()
    })
  }

  const checkEnd = resLength => {
    if (!resLength) {
      setIsEnd(true)
    }
  }

  const onRefresh = () => {
    onChangePage(0)
    setIsEnd(false)
  }

  const onEndReached = () => {
    if (!isEnd && !isDataLoading) {
      onChangePage(currentPage + 1)
    }
  }

  const onChangePage = page => {
    getNewData(page)
    setPage(page)
  }

  const renderListFooterComponent = () => {
    return (
      <>
        {isDataLoading ? <Loader /> : null}
        {renderFooterComp()}
      </>
    )
  }

  return isLoading ? (
    <Loader />
  ) : (
    <FlatList
      noPadding={noPadding}
      paddingTop={paddingTop}
      onScroll={onScroll}
      data={data}
      onRefresh={onRefresh}
      refreshing={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
      keyExtractor={getKeyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmptyComponent}
      ListFooterComponent={renderListFooterComponent}
      shouldComponentUpdate={shouldComponentUpdate}
    />
  )
}

const END_REACHED_THRESHOLD = 0.5

const getKeyExtractor = item => {
  return getUserId(item)
}

const shouldComponentUpdate = () => {
  return false
}
