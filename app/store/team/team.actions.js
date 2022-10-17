import api from 'services/api'
import { Alert, Platform } from 'react-native'
import RNFS from 'react-native-fs'
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native'
import { setShareData, notifyAlert } from 'store/app/app.actions'
import { getUserTeams, afterLeaveTeam } from 'store/user/user.actions'
import {
  joinStartupChatAsOperator,
  changeStartupChatInfo,
  removeOpenChannel,
  removeOpenChannels,
  changeChatsListItem,
  removeChatsListItem,
} from 'store/chat/chat.actions'
import {
  getFeed,
  getLikedFeed,
  getMeFeed,
  editActivity,
  addActivity,
  setVideoInProgress,
  returnAllCoinsFromActivity,
  setVideoPainFeedId,
  setLikedFeedPage,
  setFeedPage,
} from 'store/feed/feed.actions'
import streamio from 'services/streamio'
import branchio from 'services/branchio'
import { handleError } from 'services/logger'
import vimeo from 'services/vimeo'
import { getUserFullName, getUserId, getUserAvatar } from 'utils/user'

export const TEAM_SAVE_TEAMS_OPTIONS = 'TEAM_SAVE_TEAMS_OPTIONS'
export const TEAM_UPDATE_TEAMS_OPTIONS_TEAM = 'TEAM_UPDATE_TEAMS_OPTIONS_TEAM'
export const TEAM_REMOVE_TEAMS_OPTIONS_TEAM = 'TEAM_REMOVE_TEAMS_OPTIONS_TEAM'
export const TEAM_SET_MORE_TEAMS_LIST = 'TEAM_SET_MORE_TEAMS_LIST'
export const TEAM_SET_MORE_TEAMS_PAGE = 'TEAM_SET_MORE_TEAMS_PAGE'
export const UPDATE_TEAM_PAIN_VIDEO_PART = 'UPDATE_TEAM_PAIN_VIDEO_PART'
export const SET_TEAM_PAIN_VIDEO_PARTS = 'SET_TEAM_PAIN_VIDEO_PARTS'
export const ADD_TEAM_PAIN_VIDEO_PART = 'ADD_TEAM_PAIN_VIDEO_PART'
export const SET_TEAM = 'SET_TEAM'
export const SET_LOADING = 'SET_LOADING'

export const getMoreTeams = (teamId, page, size, callback) => async (dispatch, getState) => {
  try {
    const res = await api.getMoreTeams(teamId, page, size)

    const { teamMoreTeams } = getState().team
    const newList = res.data?.length ? res.data : []
    const resList = !page ? newList : [...(teamMoreTeams || []), ...newList]
    dispatch(setTeamMoreTeams(resList))
    callback && callback(newList?.length)
  } catch (error) {
    handleError(error)
  }
}

export const setTeamMoreTeams = list => ({ type: TEAM_SET_MORE_TEAMS_LIST, list })

export const setTeamMoreTeamsPage = page => ({ type: TEAM_SET_MORE_TEAMS_PAGE, page })

export const afterVideoUploaded = ({ newTeam, newUrl, localActivity, callback }) => dispatch => {
  try {
    const onFeedSave = (newTeam, videoUrl) => {
      dispatch(
        addActivity({
          feedId: newTeam?.id,
          text: '',
          isVideoAttached: true,
          fileUrl: videoUrl,
          team: newTeam,
          callback: () => dispatch(setVideoPainFeedId(callback)),
        }),
      )
    }

    const onFeedEdit = (newTeam, videoUrl) => {
      const teamId = newTeam?.id
      const activityId = newTeam?.pain_video_feed_id

      if (newTeam?.pain_video_feed_id) {
        if (!localActivity?.foreign_id) {
          dispatch(
            returnAllCoinsFromActivity(newTeam, () => {
              streamio
                .removeActivity(teamId, activityId)
                .then(() => onFeedSave(newTeam, videoUrl))
                .catch(error => handleError(error))
            }),
          )
        } else {
          dispatch(
            editActivity({
              isVideoAttached: true,
              fileUrl: videoUrl,
              activityId,
              team: newTeam,
              callback: () => dispatch(setVideoPainFeedId(callback)),
            }),
          )
        }
        dispatch(setVideoInProgress(activityId, videoUrl))
      } else {
        onFeedSave(newTeam, videoUrl)
      }
    }

    if (newTeam?.pain_video_feed_id) {
      onFeedEdit(newTeam, newUrl)
    } else {
      onFeedSave(newTeam, newUrl)
    }
  } catch (error) {
    handleError(error)
  }
}

