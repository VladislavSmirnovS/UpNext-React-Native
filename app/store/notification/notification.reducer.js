import {
  NOTIFICATION_GET_LIST,
  NOTIFICATION_SET_FILTER,
  NOTIFICATION_SET_PAGE,
} from 'store/notification/notification.actions'

const initialState = {
  filter: { key: 'all_activity', title: 'All activity', icon: 'notifications' },

  notifications: null,
  notificationsCount: 0,
  notificationsPagination: {
    page: 0,
    size: 20,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_GET_LIST: {
      return {
        ...state,
        notifications: action.list,
        notificationsCount: action.count,
      }
    }

    case NOTIFICATION_SET_FILTER: {
      return {
        ...state,
        filter: action.filter,
      }
    }

    case NOTIFICATION_SET_PAGE: {
      return {
        ...state,
        notificationsPagination: {
          ...state.notificationsPagination,
          page: action.page,
        },
      }
    }

    default:
      return state
  }
}
