import React, { useState, forwardRef, useRef } from 'react'
import styled from 'styled-components'
import BackButton from 'components/Video/BackButton'
import { AVAILABLE_HEIGHT } from 'components/Control/DeviceHeight'
import VideoListItem from 'components/Video/VideoListItem'
import Images from 'appearance/images'
import { Animated } from 'react-native'
import AppHeader from 'root/app/navigation/AppHeader'

const MAX_BEFORE_VIDEO_LOAD = 2

const VideoList = ({
  navigation,
  data = [],
  withBackButton = true,
  ListEmptyComponent = null,
  ListFooterComponent = null,
  ListItem = VideoListItem,
  onRefresh = () => {},
  onEndReached = () => {},
  isPlayRule = true,
  onManualEndReached,
  removeClippedSubviews,
  height,
  listRef,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 100)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  })
  const getHeight = () => {
    return height || AVAILABLE_HEIGHT
  }

  const onScroll = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent
    const h = getHeight()
    const newPage = Math.round(contentOffset.y / parseInt(h, 10))
    onPageChange(newPage)
  }

  const onPageChange = newPage => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
    }
    if (currentPage > newPage) {
      scrollY.setValue(0)
    }

    if (currentPage < newPage) {
      scrollY.setValue(100)
    }

    if (newPage === data?.length - 1) {
      onManualEndReached && onManualEndReached()
    }
  }

  const renderItem = ({ item, index }) => {
    const currentPlay = index === currentPage && isPlayRule
    const isPoster =
      (currentPage > MAX_BEFORE_VIDEO_LOAD && index < currentPage - MAX_BEFORE_VIDEO_LOAD) ||
      index > currentPage + MAX_BEFORE_VIDEO_LOAD

    return (
      <ListItem
        item={item}
        index={index}
        play={currentPlay}
        navigation={navigation}
        {...props}
        isPoster={isPoster}
        height={getHeight()}
      />
    )
  }

  return (
    <>
      {withBackButton ? (
        <BackButton topOffset={50} navigation={navigation} imageSource={Images.whiteBack} />
      ) : null}
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 200,
          position: 'absolute',
        }}
      >
        <ContainerForHeader>
          <AppHeader />
        </ContainerForHeader>
      </Animated.View>

      <FlatListWithRef
        ref={listRef}
        pagingEnabled
        data={data}
        keyExtractor={getKeyExtractor}
        renderItem={renderItem}
        onScroll={onScroll}
        onEndReached={onEndReached}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        onRefresh={onRefresh}
        refreshing={false}
      />
    </>
  )
}
const ContainerForHeader = styled.View`
  padding: 0 20px;
  padding-top: 45px;
  background-color: #fff;
  min-width: 100%;
`

const FlatListWithRef = forwardRef((props, ref) => {
  return <FlatList ref={ref} {...props} />
})

const FlatList = styled.FlatList.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  width: 100%;
`

const getKeyExtractor = (item, index) => {
  return item?.id || index
}

export default VideoList
