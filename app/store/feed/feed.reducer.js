import {
  FEED_UPDATE_ACTIVITY_CHAT_URL,
  SET_FEED_LIST,
  SET_FOLLOW_FEED_LIST,
  SET_ME_FEED_LIST,
  SET_FEED_PAGE,
  SET_FOLLOW_FEED_PAGE,
  SET_ME_FEED_PAGE,
  FEED_UPDATE_ACTIVITY_FEED,
  FEED_UPDATE_ACTIVITY_INVESTMENTS,
  FEED_UPDATE_ACTIVITY_MY,
  FEED_VIDEO_VIEW_EVENTS_SET_LIST,
  FEED_VIDEO_VIEW_EVENTS_SET_PAGE,
  FEED_VIDEO_COIN_EVENTS_SET_LIST,
  FEED_VIDEO_COIN_EVENTS_SET_PAGE,
  FEED_HASHTAGS_SET_LIST,
  FEED_HASHTAGS_SET_PAGE,
  FEED_SET_HASHTAG_FILTER,
  FEED_UPDATE_FIRST_EXISTED_IDS,
  SET_LIKED_FEED_LIST,
  SET_LIKED_FEED_PAGE,
  SET_USER_LIKED_FEED_LIST,
  SET_USER_LIKED_FEED_PAGE,
  FEED_REMOVE_ACTIVITY,
  FEED_REMOVE_ACTIVITY_INVESTMENTS,
  FEED_ADD_NEW_TO_QUEUE,
  FEED_REMOVE_FROM_QUEUE,
  FEED_UPDATE_LIKED_FEED_LIST,
} from 'store/feed/feed.actions'

