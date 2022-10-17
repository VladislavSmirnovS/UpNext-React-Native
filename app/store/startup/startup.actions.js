import api from 'services/api'
import { handleError } from 'services/logger'
import streamio from 'services/streamio'
import { resetAllFeed } from 'store/feed/feed.actions'

export const STARTUP_SET_ALL_CARDS_VIDEOS = 'STARTUP_SET_ALL_CARDS_VIDEOS'
export const CARD_VIDEOS_SET_DONE = 'CARD_VIDEOS_SET_DONE'
export const CARD_VIDEOS_SET_URL = 'CARD_VIDEOS_SET_URL'
export const PAGE_ADD_STARTUP = 'PAGE_ADD_STARTUP'

export const getStartupAllCardsVideos = callback => (dispatch, getState) => {
  api
    .getStartupVideos()
    .then(res => {
      dispatch(setStartupAllCardsVideos(res.data))
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const doneCardVideo = (key, videoId, callback) => (dispatch, getState) => {
  api
    .doneCardVideo(videoId)
    .then(res => {
      dispatch(setCardVideoDone(key, videoId))
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const updateCardVideoItem = item => dispatch => {
  // api.updateCardVideoItem(item?.id, item?.vimeoData)
  dispatch(setCardVideoItem(item))
}

export const updateTextHashtags = (activityId, hashtags) => dispatch => {
  streamio
    .editActivityFields({ activityId, hashtags })
    .then(() => {
      dispatch(resetAllFeed())
    })
    .catch(error => handleError(error))
}

export const setStartupAllCardsVideos = videos => ({ type: STARTUP_SET_ALL_CARDS_VIDEOS, videos })

export const setCardVideoDone = (key, video_id) => ({ type: CARD_VIDEOS_SET_DONE, key, video_id })

export const setCardVideoItem = item => ({ type: CARD_VIDEOS_SET_URL, item })

export const setPageAddStartUp = currentPage => ({ type: PAGE_ADD_STARTUP, currentPage })
