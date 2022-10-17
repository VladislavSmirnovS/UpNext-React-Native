import React from 'react'
import VideoList from 'components/Feed/VideoList'
import useCommonFeed from 'components/Feed/hooks/useCommonFeed'
import NewActivityButton from 'components/Feed/NewActivityButton'

export default ({ navigation, isPlayRule }) => {
  const {
    listRef,
    feed,
    isCommonLoading,
    onNewPress,
    onRefresh,
    onEndReached,
    onManualEndReached,
  } = useCommonFeed(navigation)

  return (
    <>
      <VideoList
        listRef={listRef}
        feedId="videos"
        feedGroup="videos"
        data={feed}
        navigation={navigation}
        isLoading={isCommonLoading}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        isPlayRule={isPlayRule}
        onManualEndReached={onManualEndReached}
      />
      <NewActivityButton onPress={onNewPress} />
    </>
  )
}
