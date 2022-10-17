import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import NotCompleteModal from 'components/Startup/NotCompleteModal'
import AlertModal from 'components/Control/AlertModal'
import Switch from 'components/Startup/Switch'
import Spacer from 'components/Page/Spacer'
import Button from 'components/Control/Button'
import { setShareData } from 'store/app/app.actions'
import { saveTeamsOptions } from 'store/team/team.actions'
import {
  returnAllCoinsFromActivity,
  resetAllFeed,
  removeActivityFromInvestments,
} from 'store/feed/feed.actions'
import { useTeam } from 'store/team/team.uses'
import { useUser } from 'store/user/user.uses'
import { handleError } from 'services/logger'
import useModal from 'hooks/useModal'
import branchio from 'services/branchio'
import { COINS_GOAL } from 'constants'
import { openMyStartupPage } from 'services/navigation'
import { getUserId } from 'utils/user'
import vimeo from 'services/vimeo'
import { getVimeoUrl } from 'store/notification/notification.actions'
import Colors from 'root/app/appearance/colors'

export default ({ localActivity, onSave, onShowSuccessAnimation, navigation }) => {
  const dispatch = useDispatch()
  const team = useTeam()
  const user = useUser()

  const [
    isConfirmBeforeToggleFalseModalShow,
    showConfirmBeforeToggleFalseModal,
    hideConfirmBeforeToggleFalseModal,
  ] = useModal()

  const [isLobby, setIsLobby] = useState(false)
  const [isMentors, setIsMentors] = useState(false)
  const [isInvestors, setIsInvestors] = useState(false)
  const [modalText, setModalText] = useState()
  const [modalError, setModalError] = useState()
  const [additionalModalText, setAdditionalModalText] = useState()

  useEffect(() => {
    setIsLobby(team?.permissions?.lobby)
    setIsMentors(team?.permissions?.mentors)
    setIsInvestors(team?.permissions?.investors)
  }, [team])

  const toggleLobby = (e, callback) => {
    if (team?.permissions?.disable) {
      setModalError(
        'Your video was removed from the feed due to unappropreate content, pls replace it or contact us for more info',
      )
    } else {
      updateToggleLobby(callback)
    }
  }

  const updateToggleLobby = callback => {
    if (!isLobby && !isLobbyComplete(team)) {
      setModalTextForLobby()
    } else {
      setIsLobby(!isLobby)
      callback && callback()

      if (isMentors) {
        setIsMentors(false)
      }
      if (isInvestors) {
        setIsInvestors(false)
      }

      // InteractionManager.runAfterInteractions(() => {
      //   if (isLobby) {
      //     dispatch(returnAllCoinsFromActivity(team))
      //   }

      //   const permissions = getPermissionsWithNewValue('lobby', !isLobby)
      //   onSave({
      //     resTeam: { ...team, permissions },
      //     callback: () => {
      //       dispatch(resetAllFeed())
      //     },
      //   })
      // })
    }
  }

  const toggleMentors = () => {
    if ((!isMentors && !isMentorsComplete(team)) || (!isMentors && !isEnoughtMentorsLikeCount())) {
      setModalTextForMentors()
    } else {
      const newValue = !isMentors
      if (newValue && !isLobby) {
        toggleLobby(null, () => {
          setIsMentors(newValue)
        })
      } else {
        setIsMentors(newValue)
      }
      // const permissions = getPermissionsWithNewValue('mentors', !isMentors)
      // onSave({ resTeam: { ...team, permissions } })
    }
  }

  const toggleInvestors = () => {
    if (
      (!isInvestors && !isInvestorsComplete(team)) ||
      (!isInvestors && !isEnoughtInvestorsLikeCount())
    ) {
      setModalTextForInvestors()
    } else {
      const newValue = !isInvestors
      if (newValue && !isLobby) {
        toggleLobby(null, () => {
          setIsInvestors(newValue)
        })
      } else {
        setIsInvestors(newValue)
      }
      // const permissions = getPermissionsWithNewValue('investors', !isInvestors)
      // onSave({ resTeam: { ...team, permissions } })
    }
  }

  const setModalTextForLobby = () => {
    setModalTextForPermission(getLobbyEmptyFields, () => {}, '')
  }

  const setModalTextForMentors = () => {
    setModalTextForPermission(
      getMentorsEmptyFields,
      isEnoughtMentorsLikeCount,
      'You  need a minimum of 500 coins to become visible to mentors',
    )
  }

  const setModalTextForInvestors = () => {
    setModalTextForPermission(
      getInvestorsEmptyFields,
      isEnoughtInvestorsLikeCount,
      'You  need a minimum of 10,000 coins to become visible to mentors',
    )
  }

  const setModalTextForPermission = (getEmptyFields, isAdditionalCondition, error) => {
    const fields = getEmptyFields(team)
    setText(fields)

    if (!isAdditionalCondition()) {
      setAdditionalModalText(error)
    }
  }

  const setText = fields => {
    let res = ''
    fields.forEach(item => {
      res += `${item.errorText} \r\n`
    })
    setModalText(res)
  }

  // const getPermissionsWithNewValue = (key, value) => {
  //   return team?.permissions ? { ...team.permissions, [key]: value } : { [key]: value }
  // }

  const isEnoughtInvestorsLikeCount = () => {
    return getLikeCounts() >= COINS_GOAL
  }

  const isEnoughtMentorsLikeCount = () => {
    return getLikeCounts() >= 500
  }

  const getLikeCounts = () => {
    return localActivity?.reaction_counts?.like
  }

  const onCancel = () => {
    setModalText()
    setAdditionalModalText()
    setModalError()
  }

  const getShareData = async () => {
    const videoUrl = team?.pain_video

    const id = vimeo.getVideoId(videoUrl)
    const res = await getVimeoUrl(id)

    return {
      uniqueId: videoUrl,
      inviteUserId: getUserId(user),
      acitivityId: team?.pain_video_feed_id,
      videoUrl,
      videoVimeoUrl: res.uri,
    }
  }

  const onSharePress = async () => {
    onCancel()

    const data = await getShareData()
    const url = await branchio.shareVideo(data)
    dispatch(setShareData({ url }))
  }

  const onConfirmBeforeToggleFalse = value => {
    hideConfirmBeforeToggleFalseModal()
    toggleLobby(value)
  }

  const onUploadProjectPress = () => {
    onUploadProject()
  }

  const isHideProject = () => {
    return team?.permissions?.lobby && !isLobby
  }

  const onUploadProject = () => {
    if (isHideProject()) {
      dispatch(
        returnAllCoinsFromActivity(team, () => {
          try {
            dispatch(resetAllFeed())
            dispatch(saveTeamsOptions([]))
            dispatch(removeActivityFromInvestments(localActivity?.id))
          } catch (error) {
            handleError(error)
          }
        }),
      )
    }

    const permissions = { lobby: isLobby, mentors: isMentors, investors: isInvestors }
    onSave({
      resTeam: { ...team, permissions },
      callback: newTeam => {
        onShowSuccessAnimation()
        dispatch(openMyStartupPage(navigation))
      },
    })
  }

  const isDisabled = () => {
    return !isPermissionChanged()
  }

  const isPermissionChanged = () => {
    const isLobbyChanged = team?.permissions?.lobby != isLobby
    const isMentorChanged = team?.permissions?.mentors != isMentors
    const isInvestorsChanged = team?.permissions?.investors != isInvestors
    return isLobbyChanged || isMentorChanged || isInvestorsChanged
  }

  return (
    <Wrapper>
      <Spacer h={15} />
      {/* <Switch
        key="lobby"
        label="Feed"
        value={isLobby}
        onChange={
          team?.permissions?.lobby && isLobby ? showConfirmBeforeToggleFalseModal : toggleLobby
        }
      />

      <Spacer h={15} />
      <Switch key="mentors" label="Mentors" value={isMentors} onChange={toggleMentors} />

      <Spacer h={15} />
      <Switch key="investors" label="Investors" value={isInvestors} onChange={toggleInvestors} />

      <Spacer h={15} /> */}
      <Button
        text={isHideProject() ? 'Update' : 'Upload Project'}
        height={45}
        width="130px"
        onPress={onUploadProjectPress}
        disabled={isDisabled()}
        backgroundColor="transparent"
        border
        color={Colors.TEXT_BRIGHT_BLUE}
      />

      <AlertModal
        isVisible={isConfirmBeforeToggleFalseModalShow}
        text={TEXT_BEFORE_TOGGLE_FALSE}
        okText="Ok"
        onConfirm={onConfirmBeforeToggleFalse}
        cancelText="Cancel"
        onCancel={hideConfirmBeforeToggleFalseModal}
      />
      <NotCompleteModal
        isVisible={!!modalText || !!additionalModalText || !!modalError}
        modalText={modalText}
        modalError={modalError}
        additionalModalText={additionalModalText}
        onConfirm={onCancel}
        onSharePress={onSharePress}
        text="In order to make your startup visible to others."
      />
    </Wrapper>
  )
}

