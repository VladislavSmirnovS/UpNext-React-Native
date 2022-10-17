import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ProgressBar from 'components/Control/ProgressBar'
import VerticalEmptyVideoWrapper from 'components/MyVentures/Video/VerticalEmptyVideoWrapper'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import VideoSelector from 'components/Startup/VideoSelector'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import Spacer from 'components/Page/Spacer'
import { useTeamId } from 'store/team/team.uses'
import { addTeamVideoPart, updateTeamVideoParts } from 'store/team/team.actions'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { getLimitFromSec } from 'services/utils'
import storage from 'services/storage'
import vimeo from 'services/vimeo'
import { getUserAvatarProps } from 'utils/user'

export default ({
  title,
  item,
  backgroundColor,
  navigation,
  currentStep,
  stepIndex,
  localActivity,
  videoPart,
  onVideoLoad,
  videoDurationLimit,
  fullVideoDurationLimit,
  painVideoParts,
  onSave,
  checkAutoFeedHide,
  team,
}) => {
  const dispatch = useDispatch()
  const teamId = useTeamId()

  const [progress, setProgress] = useState(null)
  const [duration, setDuration] = useState(0)

  const onSetVideoData = () => {
    dispatch(
      updateTeamVideoParts(videoPart, {
        isDone: true,
      }),
    )
  }

  const onUpload = ({ uri }) => {
    if (uri !== item?.url) {
      checkFullLengthVideo()
      dispatch(
        addTeamVideoPart({
          teamId,
          videoPart,
          url: uri,
          oldUrl: item?.url,
        }),
      )

      checkAutoFeedHide(team) // if use change video and hide project from Feed
    }
  }

  const checkFullLengthVideo = () => {
    if (team?.pain_video) {
      vimeo.removeVideo(team?.pain_video)
    }
  }

  const onLoad = ({ duration }) => {
    setDuration(duration)
    onVideoLoad(videoPart, duration)
  }

  const getDurationLimit = () => {
    return videoDurationLimit + duration
  }

  const getVideoLimitError = () => {
    const partLimit = getDurationLimit()

    if (partLimit < fullVideoDurationLimit) {
      const partLimitFixed = partLimit?.toFixed(0)
      const fullVideoLimit = getLimitFromSec(fullVideoDurationLimit)
      return `Maximum video length should be ${partLimitFixed} sec to meet ${fullVideoLimit} limit requirement`
    }

    return null
  }

  const getTextAlertBeforeCamera = () => {
    const videoPartKeys = painVideoParts ? Object.keys(painVideoParts) : []
    const partLimit = getDurationLimit()
    if (!videoPartKeys?.length && partLimit === fullVideoDurationLimit) {
      return 'Uploading a new section will replace existing full length video'
    }
    return null
  }

  const getTextAlertVideoChange = () => {
    if (team?.permissions?.lobby) {
      return localActivity?.id && !localActivity.foreign_id ? TEXT_FOR_OLD_VIDEO : TEXT_FOR_ALL
    }
    return null
  }

  const onSetUploadProgress = async data => {
    const value = await onGetUploadProgress()
    storage.setProgressUploadPartVideo({
      ...value,
      [team?.id]: { ...value?.[team?.id], [videoPart]: data },
    })
  }

  const onGetUploadProgress = async () => {
    const value = await storage.getProgressUploadPartVideo()
    return value?.[team?.id]?.[videoPart]
  }

  return (
    <Row>
      <VideoSelector
        onUpload={onUpload}
        withErrorText={false}
        isFull
        withProgress={false}
        onSetProgress={setProgress}
        videoPart={videoPart}
        durationLimit={getDurationLimit()}
        maxDurationError={getVideoLimitError()}
        onSetDuration={onLoad}
        textAlertBeforeCamera={getTextAlertBeforeCamera()}
        textAlertVideoChange={getTextAlertVideoChange()}
        onSetUploadProgress={onSetUploadProgress}
        onGetUploadProgress={onGetUploadProgress}
      >
        <ColoredTextWrapper backgroundColor={backgroundColor}>
          <Row>
            <Texts.WhiteText>{title}</Texts.WhiteText>
            <Spacer w={10} />

            <FlexView>
              {progress ? <ProgressBar color={Colors.WHITE} progress={progress} /> : null}
            </FlexView>
          </Row>
        </ColoredTextWrapper>
      </VideoSelector>

      <Spacer w={10} />
      {item?.user ? (
        <>
          <UserAvatarLobbyBtn
            {...getUserAvatarProps(item?.user)}
            size={AVATAR_SIZE}
            navigation={navigation}
          />
          <Spacer w={10} />
        </>
      ) : null}
      <PlayerWrapperInsideVideoPart>
        <VerticalEmptyVideoWrapper>
          <FullScreenPlayer
            url={item?.url}
            title={title}
            navigation={navigation}
            loadingSize={30}
            borderRadius={5}
            playButtonSize={20}
            onSetVideoData={onSetVideoData}
            onLoad={onLoad}
          />
        </VerticalEmptyVideoWrapper>
      </PlayerWrapperInsideVideoPart>
    </Row>
  )
}

const TEXT_FOR_ALL =
  'When a video is changed all current supporters will get notified and they will have the option to cancel their investment within 48h if they belive that the new video is not alighed anymore with the original venture they supported'
const TEXT_FOR_OLD_VIDEO =
  'Changing the video will result in returning the coins to all of your current supporters asking them (the app does it automatically) to re-support your video pitch new version'

const AVATAR_SIZE = 60

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const ColoredTextWrapper = styled.View`
  background-color: ${p => p.backgroundColor || Colors.COMMON_BLUE};
  flex: 1;
  padding: 20px;
  border-radius: ${Styles.MAIN_BORDER_RADIUS}px;
`

const PlayerWrapperInsideVideoPart = styled.View`
  width: 50px;
`

const FlexView = styled.View`
  flex: 1;
`
