import React, { useEffect, useState } from 'react'
import FlatList from 'components/Control/FlatList'
import Loader from 'components/Page/Loader'

export default ({ data, count, currentPage, getData, setPage, renderItem }) => {
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

  const footerComp = () => {
    return !isEnd() ? <Loader /> : null
  }

  return isLoading ? (
    <Loader />
  ) : (
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
  )
}

const getKey = item => {
  return item?.id
}

const shouldComponentUpdate = () => {
  return false
}
