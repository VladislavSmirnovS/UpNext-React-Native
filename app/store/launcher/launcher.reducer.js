import {
  LAUNCHER_SET_LIST,
  LAUNCHER_ADD_ITEM,
  LAUNCHER_DELETE_ITEM,
  LAUNCHER_EDIT_ITEM,
  LAUNCHER_SET_PAGE,
  LAUNCHER_SET_EDIT_ITEM,
  LAUNCHER_SET_SHOWN_ITEM,
  LAUNCHER_SET_FILTERS,
  LAUNCHER_SET_FILTERS_OPTIONS,
} from 'store/launcher/launcher.actions'

const initialState = {
  editItem: null,
  shownItem: null,

  launchersFiltersOptions: null,

  launchers: null,
  launchersFilters: {},
  launchersPagination: {
    page: 0,
    size: 10,
  },

  myLaunchers: null,
  myLaunchersPagination: {
    page: 0,
    size: 10,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LAUNCHER_SET_FILTERS_OPTIONS: {
      return {
        ...state,
        launchersFiltersOptions: action.options,
      }
    }

    case LAUNCHER_SET_EDIT_ITEM: {
      return {
        ...state,
        editItem: action.item,
      }
    }

    case LAUNCHER_SET_SHOWN_ITEM: {
      return {
        ...state,
        shownItem: action.item,
      }
    }

    case LAUNCHER_SET_LIST: {
      return {
        ...state,
        [action.name]: action.list,
      }
    }

    case LAUNCHER_SET_FILTERS: {
      return {
        ...state,
        [action.name]: action.filters,
      }
    }

    case LAUNCHER_ADD_ITEM: {
      return {
        ...state,
        [action.name]: [...(state[action.name] || []), action.item],
      }
    }

    case LAUNCHER_DELETE_ITEM: {
      return {
        ...state,
        [action.name]: state[action.name]?.length
          ? state[action.name].filter(item => item.id !== action.id)
          : state[action.name],
      }
    }

    case LAUNCHER_EDIT_ITEM: {
      return {
        ...state,
        [action.name]: state[action.name]?.length
          ? state[action.name]?.map(item => (item.id === action.item?.id ? action.item : item))
          : [item],
      }
    }

    case LAUNCHER_SET_PAGE: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          page: action.page,
        },
      }
    }

    default:
      return state
  }
}
