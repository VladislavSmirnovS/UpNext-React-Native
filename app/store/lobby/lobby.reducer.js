import {
  LOBBY_SET_MEMBERS,
  LOBBY_SET_MEMBERS_PAGE,
  LOBBY_SET_MEMBERS_FILTERS,
  LOBBY_MEMBERS_SET_CHAT_PENDING_STATUS,
  LOBBY_SET_MEMBERS_SEARCH,
} from 'store/lobby/lobby.actions'

const initialState = {
  members: null,
  membersCount: 0,
  membersPagination: {
    page: 0,
    size: 10,
  },
  membersSearch: '',
  membersFilters: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOBBY_SET_MEMBERS: {
      return {
        ...state,
        members: action.members,
        membersCount: action.count,
      }
    }

    case LOBBY_SET_MEMBERS_PAGE: {
      return {
        ...state,
        membersPagination: {
          ...state.membersPagination,
          page: action.page,
        },
      }
    }

    case LOBBY_SET_MEMBERS_SEARCH:
      return {
        ...state,
        membersSearch: action.membersSearch,
      }

    case LOBBY_SET_MEMBERS_FILTERS: {
      return {
        ...state,
        membersFilters: action.filters,
        membersSearch: '',
        members: null,
        membersCount: 0,
        membersPagination: {
          ...state.membersPagination,
          page: 0,
        },
      }
    }

    case LOBBY_MEMBERS_SET_CHAT_PENDING_STATUS: {
      return {
        ...state,
        members: state.members?.map(item => {
          if (item?.id === action?.id) {
            return { ...item, friend_status: action.status }
          }
          return item
        }),
      }
    }

    default:
      return state
  }
}
