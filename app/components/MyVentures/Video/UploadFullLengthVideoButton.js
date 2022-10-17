import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import VideoSelector from 'components/Startup/VideoSelector'
import { removeAllVideoParts, afterVideoUploaded } from 'store/team/team.actions'
// import { isLobbyComplete } from 'components/MyVentures/Permissions'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import vimeo from 'services/vimeo'
import storage from 'services/storage'

export default ({
  team,
  onSave,
  checkAutoFeedHide,
  isLoading,
  setIsLoading,
  localActivity,
  painVideoParts,
}) => {
  const dispatch = useDispatch()

  const onUpload = ({ uri }) => {
    if (uri !== team?.pain_video) {
      setIsLoading(true)

      if (team?.pain_video) {
        vimeo.removeVideo(team?.pain_video)
      }
      dispatch(removeAllVideoParts(team?.id, painVideoParts))

      handleSave(uri)
    }
  }

  const handleSave = uri => {
    onSave({
      resTeam: { ...team, pain_video: uri },
      callback: newTeam => {
        setIsLoading(false)

        dispatch(
          afterVideoUploaded({
            newTeam,
            newUrl: uri,
            localActivity,
            callback: checkAutoFeedHide, // if use change video and hide project from Feed
          }),
        )
      },
    })
  }

  // If user change video and project is complete then auto shown video in feed
  // const checkAutoFeedShown = newTeam => {
  //   const isLobbyChangeToTrue =
  //     !newTeam?.permissions?.disable && !newTeam?.permissions?.lobby && isLobbyComplete(newTeam)
  //   const permissions = isLobbyChangeToTrue
  //     ? { ...newTeam?.permissions, lobby: true }
  //     : newTeam?.permissions

  //   onSave({ resTeam: { ...newTeam, permissions } })
  // }

  const getTextAlertBeforeCamera = () => {
    const videoPartKeys = painVideoParts ? Object.keys(painVideoParts) : []
    if (!videoPartKeys?.length) {
      return null
    }
    return 'Uploading full video will replace all existing sections'
  }

  const getTextAlertVideoChange = () => {
    if (team?.permissions?.lobby) {
      return localActivity?.id && !localActivity.foreign_id ? TEXT_FOR_OLD_VIDEO : TEXT_FOR_ALL
    }
    return null
  }

  const onSetUploadProgress = async data => {
    const value = await onGetUploadProgress()
    storage.setProgressUploadFullVideo({ ...value, [team?.id]: data })
  }

  const onGetUploadProgress = async () => {
    const value = await storage.getProgressUploadFullVideo()
    return value?.[team?.id]
  }

  return (
    <View pointerEvents={isLoading ? 'none' : 'auto'}>
      <VideoSelector
        onUpload={onUpload}
        onSetProgress={() => {}}
        textAlertBeforeCamera={getTextAlertBeforeCamera()}
        textAlertVideoChange={getTextAlertVideoChange()}
        onSetUploadProgress={onSetUploadProgress}
        onGetUploadProgress={onGetUploadProgress}
      >
        <ButonWrapper>
          <IconWrapper>
            <Icon source={Images.upload} resizeMode="contain" />
          </IconWrapper>
          <Spacer w={5} />
          <SmallText>{'UPLOAD\r\nFULL LENGTH\r\nVIDEO'}</SmallText>
        </ButonWrapper>
      </VideoSelector>
    </View>
  )
}

const TEXT_FOR_ALL =
  'When a video is changed all current supporters will get notified and they will have the option to cancel their investment within 48h if they belive that the new video is not alighed anymore with the original venture they supported'
const TEXT_FOR_OLD_VIDEO =
  'Changing the video will result in returning the coins to all of your current supporters asking them (the app does it automatically) to re-support your video pitch new version'

const IMAGE_SIZE = 25

const View = styled.View``

const ButonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.View`
  background: ${Colors.COMMON_GREY};
  border-radius: 5px;
  padding: 8px;
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`

const SmallText = styled(Texts.GreyText)`
  font-size: 10px;
`