export const getTeamsOptions = callback => (dispatch, getState) => {
  const { user } = getState().user

  const defaultTeams = [{ id: 1, index: 1 }]
  const teams = user?.teams?.length ? user?.teams : defaultTeams

  const teamsOptions = teams
    ? teams?.map((item, index) => {
        return { ...item, index, name: item.name || `Startup #${index + 1}` }
      })
    : []

  const promisses = []
  teamsOptions.forEach(team => {
    if (team?.id) {
      promisses.push(getTeamById(team?.id))
    }
  })
  Promise.all(promisses).then(teamsOptionsWithData => {
    dispatch(saveTeamsOptions(teamsOptionsWithData))
    callback && callback(teamsOptionsWithData)
  })
}

export const saveTeamsOptions = teamsOptions => ({
  type: TEAM_SAVE_TEAMS_OPTIONS,
  teamsOptions,
})

export const updateTeamInTeamOptions = team => ({
  type: TEAM_UPDATE_TEAMS_OPTIONS_TEAM,
  team,
})

export const removeTeamInTeamOptions = team => ({
  type: TEAM_REMOVE_TEAMS_OPTIONS_TEAM,
  team,
})

export const getTeamVideoParts = (teamId, callback) => async dispatch => {
  try {
    const res = await api.getTeamPainVideoParts(teamId)
    dispatch(setTeamVideoParts(res.data || []))
    callback && callback()
  } catch (error) {
    handleError(error)
  }
}

export const setTeamVideoParts = teamPainVideoParts => ({
  type: SET_TEAM_PAIN_VIDEO_PARTS,
  teamPainVideoParts,
})

export const updateTeamVideoParts = (videoPart, teamPainVideoPart) => ({
  type: UPDATE_TEAM_PAIN_VIDEO_PART,
  videoPart,
  teamPainVideoPart,
})

export const removeAllVideoParts = (teamId, painVideoParts) => async dispatch => {
  try {
    await api.removeTeamPainVideoParts(teamId)
    dispatch(getTeamVideoParts(teamId))

    const videoParts = painVideoParts ? Object.keys(painVideoParts) : []
    videoParts.forEach(key => {
      const url = painVideoParts?.[key]?.url
      vimeo.removeVideo(url)
    })
  } catch (error) {
    handleError(error)
  }
}

