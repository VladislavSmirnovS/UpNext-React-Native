import {
  SET_SELECT_OPTIONS,
  SET_PAGES_WEBVIEWS,
  SET_OVERFLOW_ANIMATION,
  SET_APP_ALERT,
  SET_SHOWN_NOTIFICATION_FUNC,
  SET_ROUTER_ACTION,
  SET_IS_SHOW_NOT_LOGIN_ALERT,
  SET_NEW_NOTIFICATIONS_COUNT,
  SET_SHARE_DATA,
  TOGGLE_SHOW_SEARCH_HASHTAG_MODAL,
  SAVE_VIDEO_PROGRESS,
  TOGGLE_CAMERA,
} from 'store/app/app.actions'

const defaultState = {
  initialized: false,
  savedVideoProgress: null,

  selectOptions: null,
  pagesWebviews: null,
  overflowAnimation: null,
  appAlert: null,
  showNotification: null,
  routeAction: null,
  isShowNotLoginAlert: false,
  newNotificationsCount: 0,

  shareData: null,
  isShowSearchHashtagModal: false,

  camera: {
    isVisible: false,
    cameraOptions: {
      type: 'video',
    },
    launchImageOptions: {},
    onImageLibraryLoad: () => {},
    callback: () => {},
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_CAMERA: {
      return {
        ...state,
        camera: action.cameraProps,
      }
    }

    case SAVE_VIDEO_PROGRESS:
      return {
        ...state,
        savedVideoProgress: action.savedVideoProgress,
      }

    case TOGGLE_SHOW_SEARCH_HASHTAG_MODAL:
      return {
        ...state,
        isShowSearchHashtagModal: action.isShow,
      }

    case SET_SELECT_OPTIONS:
      return {
        ...state,
        initialized: true,
        selectOptions: action.selectOptions,
      }

    case SET_PAGES_WEBVIEWS:
      return {
        ...state,
        pagesWebviews: action.pagesWebviews,
      }

    case SET_OVERFLOW_ANIMATION:
      return {
        ...state,
        overflowAnimation: action.overflowAnimation,
      }

    case SET_APP_ALERT:
      return {
        ...state,
        appAlert: action.appAlert,
      }

    case SET_SHOWN_NOTIFICATION_FUNC:
      return {
        ...state,
        showNotification: action.showNotification,
      }

    case SET_ROUTER_ACTION:
      return {
        ...state,
        routeAction: action.routeAction,
      }

    case SET_IS_SHOW_NOT_LOGIN_ALERT:
      return {
        ...state,
        isShowNotLoginAlert: action.isShowNotLoginAlert,
      }

    case SET_NEW_NOTIFICATIONS_COUNT:
      return {
        ...state,
        newNotificationsCount: action.count,
      }

    case SET_SHARE_DATA:
      return {
        ...state,
        shareData: action.shareData,
      }

    default:
      return state
  }
}