const defaultState = {
  feedHashtagFilter: '',

  feedList: null,
  feedNewQueue: [],
  feedFirstEsixtedIds: [],
  feedPagination: {
    page: 0,
    size: 5,
    next: false,
  },

  followFeedList: null,
  followFeedCount: 0,
  followFeedPagination: {
    page: 0,
    size: 5,
  },

  likedFeedList: null,
  likedCount: 0,
  likedFeedPagination: {
    page: 0,
    size: 5,
  },

  userLikedFeedList: null,
  userLikedCount: 0,
  userLikedFeedPagination: {
    page: 0,
    size: 5,
  },

  meFeedList: null,
  meFeedPagination: {
    page: 0,
    size: 3,
    next: false,
  },

  feedVideoViewEvents: null,
  feedVideoViewEventsCount: 0,
  feedVideoViewEventsPagination: {
    page: 0,
    size: 10,
  },

  feedVideoCoinEvents: null,
  feedVideoCoinEventsCount: 0,
  feedVideoCoinEventsPagination: {
    page: 0,
    size: 10,
  },

  feedHashtags: null,
  feedHashtagsCount: 0,
  feedHashtagsPagination: {
    page: 0,
    size: 10,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FEED_ADD_NEW_TO_QUEUE: {
      return {
        ...state,
        feedNewQueue: [...state.feedNewQueue, action.activityId],
      }
    }

    case FEED_REMOVE_FROM_QUEUE: {
      return {
        ...state,
        feedNewQueue: state.feedNewQueue?.filter(activityId => !action?.ids.includes(activityId)),
      }
    }

    case FEED_UPDATE_FIRST_EXISTED_IDS: {
      return {
        ...state,
        feedFirstEsixtedIds: action.feedFirstEsixtedIds,
      }
    }

    case FEED_UPDATE_ACTIVITY_CHAT_URL: {
      const update = list => {
        return list.map(item => {
          return item?.id === action.activityId ? { ...item, chatUrl: action.chatUrl } : item
        })
      }

      return {
        ...state,
        feedList: state.feedList?.length ? update(state.feedList) : state.feedList,
        followFeedList: state.followFeedList?.length
          ? update(state.followFeedList)
          : state.followFeedList,
        meFeedList: state.meFeedList?.length ? update(state.meFeedList) : state.meFeedList,
      }
    }

    case FEED_UPDATE_ACTIVITY_FEED: {
      return {
        ...state,
        feedList: state.feedList?.length
          ? state.feedList?.map(item => {
              return item?.id === action.activity?.id ? { ...item, ...action.activity } : item
            })
          : [],
      }
    }

    case FEED_REMOVE_ACTIVITY: {
      return {
        ...state,
        feedList: state.feedList
          ? state.feedList?.filter(item => item?.id !== action.activityId)
          : null,
      }
    }

    case FEED_REMOVE_ACTIVITY_INVESTMENTS: {
      return {
        ...state,
        likedFeedList: state.likedFeedList
          ? state.likedFeedList?.filter(item => item?.id !== action.activityId)
          : null,
      }
    }

    case FEED_UPDATE_LIKED_FEED_LIST: {
      return {
        ...state,
        likedFeedList: state.likedFeedList?.length
          ? state.likedFeedList?.map(item => {
              return item?.id === action?.activity?.id ? { ...item, ...action.activity } : item
            })
          : [],
      }
    }

    case FEED_UPDATE_ACTIVITY_INVESTMENTS: {
      return {
        ...state,
        followFeedList: state.followFeedList?.length
          ? state.followFeedList?.map(item => {
              return item?.id === action?.activity?.id ? { ...item, ...action.activity } : item
            })
          : [],
      }
    }

    case FEED_UPDATE_ACTIVITY_MY: {
      return {
        ...state,
        meFeedList: state.meFeedList?.length
          ? state.meFeedList?.map(item => {
              return item?.id === action?.activity?.id ? { ...item, ...action.activity } : item
            })
          : [],
      }
    }

    case SET_FEED_LIST: {
      return {
        ...state,
        feedList: action.feedList,
        feedPagination: {
          ...state.feedPagination,
          next: action.next,
        },
      }
    }

    case SET_FOLLOW_FEED_LIST: {
      return {
        ...state,
        followFeedList: action.list,
        followFeedCount: action.count,
      }
    }

    case SET_LIKED_FEED_LIST: {
      return {
        ...state,
        likedFeedList: action.list,
        likedCount: action.count,
      }
    }

    case SET_USER_LIKED_FEED_LIST: {
      return {
        ...state,
        userLikedFeedList: action.list,
        userLikedCount: action.count,
      }
    }

    case SET_ME_FEED_LIST: {
      return {
        ...state,
        meFeedList: action.meFeedList,
        meFeedPagination: {
          ...state.meFeedPagination,
          next: action.next,
        },
      }
    }

    case SET_FEED_PAGE: {
      return {
        ...state,
        feedPagination: {
          ...state.feedPagination,
          page: action.page,
        },
      }
    }

    case SET_LIKED_FEED_PAGE: {
      return {
        ...state,
        likedFeedPagination: {
          ...state.likedFeedPagination,
          page: action.page,
        },
      }
    }

    case SET_USER_LIKED_FEED_PAGE: {
      return {
        ...state,
        userLikedFeedPagination: {
          ...state.userLikedFeedPagination,
          page: action.page,
        },
      }
    }

    case SET_FOLLOW_FEED_PAGE: {
      return {
        ...state,
        followFeedPagination: {
          ...state.followFeedPagination,
          page: action.page,
        },
      }
    }

    case SET_ME_FEED_PAGE: {
      return {
        ...state,
        meFeedPagination: {
          ...state.meFeedPagination,
          page: action.page,
        },
      }
    }

    case FEED_VIDEO_VIEW_EVENTS_SET_LIST: {
      return {
        ...state,
        feedVideoViewEvents: action.list,
        feedVideoViewEventsCount: action.count,
      }
    }

    case FEED_VIDEO_VIEW_EVENTS_SET_PAGE: {
      return {
        ...state,
        feedVideoViewEventsPagination: {
          ...state.feedVideoViewEventsPagination,
          page: action.page,
        },
      }
    }

    case FEED_VIDEO_COIN_EVENTS_SET_LIST: {
      return {
        ...state,
        feedVideoCoinEvents: action.list,
        feedVideoCoinEventsCount: action.count,
      }
    }

    case FEED_VIDEO_COIN_EVENTS_SET_PAGE: {
      return {
        ...state,
        feedVideoCoinEventsPagination: {
          ...state.feedVideoCoinEventsPagination,
          page: action.page,
        },
      }
    }

    case FEED_HASHTAGS_SET_LIST: {
      return {
        ...state,
        feedHashtags: action.list,
        feedHashtagsCount: action.count,
      }
    }

    case FEED_HASHTAGS_SET_PAGE: {
      return {
        ...state,
        feedHashtagsPagination: {
          ...state.feedHashtagsPagination,
          page: action.page,
        },
      }
    }

    case FEED_SET_HASHTAG_FILTER: {
      return {
        ...state,
        feedHashtagFilter: action.hashtag,
      }
    }

    default:
      return state
  }
}