export const addTeamVideoPart = ({ teamId, videoPart, url, oldUrl }) => async (
  dispatch,
  getState,
) => {
  try {
    await api.addTeamPainVideoPart(teamId, videoPart, url)

    if (oldUrl) {
      vimeo.removeVideo(oldUrl)
    }

    const { user } = getState().user
    dispatch(
      saveTeamVideoPart(videoPart, {
        user: {
          id: getUserId(user),
          avatar: getUserAvatar(user),
        },
        url,
      }),
    )
  } catch (error) {
    handleError(error)
  }
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const mergePainVideo = (
  team,
  teamPainVideoParts,
  activityTime,
  callback,
) => async dispatch => {
  try {
    const VIDEO_HEIGHT = 960
    const VIDEO_WIDTH = 540
    const VIDEO_FPS = 30
    const VIDEO_PIX_FMTS = 'rgb24'

    const videosOrder = ['hook', 'problem', 'solution', 'uniqueness', 'action']
    const mergedVideoParts = []
    const videos = []
    const vimeoUrls = []

    await asyncForEach(videosOrder, async videoType => {
      const videoPartUrl = teamPainVideoParts?.[videoType]?.url

      if (videoPartUrl) {
        const id = vimeo.getVideoId(videoPartUrl)
        const data = await vimeo.getExternalUrl(id)

        if (data?.uri) {
          vimeoUrls.push(videoPartUrl)
          videos.push(data?.uri)
          mergedVideoParts.push(videoType)
        }
      }
    })

    let videosUrls = ''
    videos?.forEach(url => {
      videosUrls += `-i ${url} `
    })
    let videosComplex = ''
    videos?.forEach((url, index) => {
      videosComplex += `
        [${index}:v]fps=${VIDEO_FPS},format=pix_fmts=${VIDEO_PIX_FMTS},
        scale='iw*min(${VIDEO_WIDTH}/iw\,${VIDEO_HEIGHT}/ih)':'ih*min(${VIDEO_WIDTH}/iw\,${VIDEO_HEIGHT}/ih)'[scaled${index}];
        [scaled${index}]pad=${VIDEO_WIDTH}:${VIDEO_HEIGHT}:
        '(${VIDEO_WIDTH}-iw*min(${VIDEO_WIDTH}/iw\,${VIDEO_HEIGHT}/ih))/2':'(${VIDEO_HEIGHT}-ih*min(${VIDEO_WIDTH}/iw\,${VIDEO_HEIGHT}/ih))/2'[padded${index}];
      `
    })
    videosComplex += ' '
    videos?.forEach((url, index) => {
      videosComplex += `[padded${index}][${index}:a]`
    })

    // create new video even for 1 video, because need to different urls
    if (videosUrls && videosComplex) {
      const outputFile = `${RNFS.CachesDirectoryPath}/pain_video_${team?.id}.mp4`

      const command = `${videosUrls} -filter_complex "${videosComplex} concat=n=${
        videos?.length
      }:v=1:a=1 [v][a]" -map "[v]" -map "[a]" -f mp4 -y ${outputFile}`
      FFmpegKit.executeAsync(command, async session => {
        const returnCode = await session.getReturnCode()

        if (ReturnCode.isSuccess(returnCode)) {
          const resFile =
            Platform.OS === 'ios'
              ? outputFile.replace('file:///', '').replace('file://', '')
              : outputFile
          const videoName = `Startup video by ${team?.name || team?.id}`
          vimeo
            .uploadPainVideoPart({
              videoPath: resFile,
              videoPathName: resFile,
              videoName,
            })
            .then(link => {
              dispatch(
                uploadMergedVideo({
                  team,
                  newUrl: link,
                  activityTime,
                  mergedVideoParts,
                  callback,
                }),
              )
            })
            .catch(error => {
              Alert.alert(
                'Sorry',
                'There was an error uploading your video - ' + error,
                [{ text: 'OK', onPress: () => {} }],
                {
                  cancelable: false,
                },
              )
            })
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
        } else {
          handleError(error)
        }
      })
    }
  } catch (error) {
    handleError(error)
  }
}

export const uploadMergedVideo = ({
  team,
  newUrl,
  activityTime,
  mergedVideoParts,
  callback,
}) => async dispatch => {
  try {
    if (newUrl) {
      const setMergedStatusForPainParts = async () => {
        let asyncFunctions = []
        mergedVideoParts?.forEach(item => {
          asyncFunctions.push(api.setTeamPainVideoPartMergedStatus(team?.id, item))
        })
        await Promise.all(asyncFunctions)

        dispatch(getTeamVideoParts(team?.id))
      }

      dispatch(
        updateTeam({
          team: { ...team, pain_video: newUrl },
          activityTime,
          callback: newTeam => {
            setMergedStatusForPainParts()
            callback && callback(newTeam)
          },
        }),
      )
    }
  } catch (error) {
    handleError(error)
  }
}

export const saveTeamVideoPart = (videoPart, teamPainVideoPart) => ({
  type: ADD_TEAM_PAIN_VIDEO_PART,
  videoPart,
  teamPainVideoPart,
})

export const closeTeam = (team, navigation, callback) => async dispatch => {
  try {
    const teamId = team?.id
    const painVideo = team?.pain_video
    const chatUrl = team?.pain_video_feed_chat
    const cardChats = team?.cards_chats

    await api.closeTeam(teamId)

    if (painVideo) {
      vimeo.removeVideo(painVideo)
    }
    if (chatUrl) {
      dispatch(removeOpenChannel(chatUrl))
    }
    if (cardChats?.length) {
      dispatch(removeOpenChannels(cardChats))
    }

    dispatch(afterLeaveTeam({ navigation, callback, team }))

    dispatch(removeChatsListItem('startupsChats', chatUrl))

    dispatch(updateAppInfoAfterTeamChange())
  } catch (error) {
    handleError(error)
  }
}

export const inviteToTeamByLink = ({ team, user }) => async dispatch => {
  const inviteUserId = getUserId(user)
  const teamId = team?.id
  const message = `${getUserFullName(user)} invites you to join a cool starup`

  const url = await branchio.inviteToTeam({ uniqueId: teamId, inviteUserId, teamId, message })
  dispatch(setShareData({ url }))
}

export const updateAppInfoAfterTeamChange = isFeedTeamInfoChanged => (dispatch, getState) => {
  if (isFeedTeamInfoChanged) {
    const { feedPagination, likedFeedPagination } = getState().feed

    if (streamio.client) {
      const { team } = getState().team
      if (team?.pain_video_feed_id) {
        dispatch(
          editActivity({
            isVideoAttached: false,
            fileUrl: null,
            activityId: team?.pain_video_feed_id,
            team,
          }),
        )
      }

      dispatch(setFeedPage(0))
      dispatch(getFeed(0, feedPagination.size))
      dispatch(setLikedFeedPage(0))
      dispatch(getLikedFeed(0, likedFeedPagination.size))
    }

    dispatch(updateFeedInfoAfterTeamChange())
  }
}

export const updateFeedInfoAfterTeamChange = () => (dispatch, getState) => {
  const { meFeedPagination } = getState().feed

  if (streamio.client) {
    dispatch(getMeFeed(0, meFeedPagination.size))
  }
}

export const removeStartupChatNotification = teamId => {
  api
    .removeStartupChatNotification(teamId)
    .then(res => {})
    .catch(error => handleError(error))
}

export const getTeam = (teamId, callback, isJoinTeam) => dispatch => {
  api
    .getTeam(teamId)
    .then(res => {
      dispatch(setTeam(res.data))

      dispatch(updateFeedInfoAfterTeamChange())

      if (isJoinTeam) {
        if (res.data?.pain_video_feed_id && res.data?.pain_video_feed_chat) {
          dispatch(
            joinStartupChatAsOperator(
              res.data?.pain_video_feed_id,
              res.data?.pain_video_feed_chat,
              res.data,
            ),
          )
        }
      }

      callback && callback(res.data)
    })
    .catch(error => handleError(error))
}

export const getTeamById = async teamId => {
  try {
    const res = await api.getTeam(teamId)
    return res.data
  } catch (error) {
    handleError(error)
  }
}

export const addNewTeam = callback => dispatch => {
  api
    .createNewTeam()
    .then(res => {
      dispatch(
        getUserTeams(() => {
          dispatch(setTeam(res.data))
          dispatch(updateTeamInTeamOptions(res.data))
          dispatch(updateFeedInfoAfterTeamChange())
          callback && callback(res.data)
        }),
      )
    })
    .catch(error => handleError(error))
}

export const updateTeam = ({ team, activityTime, callback, isTeamNameChanged }) => dispatch => {
  api
    .updateTeamDetails(team, activityTime)
    .then(res => {
      dispatch(setTeam(res.data))
      dispatch(updateTeamInTeamOptions(res.data))

      dispatch(updateAppInfoAfterTeamChange(isTeamNameChanged))
      if (isTeamNameChanged && team?.pain_video_feed_chat) {
        const teamChatUrl = res.data?.pain_video_feed_chat
        const teamName = res.data?.name
        dispatch(
          changeChatsListItem('startupsChats', {
            id: teamChatUrl,
            name: teamName,
          }),
        )
        dispatch(changeStartupChatInfo({ chatUrl: teamChatUrl, name: teamName }))
      }
      callback && callback(res.data)
    })
    .catch(error => {
      handleError(error)
      notifyAlert('My Team', 'Oops! Something went wrong. Please try again.')
      Promise.resolve()
    })
}

export const updateTeamAvatar = (team, file, callback) => dispatch => {
  api
    .uploadTeamAvatar(file, team?.id)
    .then(res => {
      const newTeam = res.data
      dispatch(setTeam(newTeam))
      dispatch(updateTeamInTeamOptions(newTeam))

      dispatch(updateAppInfoAfterTeamChange(true))

      const teamAvatar = newTeam?.avatar_small || newTeam?.avatar
      const teamChatUrl = newTeam?.pain_video_feed_chat
      dispatch(
        changeChatsListItem('startupsChats', {
          id: teamChatUrl,
          coverUrl: teamAvatar,
        }),
      )
      dispatch(changeStartupChatInfo({ chatUrl: teamChatUrl, coverUrl: teamAvatar }))
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      notifyAlert('My Team', 'Oops! Something went wrong. Please try again.')
      Promise.resolve()
    })
}

export const setTeam = team => ({
  type: SET_TEAM,
  team,
})

export const updateTeamMemberRole = (userId, role, callback) => (dispatch, getState) => {
  const { team } = getState().team
  api
    .updateTeamMemberRole(team?.id, userId, role)
    .then(res => {
      dispatch(setTeam(res.data))
      dispatch(updateTeamInTeamOptions(res.data))

      callback && callback()
    })
    .catch(error => {
      handleError(error)
      notifyAlert('My Team', 'Oops! Something went wrong. Please try again.')
      Promise.resolve()
    })
}

export const setTeamLoaded = isLoaded => ({ type: SET_LOADING, isLoaded })
