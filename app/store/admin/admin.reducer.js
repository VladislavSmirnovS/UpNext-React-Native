import {
  ADMIN_SET_IS_LOADING,
  ADMIN_SET_CODES_LIST,
  ADMIN_SET_SOCIALS_LIST,
  ADMIN_SET_CODES_LIST_PAGE,
  ADMIN_SET_SOCIALS_LIST_PAGE,
  ADMIN_SOCIALS_LOGIN_TYPE_COUNTS,
  ADMIN_SET_CODES_SEARCH,
  ADMIN_SET_SOCIALS_SEARCH,
  ADMIN_SET_TEAMS_LIST,
  ADMIN_SET_TEAMS_SEARCH,
  ADMIN_SET_TEAMS_LIST_PAGE,
  ADMIN_SET_TEAM_IN_TEAMS_LIST,
  ADMIN_SET_REPORTS_LIST,
  ADMIN_SET_REPORTS_LIST_PAGE,
  ADMIN_SET_REPORTS_SEARCH,
  ADMIN_SET_REPORT_IN_REPORT_LIST,
  ADMIN_SET_SESSION_STATS,
  ADMIN_SET_STATS_LIST_PAGE,
} from 'store/admin/admin.actions'

const defaultState = {
  isLoading: false,

  codesList: null,
  codesListCount: 0,
  codesSearch: '',
  codesListPagination: {
    page: 0,
    size: 5,
  },

  socialsList: null,
  socialsListCount: 0,
  socialsSearch: '',
  socialsListPagination: {
    page: 0,
    size: 5,
  },

  socialsLoginTypeCounts: null,

  teamsList: null,
  teamsListCount: 0,
  teamsSearch: '',
  teamsListPagination: {
    page: 0,
    size: 5,
  },

  reportsList: null,
  reportsListCount: 0,
  reportsSearch: '',
  reportsListPagination: {
    page: 0,
    size: 5,
  },

  sessionStats: null,
  sessionStatsPagination: {
    page: 0,
    size: 2,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADMIN_SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    case ADMIN_SET_CODES_LIST:
      return {
        ...state,
        codesList: action.list,
        codesListCount: action.count,
      }

    case ADMIN_SET_SOCIALS_LIST:
      return {
        ...state,
        socialsList: action.list,
        socialsListCount: action.count,
      }

    case ADMIN_SET_CODES_LIST_PAGE:
      return {
        ...state,
        codesListPagination: {
          ...state.codesListPagination,
          page: action.page,
        },
      }

    case ADMIN_SET_SOCIALS_LIST_PAGE:
      return {
        ...state,
        socialsListPagination: {
          ...state.socialsListPagination,
          page: action.page,
        },
      }

    case ADMIN_SOCIALS_LOGIN_TYPE_COUNTS:
      return {
        ...state,
        socialsLoginTypeCounts: action.socialsLoginTypeCounts,
      }

    case ADMIN_SET_CODES_SEARCH:
      return {
        ...state,
        codesSearch: action.codesSearch,
      }

    case ADMIN_SET_SOCIALS_SEARCH:
      return {
        ...state,
        socialsSearch: action.socialsSearch,
      }

    case ADMIN_SET_TEAMS_LIST:
      return {
        ...state,
        teamsList: action.list,
        teamsListCount: action.count,
      }

    case ADMIN_SET_TEAMS_SEARCH:
      return {
        ...state,
        teamsSearch: action.teamsSearch,
      }

    case ADMIN_SET_TEAMS_LIST_PAGE:
      return {
        ...state,
        teamsListPagination: {
          ...state.teamsListPagination,
          page: action.page,
        },
      }

    case ADMIN_SET_TEAM_IN_TEAMS_LIST:
      return {
        ...state,
        teamsList: state.teamsList.map(item => {
          return item?.id === action.team?.id ? action.team : item
        }),
      }

    case ADMIN_SET_REPORTS_LIST:
      return {
        ...state,
        reportsList: action.list,
        reportsListCount: action.count,
      }

    case ADMIN_SET_REPORTS_LIST_PAGE:
      return {
        ...state,
        reportsListPagination: {
          ...state.reportsListPagination,
          page: action.page,
        },
      }

    case ADMIN_SET_REPORTS_SEARCH:
      return {
        ...state,
        reportsSearch: action.reportsSearch,
      }

    case ADMIN_SET_REPORT_IN_REPORT_LIST:
      return {
        ...state,
        reportsList: state.reportsList.map(item => {
          return item?.report_team?.id === action.team?.id
            ? { ...item, report_team: action.team }
            : item
        }),
      }

    case ADMIN_SET_SESSION_STATS:
      return {
        ...state,
        sessionStats: action.sessionStats,
      }

    case ADMIN_SET_STATS_LIST_PAGE:
      return {
        ...state,
        sessionStatsPagination: {
          ...state.sessionStatsPagination,
          page: action.page,
        },
      }

    default:
      return state
  }
}
