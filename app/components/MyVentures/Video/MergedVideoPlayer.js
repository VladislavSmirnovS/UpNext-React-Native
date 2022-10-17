import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import Spacer from 'components/Page/Spacer'
import VerticalEmptyVideoWrapper from 'components/MyVentures/Video/VerticalEmptyVideoWrapper'
import UploadFullLengthVideoButton from 'components/MyVentures/Video/UploadFullLengthVideoButton'
import Loading from 'components/Page/Loading'
import { useUserId } from 'store/user/user.uses'
import { mergePainVideo, afterVideoUploaded } from 'store/team/team.actions'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import { getUserId } from 'utils/user'

export default ({
  url,
  navigation,
  currentStep,
  stepIndex,
  setPlayerVideoUrl,
  painVideoParts,
  activityTime,
  team,
  onSave,
  checkAutoFeedHide,
  localActivity,
  children,
}) => {
  const dispatch = useDispatch()
  const userId = useUserId()

  const [isLoading, setIsLoading] = useState(false)
  const [isMerging, setIsMergin] = useState(false)
  const [readyForMergingParts, setReadyForMergingParts] = useState()


  useEffect(() => {
    const videoPartKeys = painVideoParts ? Object.keys(painVideoParts) : []

    if (videoPartKeys?.length) {
      let isHasNotMergedVideo = false
      let readyVideos = []

      videoPartKeys.forEach(key => {
        const item = painVideoParts?.[key]
        const itemUserId = getUserId(item?.user)
        const isMyDraft = !item?.is_merged && userId === itemUserId

        if (isMyDraft) {
          isHasNotMergedVideo = true
        }

        if (isMyDraft || item?.is_merged) {
          readyVideos.push(key)
        }
      })

      setIsMergin(isHasNotMergedVideo)
      setReadyForMergingParts(readyVideos)
    }
  }, [painVideoParts])

  useEffect(() => {
    if (isMerging && painVideoParts && readyForMergingParts?.length) {
      const partsObj = {}
      readyForMergingParts.forEach(key => {
        partsObj[key] = painVideoParts?.[key]
      })
      const parts = readyForMergingParts.map(key => painVideoParts?.[key])

      if (parts.every(item => item?.isDone)) {
        dispatch(
          mergePainVideo(team, partsObj, activityTime, newTeam => {
            setIsMergin(false)

            dispatch(
              afterVideoUploaded({
                newTeam,
                newUrl: newTeam?.pain_video,
                localActivity,
                callback: checkAutoFeedHide, // if use change video and hide project from Feed
              }),
            )
          }),
        )
      }
    }
  }, [readyForMergingParts])

  const playVideo = () => {
    setPlayerVideoUrl && setPlayerVideoUrl(url)
  }

  const getUrl = () => {
    const videoPartKeys = painVideoParts ? Object.keys(painVideoParts) : []
    return videoPartKeys?.length ? url : team?.pain_video
  }

  return (
    <Centered onPress={playVideo}>
      <View>
        <VerticalEmptyVideoWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <FullScreenPlayer
              isMerging={isMerging}
              url={url}
              title={team?.pain}
              navigation={navigation}
            />
          )}
        </VerticalEmptyVideoWrapper>
       
        {children }
     
      </View>
    </Centered>
  )
}


const AddIcon = styled.Image`
  height: 27px;
  width: 27px;
`

const InvestmentCountWrapper = styled.View`
  position: absolute;
  bottom: -7;
  left: 48;
`
const Loader = () => (
  <WrapperLoader>
    <Loading />
  </WrapperLoader>
)

const IMAGE_SIZE = 40

const Centered = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  flex: 1;
  align-items: center;
`

const View = styled.View`
  align-items: center;
  justify-content: center;
`

const Padding = styled.TouchableOpacity`
  flexDirection: row
  align-items: center;
  justify-content: center;
  position: absolute;
  top:200;

`

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  flex: 1;
  justify-content: space-between;
`

const FlexSpacer = styled.View`
  flex: 1;
`

const WrapperLoader = styled.View`
  height: 200px;
`

const CenteredMergingText = styled(Texts.SmallText)`
  color: ${Colors.COMMON_BLUE};
  text-align: center;
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`

const RightView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
