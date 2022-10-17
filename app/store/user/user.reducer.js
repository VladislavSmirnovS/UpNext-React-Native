import {
  INVITE_VIEW_EVENTS_SET_LIST,
  INVITE_VIEW_EVENTS_SET_PAGE,
  INVITE_COIN_EVENTS_SET_LIST,
  INVITE_COIN_EVENTS_SET_PAGE,
  SET_USER,
  SET_USER_TUTORIALS,
  SET_USER_COINS,
  USER_SET_REPORT_VIDEOS,
  SET_USER_IMAGE_LOADING,
  SET_USER_LOADING,
  SET_BRANCH_OBJECT,
  SET_IS_LOGGINING,
} from 'store/user/user.actions'

const defaultState = {
  user: null,
  adminUser: false,
  initialized: false,
  isUserImageLoading: false,
  isUserLoading: false,
  branchObj: null,
  userReportVideos: null,

  isLoggining: false,

  inviteViewEvents: null,
  inviteViewEventsCount: 0,
  inviteViewEventsPagination: {
    page: 0,
    size: 10,
  },

  inviteCoinEvents: null,
  inviteCoinEventsCount: 0,
  inviteCoinEventsPagination: {
    page: 0,
    size: 10,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        initialized: true,
        user: action.user,
        adminUser: action.user && action.user.is_admin ? action.user : null,
        isUserImageLoading: false,
      }
    }

    case SET_USER_TUTORIALS: {
      return {
        ...state,
        tutorials: action.tutorials,
      }
    }

    case SET_USER_COINS: {
      return {
        ...state,
        coins: action.coins,
      }
    }

    case USER_SET_REPORT_VIDEOS: {
      return {
        ...state,
        userReportVideos: action.userReportVideos,
      }
    }

    case SET_USER_IMAGE_LOADING: {
      return {
        ...state,
        isUserImageLoading: action.isLoading,
      }
    }

    case SET_USER_LOADING: {
      return {
        ...state,
        isUserLoading: action.isLoading,
      }
    }

    case SET_BRANCH_OBJECT: {
      return {
        ...state,
        branchObj: action.branchObj,
      }
    }

    case SET_IS_LOGGINING: {
      return {
        ...state,
        isLoggining: action.isLoggining,
      }
    }

    case INVITE_VIEW_EVENTS_SET_LIST: {
      return {
        ...state,
        inviteViewEvents: action.list,
        inviteViewEventsCount: action.count,
      }
    }

    case INVITE_VIEW_EVENTS_SET_PAGE: {
      return {
        ...state,
        inviteViewEventsPagination: {
          ...state.inviteViewEventsPagination,
          page: action.page,
        },
      }
    }

    case INVITE_COIN_EVENTS_SET_LIST: {
      return {
        ...state,
        inviteCoinEvents: action.list,
        inviteCoinEventsCount: action.count,
      }
    }

    case INVITE_COIN_EVENTS_SET_PAGE: {
      return {
        ...state,
        inviteCoinEventsPagination: {
          ...state.inviteCoinEventsPagination,
          page: action.page,
        },
      }
    }

    default:
      return state
  }
}
