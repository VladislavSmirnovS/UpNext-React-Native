import React, { useState, forwardRef, useRef } from 'react'
import styled from 'styled-components'
import { AVAILABLE_HEIGHT } from 'components/Control/DeviceHeight'
import VideoListItem from 'components/Video/VideoListItem'
import BackButton from 'components/Video/BackButton'
import Images from 'appearance/images'
import EditButton from 'components/Video/EditButton'

const MAX_BEFORE_VIDEO_LOAD = 2

const LearnVideoPlayer = ({
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
  withEditButton,
  listRef,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(0)

  const getHeight = () => {
    return height || AVAILABLE_HEIGHT
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
      <BackButton topOffset={50} navigation={navigation} imageSource={Images.backArrowBlue} whiteButton/>
      {withEditButton ? <EditButton/> : null}
      <FlatListWithRef
        ref={listRef}
        pagingEnabled
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        onRefresh={onRefresh}
        refreshing={false}
      />
    </>
  )
}

const FlatListWithRef = forwardRef((props, ref) => {
  return <FlatList ref={ref} {...props} />
})

const FlatList = styled.FlatList.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  width: 100%;
`

export default LearnVideoPlayer
