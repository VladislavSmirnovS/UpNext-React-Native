import {
  NETWORK_SET_FRIENDS_WITH_INVESTMENTS,
  NETWORK_SET_FRIENDS_WITH_INVESTMENTS_PAGE,
  NETWORK_SET_MENTORS,
  NETWORK_SET_MENTORS_PAGE,
} from 'store/network/network.actions'

const initialState = {
  friendsWithInvestments: null,
  friendsWithInvestmentsCount: 0,
  friendsWithInvestmentsPagination: {
    page: 0,
    size: 8,
  },

  mentors: null,
  mentorsCount: 0,
  mentorsPagination: {
    page: 0,
    size: 8,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_SET_FRIENDS_WITH_INVESTMENTS: {
      return {
        ...state,
        friendsWithInvestments: action.list,
        friendsWithInvestmentsCount: action.count,
      }
    }

    case NETWORK_SET_FRIENDS_WITH_INVESTMENTS_PAGE: {
      return {
        ...state,
        friendsWithInvestmentsPagination: {
          ...state.friendsWithInvestmentsPagination,
          page: action.page,
        },
      }
    }

    case NETWORK_SET_MENTORS: {
      return {
        ...state,
        mentors: action.mentors,
        mentorsCount: action.count,
      }
    }

    case NETWORK_SET_MENTORS_PAGE: {
      return {
        ...state,
        mentorsPagination: {
          ...state.mentorsPagination,
          page: action.page,
        },
      }
    }

    default:
      return state
  }
}
