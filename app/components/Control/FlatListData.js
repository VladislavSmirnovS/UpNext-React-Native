import React, { useEffect } from 'react'
import styled from 'styled-components'
import FlatList from 'components/Control/FlatList'
import Loading from 'components/Page/Loading'
import { getUserId } from 'utils/user'

export default ({
  isLoading,
  data,
  pagination,
  count,
  setIsLoading = () => {},
  renderPlaceholder = renderLoading,
  getData = () => {},
  setPage = () => {},
  renderItem = () => {},
  ListEmptyComponent,
  ListFooterComponent,
  noPadding,
}) => {
  useEffect(() => {
    if (!data) {
      setIsLoading(true)
      getNewData(0)
    }
  }, [data])

  const getNewData = page => {
    getData(page, hideLoading)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onEndReached = () => {
    if (!isEnd() && !isLoading) {
      onChangePage(pagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewData(page)
    setPage(page)
  }

  const isEnd = () => {
    return data ? count === data.length : true
  }

  if (!data || isLoading) {
    return renderPlaceholder()
  }

  return (
    <FlatList
      data={data}
      onRefresh={onRefresh}
      refreshing={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      keyExtractor={getKey}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
      ListFooterComponent={ListFooterComponent}
      shouldComponentUpdate={shouldComponentUpdate}
      noPadding={noPadding}
    />
  )
}

const renderLoading = () => {
  return (
    <WrapperLoader>
      <Loading />
    </WrapperLoader>
  )
}

const getKey = item => {
  return getUserId(item)
}

const shouldComponentUpdate = () => {
  return false
}

const WrapperLoader = styled.View`
  flex: 1;
  width: 100%;
`
