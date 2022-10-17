import {
  TEAM_SAVE_TEAMS_OPTIONS,
  TEAM_UPDATE_TEAMS_OPTIONS_TEAM,
  TEAM_REMOVE_TEAMS_OPTIONS_TEAM,
  TEAM_SET_MORE_TEAMS_LIST,
  TEAM_SET_MORE_TEAMS_PAGE,
  UPDATE_TEAM_PAIN_VIDEO_PART,
  SET_TEAM_PAIN_VIDEO_PARTS,
  ADD_TEAM_PAIN_VIDEO_PART,
  SET_TEAM,
  SET_LOADING,
} from 'store/team/team.actions'

const defaultState = {
  team: null,
  teamPainVideoParts: null,

  initialized: false,
  isLoaded: false,

  teamsOptions: [],

  teamMoreTeams: null,
  teamMoreTeamsPagination: {
    page: 0,
    size: 10,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TEAM_SET_MORE_TEAMS_LIST: {
      return {
        ...state,
        teamMoreTeams: action.list,
      }
    }

    case TEAM_SET_MORE_TEAMS_PAGE: {
      return {
        ...state,
        teamMoreTeamsPagination: {
          ...state.teamMoreTeamsPagination,
          page: action.page,
        },
      }
    }

    case UPDATE_TEAM_PAIN_VIDEO_PART: {
      const newRes = { ...state.teamPainVideoParts }
      newRes[action.videoPart] = { ...newRes?.[action.videoPart], ...action.teamPainVideoPart }

      return {
        ...state,
        teamPainVideoParts: newRes,
      }
    }

    case SET_TEAM_PAIN_VIDEO_PARTS: {
      const newRes = {}
      action?.teamPainVideoParts?.forEach(item => {
        newRes[(item?.video_part_type)] = item
      })

      return {
        ...state,
        teamPainVideoParts: newRes,
      }
    }

    case ADD_TEAM_PAIN_VIDEO_PART: {
      const newRes = { ...state.teamPainVideoParts }
      newRes[action.videoPart] = action.teamPainVideoPart

      return {
        ...state,
        teamPainVideoParts: newRes,
      }
    }

    case TEAM_SAVE_TEAMS_OPTIONS: {
      return {
        ...state,
        teamsOptions: action.teamsOptions,
      }
    }

    case TEAM_UPDATE_TEAMS_OPTIONS_TEAM: {
      const isAlreadyExistIndex = state.teamsOptions?.findIndex(
        item => item?.id === action.team?.id,
      )
      const res =
        isAlreadyExistIndex !== -1
          ? state.teamsOptions?.map(item => (item?.id === action.team?.id ? action.team : item))
          : [...state.teamsOptions.filter(team => team?.id), action.team]

      return {
        ...state,
        teamsOptions: res,
      }
    }

    case TEAM_REMOVE_TEAMS_OPTIONS_TEAM: {
      return {
        ...state,
        teamsOptions: state.teamsOptions?.filter(item => item?.id !== action.team?.id),
        team: null,
      }
    }

    case SET_TEAM: {
      return {
        ...state,
        initialized: true,
        team: action.team,
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        isLoaded: action.isLoaded,
      }
    }

    default:
      return state
  }
}
