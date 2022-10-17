import {
  CHAT_SET_CHATS_LISTS,
  CHAT_SET_CHATS_LIST_PAGE,
  CHAT_SET_CHATS_LIST_REQUEST_INDEX,
  CHAT_SET_CHATS_LIST_IS_END,
  CHAT_REMOVE_CHATSLIST_ITEM,
  RESET_CHATS_LISTS,
  CHAT_ADD_CHATSLIST_ITEM,
  CHAT_CHANGE_CHATSLIST_ITEM,
  CHAT_SET_ADDITONAL_INFO,
  SET_OPEN_CHANNEL_LIST_QUERY,
  SET_GROUP_CHANNEL_LIST_QUERY,
  SET_CHANNEL_LIST,
  SET_CURRENT_CHANNEL,
  SET_MESSAGE_LIST,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  ADD_MESSAGE_TO_CHANNEL,
  CHANNEL_RESET,
  SET_CARDS_CHANNELS,
  SET_CARDS_MESSAGES,
  ADD_CARDS_MESSAGE,
  ADD_MESSAGE_TO_CARDS_CHANNEL,
  CHAT_SAVE_DRAFT,
} from 'store/chat/chat.actions'

const defaultState = {
  currentChannel: null,
  messageList: null,

  openChannelListQuery: null,
  groupChannelListQuery: null,

  draft: {},

  channelList: null,

  chatsLists: {
    requests: null,
    personalChats: null,
    startupsChats: null,
    likedStartupsChats: null,
    pendings: null,
  },
  chatsListPagination: {
    requests: [
      'get_friends_requests',
      'get_personal_chats',
      'get_startups_chats',
      'get_liked_startups_chats',
      'get_friends_pendings',
    ],
    requestIndex: 0,
    page: 0,
    size: 10,
    isEnd: false,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHAT_CHANGE_CHATSLIST_ITEM: {
      return {
        ...state,
        chatsLists: {
          ...state.chatsLists,
          [action.name]: state.chatsLists[action.name]?.length
            ? state.chatsLists[action.name].map(item =>
                item.id === action.item.id ? { ...item, ...action.item } : item,
              )
            : state.chatsLists[action.name],
        },
      }
    }

    case CHAT_SET_ADDITONAL_INFO: {
      return {
        ...state,
        chatsLists: {
          ...state.chatsLists,
          [action.name]: state.chatsLists[action.name]?.length
            ? state.chatsLists[action.name].map(item => {
                const index = action.additionalInfo?.findIndex(
                  user => user.id === item.secondMember?.userId,
                )
                return index !== -1
                  ? {
                      ...item,
                      secondMember: {
                        ...item.secondMember,
                        ...action.additionalInfo[index],
                      },
                    }
                  : item
              })
            : state.chatsLists[action.name],
        },
      }
    }

    case RESET_CHATS_LISTS: {
      return {
        ...state,
        chatsLists: {
          requests: null,
          pendings: null,
          personalChats: null,
          startupsChats: null,
          likedStartupsChats: null,
        },
        chatsListPagination: {
          ...state.chatsListPagination,
          requestIndex: 0,
          page: 0,
          isEnd: false,
        },
      }
    }

    case CHAT_ADD_CHATSLIST_ITEM: {
      return {
        ...state,
        chatsLists: {
          ...state.chatsLists,
          [action.name]: [action.item, ...(state.chatsLists[action.name] || [])],
        },
      }
    }

    case CHAT_REMOVE_CHATSLIST_ITEM: {
      return {
        ...state,
        chatsLists: {
          ...state.chatsLists,
          [action.name]: state.chatsLists[action.name]?.length
            ? state.chatsLists[action.name].filter(item => item.id !== action.id)
            : state.chatsLists[action.name],
        },
      }
    }

    case CHAT_SET_CHATS_LISTS: {
      return {
        ...state,
        chatsLists: {
          ...state.chatsLists,
          [action.name]: action.list,
        },
      }
    }

    case CHAT_SET_CHATS_LIST_PAGE: {
      return {
        ...state,
        chatsListPagination: {
          ...state.chatsListPagination,
          page: action.page,
        },
      }
    }

    case CHAT_SET_CHATS_LIST_REQUEST_INDEX: {
      return {
        ...state,
        chatsListPagination: {
          ...state.chatsListPagination,
          requestIndex: action.requestIndex,
        },
      }
    }

    case CHAT_SET_CHATS_LIST_IS_END: {
      return {
        ...state,
        chatsListPagination: {
          ...state.chatsListPagination,
          isEnd: action.isEnd,
        },
      }
    }

    case SET_OPEN_CHANNEL_LIST_QUERY: {
      return {
        ...state,
        openChannelListQuery: action.openChannelListQuery,
      }
    }

    case SET_GROUP_CHANNEL_LIST_QUERY: {
      return {
        ...state,
        groupChannelListQuery: action.groupChannelListQuery,
      }
    }

    case SET_CHANNEL_LIST: {
      const hightPriority = action.channelList?.filter(item => item.unreadMessageCount > 0)
      const nextPriority = action.channelList?.filter(
        item => item.unreadMessageCount === 0 || !item.unreadMessageCount,
      )
      return {
        ...state,
        channelList: action.channelList
          ? [...(hightPriority || []), ...(nextPriority || [])]
          : null,
      }
    }

    case SET_CURRENT_CHANNEL: {
      return {
        ...state,
        currentChannel: action.currentChannel,
      }
    }

    case SET_MESSAGE_LIST: {
      return {
        ...state,
        messageList: action.messageList,
      }
    }

    case ADD_MESSAGE: {
      return {
        ...state,
        messageList: [...state.messageList, action.message],
      }
    }

    case REMOVE_MESSAGE: {
      return {
        ...state,
        messageList: state.messageList
          ? state.messageList.filter(item => item.messageId !== action.messageId)
          : state.messageList,
      }
    }

    case ADD_MESSAGE_TO_CHANNEL: {
      let newMessageList = state.messageList ? [...state.messageList] : null
      let list = state.channelList ? [...state.channelList] : null

      if (newMessageList && action.channel.url === state.currentChannel.url) {
        newMessageList.push(action.message)
      } else if (list) {
        const currentChannelIndex = list.findIndex(item => item.url === action.channel.url)

        if (currentChannelIndex === -1) {
          list.unshift(action.channel)
        }
        if (currentChannelIndex !== -1 && currentChannelIndex !== 0) {
          list = list.filter(item => item.url !== action.channel.url)
          list.unshift(action.channel)
        }
      }

      return {
        ...state,
        messageList: newMessageList,
        channelList: list,
      }
    }

    case CHANNEL_RESET: {
      return {
        ...state,
        currentChannel: null,
        messageList: null,
      }
    }

    case SET_CARDS_CHANNELS: {
      return {
        ...state,
        [`${action.chatKey}-channel`]: action.channel,
      }
    }

    case SET_CARDS_MESSAGES: {
      return {
        ...state,
        [`${action.chatKey}-messages`]: action.messages,
      }
    }

    case ADD_CARDS_MESSAGE: {
      return {
        ...state,
        [`${action.chatKey}-messages`]: [
          ...(state[`${action.chatKey}-messages`] || []),
          action.message,
        ],
      }
    }

    case ADD_MESSAGE_TO_CARDS_CHANNEL: {
      return {
        ...state,
        [`${action.chatKey}-channel`]: action.channel,
        [`${action.chatKey}-messages`]: [
          ...(state[`${action.chatKey}-messages`] || []),
          action.message,
        ],
      }
    }

    case CHAT_SAVE_DRAFT: {
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.url]: action.message,
        },
      }
    }

    default:
      return state
  }
}