const TEXT_BEFORE_TOGGLE_FALSE =
  'By making this pitch private you will automatically return all of the coins invested in it to their owners as their intent was to support &  invest in a pitch that will grow to a successful public startup'

const LOBBY_REQUIRED = [
  {
    field: 'name',
    errorText: 'Name',
  },
  {
    field: 'slogan',
    errorText: 'Description',
  },
  { field: 'avatar', errorText: 'Avatar' },
  { field: 'pain', errorText: 'The Problem' },
  { field: 'solution', errorText: 'The Solution' },
  { field: 'secret', errorText: 'Uniqueness' },
  { field: 'pain_video', errorText: 'Video Pitch' },
]
const MENTORS_REQUIRED = [...LOBBY_REQUIRED]
const INVESTORS_REQUIRED = [...MENTORS_REQUIRED]

export const isLobbyComplete = team => {
  return isComplete(team, LOBBY_REQUIRED)
}

const isMentorsComplete = team => {
  return isComplete(team, MENTORS_REQUIRED)
}

const isInvestorsComplete = team => {
  return isComplete(team, INVESTORS_REQUIRED)
}

const getLobbyEmptyFields = team => {
  const emptyFields = getEmptyFields(team, LOBBY_REQUIRED)
  return emptyFields
}

const getMentorsEmptyFields = team => {
  const emptyFields = getEmptyFields(team, MENTORS_REQUIRED)
  return emptyFields
}

const getInvestorsEmptyFields = team => {
  const emptyFields = getEmptyFields(team, INVESTORS_REQUIRED)
  return emptyFields
}

const isComplete = (team, requiredObj) => {
  const emptyFields = getEmptyFields(team, requiredObj)
  return !emptyFields?.length
}

const getEmptyFields = (team, requiredObj) => {
  let emptyFields = []
  requiredObj.forEach(obj => {
    if (!team?.[obj?.field]) {
      emptyFields.push(obj)
    }
  })
  return emptyFields
}

const Wrapper = styled.View`
  align-items: center;
`
