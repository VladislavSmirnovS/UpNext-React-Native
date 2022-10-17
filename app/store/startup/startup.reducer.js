import {
  STARTUP_SET_ALL_CARDS_VIDEOS,
  CARD_VIDEOS_SET_URL,
  CARD_VIDEOS_SET_DONE,
  PAGE_ADD_STARTUP,
} from 'store/startup/startup.actions'

const defaultState = {
  startupAllCardsVideos: [],
  videosByCards: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case STARTUP_SET_ALL_CARDS_VIDEOS: {
      let videosByCards = {}
      const cards = [101, 100, 11, 15, 1, 3, 17, 7, 6]
      cards.forEach(key => {
        videosByCards[key] = action.videos?.filter(item => +item.card_id === +key)
      })

      return {
        ...state,
        startupAllCardsVideos: action.videos,
        videosByCards,
      }
    }

    case PAGE_ADD_STARTUP:
      return { ...state, currentPage: action.currentPage };

    case CARD_VIDEOS_SET_URL: {
      const getItemWithUpdates = item => (item?.id === action.item?.id ? action.item : item)

      return {
        ...state,
        startupAllCardsVideos: state.startupAllCardsVideos.map(getItemWithUpdates),
      }
    }

    case CARD_VIDEOS_SET_DONE: {
      const getItemWithDoneStatus = item =>
        item?.id === action.video_id ? { ...item, is_done: true } : item

      return {
        ...state,
        videosByCards: {
          ...state.videosByCards,
          [action.key]: state.videosByCards[action.key].map(getItemWithDoneStatus),
        },
      }
    }

    default:
      return state
  }
}
