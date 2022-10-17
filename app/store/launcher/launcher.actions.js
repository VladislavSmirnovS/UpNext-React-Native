import api from 'services/api'
import { handleError } from 'services/logger'

export const LAUNCHER_SET_EDIT_ITEM = 'LAUNCHER_SET_EDIT_ITEM'
export const LAUNCHER_SET_SHOWN_ITEM = 'LAUNCHER_SET_SHOWN_ITEM'
export const LAUNCHER_SET_LIST = 'LAUNCHER_SET_LIST'
export const LAUNCHER_ADD_ITEM = 'LAUNCHER_ADD_ITEM'
export const LAUNCHER_DELETE_ITEM = 'LAUNCHER_DELETE_ITEM'
export const LAUNCHER_EDIT_ITEM = 'LAUNCHER_EDIT_ITEM'
export const LAUNCHER_SET_PAGE = 'LAUNCHER_SET_PAGE'
export const LAUNCHER_SET_FILTERS = 'LAUNCHER_SET_FILTERS'
export const LAUNCHER_SET_FILTERS_OPTIONS = 'LAUNCHER_SET_FILTERS_OPTIONS'

export const deleteMyLauncher = item => async dispatch => {
  try {
    const res = await api.deleteMyLauncher(item.id)
    dispatch(deleteItem('myLaunchers', item.id))
  } catch (error) {
    handleError(error)
  }
}

export const getFiltersOptions = () => async dispatch => {
  try {
    const res = await api.getLauncherFiltersOptions()
    dispatch(setFiltersOptions(res.data))
  } catch (error) {
    handleError(error)
  }
}

export const getLaunchers = (page, size, filters, callback) => async (dispatch, getState) => {
  try {
    const res = await api.getLaunchers(page, size, filters)
    const { launchers } = getState().launcher
    const newList = res.data.items || []
    const resList = !page ? newList : [...(launchers || []), ...newList]

    dispatch(setList('launchers', resList))
    callback && callback(newList?.length)
  } catch (error) {
    handleError(error)
  }
}

export const setLaunchersPage = page => dispatch => {
  dispatch(setPage('launchersPagination', page))
}

export const getMyLaunchers = (page, size, callback) => async (dispatch, getState) => {
  try {
    const res = await api.getMyLaunchers(page, size)
    const { myLaunchers } = getState().launcher
    const newList = res.data.items || []
    const resList = !page ? newList : [...(myLaunchers || []), ...newList]

    dispatch(setList('myLaunchers', resList))
    callback && callback(newList?.length)
  } catch (error) {
    handleError(error)
  }
}

export const createMyLauncher = callback => async dispatch => {
  try {
    const res = await api.createMyLauncher()
    dispatch(addItem('myLaunchers', res.data))
    callback && callback(res.data)
  } catch (error) {
    handleError(error)
  }
}

export const updateMyLauncher = (item, callback) => async dispatch => {
  try {
    dispatch(editItem('myLaunchers', item))
    dispatch(setEditItem(item))

    const res = await api.updateMyLauncher(item)
    callback && callback(res.data)
  } catch (error) {
    handleError(error)
  }
}

export const setMyLaunchersPage = page => dispatch => {
  dispatch(setPage('myLaunchersPagination', page))
}

export const setLaunchersFilters = filters => dispatch => {
  dispatch(setFilters('launchersFilters', filters))
}

export const setList = (name, list) => ({
  type: LAUNCHER_SET_LIST,
  name,
  list,
})

export const setEditItem = item => ({
  type: LAUNCHER_SET_EDIT_ITEM,
  item,
})

export const setShownItem = item => ({
  type: LAUNCHER_SET_SHOWN_ITEM,
  item,
})

export const addItem = (name, item) => ({
  type: LAUNCHER_ADD_ITEM,
  name,
  item,
})

export const deleteItem = (name, id) => ({
  type: LAUNCHER_DELETE_ITEM,
  name,
  id,
})

export const editItem = (name, item) => ({
  type: LAUNCHER_EDIT_ITEM,
  name,
  item,
})

export const setPage = (name, page) => ({
  type: LAUNCHER_SET_PAGE,
  name,
  page,
})

export const setFilters = (name, filters) => ({
  type: LAUNCHER_SET_FILTERS,
  name,
  filters,
})

export const setFiltersOptions = options => ({
  type: LAUNCHER_SET_FILTERS_OPTIONS,
  options,
})
