import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { AVAILABLE_HEIGHT, APP_BOTTOM_MENU } from 'components/Control/DeviceHeight'
import UserNeedProfileErrorModal from 'components/Control/UserNeedProfileErrorModal'
import VideoList from 'components/Video/VideoList'
import Spacer from 'components/Page/Spacer'
import EmptyFeed from 'components/Feed/EmptyFeed'
import Loader from 'components/Page/Loader'
import VideoListItem from 'components/Feed/VideoListItem'
import VideoMenuModal from 'components/Feed/Report/VideoMenuModal'
import VideoStatsModal from 'components/Stats/VideoStatsModal'
import useIsCompleted from 'components/Feed/hooks/useIsCompleted'
import { endFeedVideo, viewFeedVideo } from 'store/feed/feed.actions'
import useVideoMenu from 'components/Feed/hooks/useVideoMenu'

const VIDEO_FIELD = 'video_url'

export default ({
  navigation,
  data,
  isLoading,
  withBottomMenu = true,
  ListEmptyComponent,
  ...props
}) => {
  if (!data) {
    return null
  }

  const dispatch = useDispatch()

  const {
    isProfileErrorModalVisible,
    openProfileErrorModal,
    closeProfileErrorModal,
    isCompleted,
  } = useIsCompleted()

  const {
    isShowReport,
    isShowStats,
    selectedItem,
    showReport,
    closeReport,
    closeStats,
  } = useVideoMenu()

  const getListFooterComponent = () => {
    if (data && data?.length && isLoading) {
      return <Loader />
    }
    if (data && data?.length) {
      return <Spacer h={50} />
    }
    return null
  }

  const getListEmptyComponent = () => {
    if (ListEmptyComponent) {
      return <ListEmptyComponent />
    }
    return <EmptyFeed navigation={navigation} />
  }

  const getHeight = () => {
    const height = withBottomMenu ? AVAILABLE_HEIGHT - APP_BOTTOM_MENU : AVAILABLE_HEIGHT
    return `${height}px`
  }

  const onVideoEmergencyStop = (item, progress, duration) => {
    if (duration > 1 && progress === 100) {
      dispatch(viewFeedVideo(item, progress, duration))
    }
  }

  const onVideoEnd = data => {
    dispatch(endFeedVideo(data))
  }

  return (
    <>
      <Background>
        <VideoList
          data={data}
          field={VIDEO_FIELD}
          withBackButton={false}
          isBottomProgressBar
          isBlueProgressBar
          height={getHeight()}
          ListFooterComponent={getListFooterComponent}
          ListEmptyComponent={getListEmptyComponent}
          ListItem={VideoListItem}
          navigation={navigation}
          onVideoEnd={onVideoEnd}
          onVideoEmergencyStop={onVideoEmergencyStop}
          onLongPress={showReport}
          {...props}
        />
      </Background>
      <VideoMenuModal
        isVisible={isShowReport}
        item={selectedItem}
        onClose={closeReport}
        navigation={navigation}
        isCompleted={isCompleted}
        openProfileErrorModal={openProfileErrorModal}
      />
      <VideoStatsModal
        isVisible={isShowStats}
        item={selectedItem}
        onClose={closeStats}
        navigation={navigation}
      />
      <UserNeedProfileErrorModal
        isVisible={isProfileErrorModalVisible}
        onclose={closeProfileErrorModal}
        title="Want to report?"
        subTitle="You need to have a user profile"
        navigation={navigation}
      />
    </>
  )
}

const Background = styled.View``
