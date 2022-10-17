import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Platform, KeyboardAvoidingView, View } from 'react-native'
import styled from 'styled-components'
import Input from 'components/Feed/Input'
import ActivityContent from 'components/Feed/ActivityContent'
import { SinglePost, Activity, CommentList } from 'react-native-activity-feed'
import PageContainer from 'components/Page/PageContainer'
import StreamioContainer from 'components/Feed/StreamioContainer'
import ButtonOuter from 'components/Control/ButtonOuter'
import { checkUserRules, doIfLoginUser } from 'store/user/user.actions'
import { addNotificationComment } from 'store/notification/notification.actions'
import { _updateFeed } from 'store/feed/feed.actions'
import { openHomePage } from 'services/navigation'
import streamio from 'services/streamio'
import Texts from 'appearance/texts'
import { handleError } from 'services/logger'
// import { updateTextHashtags } from 'store/startup/startup.actions'
import { getVimeoUrl } from 'store/notification/notification.actions'
import { parseVideoUrl } from 'services/utils'
import mixpanel from 'services/mixpanel'
// import api from 'services/api'

// Android does keyboard height adjustment natively.
const ChatView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})()

const FeedSingle = ({ navigation }) => {
  const dispatch = useDispatch()
  const {
    activity_id,
    activity,
    feedGroup = 'common',
    userId = 'videos',
    tabName = 'videos',
  } = navigation.state.params

  const [localActivity, setLocalActivity] = useState(activity)
  const [error, setError] = useState()

  useEffect(() => {
    if (activity_id && !activity) {
      streamio
        .getFeed({ feedType: feedGroup, feedId: userId, page: 0, size: 1, activityId: activity_id })
        .then(res => {
          if (!res.results.length) {
            setError('This video can not be loaded')
          } else {
            setError()
            setLocalActivity(res.results?.[0])
          }
        })
        .catch(error => {
          handleError(error)
          setError('This video can not be loaded')
        })
    }
  }, [activity_id])

  // Update vimeo data
  useEffect(() => {
    if (activity?.id && (!activity?.vimeoData || !+activity?.vimeoData?.naturalSize?.height)) {
      const { id } = parseVideoUrl(activity.video_url)
      getVimeoUrl(id)
        .then(res => {
          streamio.quietEditActivity({
            activityId: activity?.id,
            vimeoData: res, // { ...res, rotate: '-90deg' },
          })
        })
        .catch(() => handleError(error))
    }
  }, [activity])

  // update hashtags
  // useEffect(() => {
  //   if (activity?.id && activity?.hashtags) {
  //     const newHashtags = []
  //     dispatch(updateTextHashtags(activity?.id, newHashtags))
  //     api
  //       .getTeam(activity?.teamId)
  //       .then(res => api.updateTeamDetails({ ...res.data, hashtags: newHashtags }))
  //       .catch(error => handleError(error))
  //   }
  // }, [activity])

  const isAllowed = () => {
    return dispatch(checkUserRules(navigation))
  }

  const onComment = (text, props) => {
    if (isAllowed()) {
      props.onAddReaction('comment', localActivity, { text })
      dispatch(_updateFeed(tabName))
      addNotificationComment(activity?.teamId, activity?.id, activity?.video_url, text)
    }
  }

  const renderActivity = props => {
    return (
      <>
        <Activity {...props} Header={null} Content={<ActivityContent activity={localActivity} />} />
        <CommentList
          activityId={props?.activity?.id}
          LoadMoreButton={props => (
            <LoadMoreWrapper>
              <ButtonOuter text="Load more..." height={20} width="100px" onPress={props.onPress} />
            </LoadMoreWrapper>
          )}
        />
      </>
    )
  }

  const renderFooter = props => {
    const onSendMessage = text => {
      dispatch(
        doIfLoginUser(() => {
          onComment(text, props)
          mixpanel.trackEvent('Comment video')
        }),
      )
    }

    return <Input onSendMessage={onSendMessage} />
  }

  const onGoBack = () => {
    dispatch(openHomePage(navigation))
  }

  return (
    <ChatViewWrapper behavior={CHAT_VIEW_BEHAIVIOR}>
      <PageContainer paddingTop navigation={navigation} back onGoBack={onGoBack}>
        <StreamioContainer navigation={navigation}>
          {!localActivity && error ? (
            <Centered>
              <Texts.TitleText>{error}</Texts.TitleText>
            </Centered>
          ) : null}
          {localActivity ? (
            <SinglePost
              activity={localActivity}
              feedGroup={feedGroup}
              userId={userId}
              navigation={navigation}
              Activity={renderActivity}
              Footer={renderFooter}
            />
          ) : null}
        </StreamioContainer>
      </PageContainer>
    </ChatViewWrapper>
  )
}

const CHAT_VIEW_BEHAIVIOR = Platform.OS === 'ios' ? 'padding' : null

const ChatViewWrapper = styled(ChatView)`
  flex: 1;
  width: 100%;
`

const LoadMoreWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const Centered = styled.View`
  align-items: center;
  justify-content: center;
  height: 200px;
`

FeedSingle.navigationOptions = screenProps => {
  return { headerShown: false }
}
export default FeedSingle
