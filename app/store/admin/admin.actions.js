import api from 'services/api'
import { parseVideoUrl } from 'services/utils'
import { resetAllFeed } from 'store/feed/feed.actions'
import { getVimeoUrl } from 'store/notification/notification.actions'
import { handleError } from 'services/logger'

export const ADMIN_SET_IS_LOADING = 'ADMIN_SET_IS_LOADING'
export const ADMIN_SET_CODES_LIST = 'ADMIN_SET_CODES_LIST'
export const ADMIN_SET_SOCIALS_LIST = 'ADMIN_SET_SOCIALS_LIST'
export const ADMIN_SET_CODES_LIST_PAGE = 'ADMIN_SET_CODES_LIST_PAGE'
export const ADMIN_SET_SOCIALS_LIST_PAGE = 'ADMIN_SET_SOCIALS_LIST_PAGE'
export const ADMIN_SOCIALS_LOGIN_TYPE_COUNTS = 'ADMIN_SOCIALS_LOGIN_TYPE_COUNTS'
export const ADMIN_SET_CODES_SEARCH = 'ADMIN_SET_CODES_SEARCH'
export const ADMIN_SET_SOCIALS_SEARCH = 'ADMIN_SET_SOCIALS_SEARCH'
export const ADMIN_SET_TEAMS_LIST = 'ADMIN_SET_TEAMS_LIST'
export const ADMIN_SET_TEAMS_SEARCH = 'ADMIN_SET_TEAMS_SEARCH'
export const ADMIN_SET_TEAMS_LIST_PAGE = 'ADMIN_SET_TEAMS_LIST_PAGE'
export const ADMIN_SET_TEAM_IN_TEAMS_LIST = 'ADMIN_SET_TEAM_IN_TEAMS_LIST'
export const ADMIN_SET_REPORTS_LIST = 'ADMIN_SET_REPORTS_LIST'
export const ADMIN_SET_REPORTS_LIST_PAGE = 'ADMIN_SET_REPORTS_LIST_PAGE'
export const ADMIN_SET_REPORT_IN_REPORT_LIST = 'ADMIN_SET_REPORT_IN_REPORT_LIST'
export const ADMIN_SET_REPORTS_SEARCH = 'ADMIN_SET_REPORTS_SEARCH'
export const ADMIN_SET_SESSION_STATS = 'ADMIN_SET_SESSION_STATS'
export const ADMIN_SET_STATS_LIST_PAGE = 'ADMIN_SET_STATS_LIST_PAGE'

export const getCodesList = (page, size, search, callback) => (dispatch, getState) => {
  const { codesList } = getState().admin
  api
    .getUserCodes(page, size, search)
    .then(res => {
      dispatch(
        setCodesList(!page ? res.data.result : [...codesList, ...res.data.result], res.data?.count),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setCodesList(codesList ? codesList : []))
    })
}

export const getSocialsList = (page, size, search, callback) => (dispatch, getState) => {
  const { socialsList } = getState().admin
  api
    .getUsersSocials(page, size, search)
    .then(res => {
      dispatch(
        setSocialsList(
          !page ? res.data.result : [...socialsList, ...res.data.result],
          res.data?.count,
        ),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setSocialsList(socialsList ? socialsList : []))
    })
}

export const getSocialLoginTypeCounts = callback => (dispatch, getState) => {
  api
    .getSocialLoginTypeCounts()
    .then(res => {
      dispatch(setSocialsLoginTypeCounts(res.data))
      callback && callback()
    })
    .catch(error => handleError(error))
}

export const onClearSearch = () => (dispatch, getState) => {
  const { codesSearch, socialsSearch, teamsSearch, reportsSearch } = getState().admin
  if (codesSearch) {
    dispatch(setCodesList(null, 0))
    dispatch(setCodesSearch())
  }
  if (socialsSearch) {
    dispatch(setSocialsList(null, 0))
    dispatch(setSocialsSearch())
  }
  if (teamsSearch) {
    dispatch(setTeamsList(null, 0))
    dispatch(setTeamsSearch())
  }
  if (reportsSearch) {
    dispatch(setReportsList(null, 0))
    dispatch(setReportsSearch())
  }
}

export const getTeamsList = (page, size, search, callback) => (dispatch, getState) => {
  const { teamsList } = getState().admin
  api
    .getTeamsWithPainVideo(page, size, search)
    .then(res => {
      dispatch(
        setTeamsList(!page ? res.data.result : [...teamsList, ...res.data.result], res.data?.count),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setTeamsList(teamsList ? teamsList : []))
    })
}

export const getReportsList = (page, size, search, callback) => (dispatch, getState) => {
  const { reportsList } = getState().admin
  api
    .getReportVideos(page, size, search)
    .then(res => {
      dispatch(
        setReportsList(
          !page ? res.data.result : [...reportsList, ...res.data.result],
          res.data?.count,
        ),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setReportsList(reportsList ? reportsList : []))
    })
}

export const updateTeamPermissions = (teamId, permissions, url, callback) => dispatch => {
  dispatch(
    updatePermissions(teamId, permissions, url, res => {
      dispatch(setTeamInTeamsList(res.data))
      callback && callback()
    }),
  )
}

export const updateReportPermissions = (teamId, permissions, url, callback) => dispatch => {
  dispatch(
    updatePermissions(teamId, permissions, url, res => {
      dispatch(setReportInReportsList(res.data))
      callback && callback()
    }),
  )
}

const updatePermissions = (teamId, permissions, url, callback) => dispatch => {
  if (url) {
    const { id } = parseVideoUrl(url)
    getVimeoUrl(id)
      .then(res => api.updateTeamPermssionsFromAdmin(teamId || '', permissions || '', res?.poster))
      .then(res => {
        dispatch(resetAllFeed())
        callback && callback(res)
      })
      .catch(error => handleError(error))
  } else {
    api
      .updateTeamPermssionsFromAdmin(teamId || '', permissions || '')
      .then(res => {
        dispatch(resetAllFeed())
        callback && callback(res)
      })
      .catch(error => handleError(error))
  }
}

export const setCodesList = (list, count) => ({ type: ADMIN_SET_CODES_LIST, list, count })

export const setSocialsList = (list, count) => ({ type: ADMIN_SET_SOCIALS_LIST, list, count })

export const setTeamsList = (list, count) => ({ type: ADMIN_SET_TEAMS_LIST, list, count })

export const setReportsList = (list, count) => ({ type: ADMIN_SET_REPORTS_LIST, list, count })

export const setCodesListPage = page => ({ type: ADMIN_SET_CODES_LIST_PAGE, page })

export const setSocialsListPage = page => ({ type: ADMIN_SET_SOCIALS_LIST_PAGE, page })

export const setTeamsListPage = page => ({ type: ADMIN_SET_TEAMS_LIST_PAGE, page })

export const setReportsListPage = page => ({ type: ADMIN_SET_REPORTS_LIST_PAGE, page })

export const setSocialsLoginTypeCounts = socialsLoginTypeCounts => ({
  type: ADMIN_SOCIALS_LOGIN_TYPE_COUNTS,
  socialsLoginTypeCounts,
})

export const setCodesSearch = codesSearch => ({ type: ADMIN_SET_CODES_SEARCH, codesSearch })

export const setSocialsSearch = socialsSearch => ({ type: ADMIN_SET_SOCIALS_SEARCH, socialsSearch })

export const setTeamsSearch = teamsSearch => ({ type: ADMIN_SET_TEAMS_SEARCH, teamsSearch })

export const setReportsSearch = reportsSearch => ({ type: ADMIN_SET_REPORTS_SEARCH, reportsSearch })

export const setTeamInTeamsList = team => ({ type: ADMIN_SET_TEAM_IN_TEAMS_LIST, team })

export const setReportInReportsList = team => ({ type: ADMIN_SET_REPORT_IN_REPORT_LIST, team })

export const getSessionStats = (format, page, size, callback) => (dispatch, getState) => {
  const { sessionStats } = getState().admin
  api
    .getSessionStats(format, page, size)
    .then(res => {
      let list = {}
      if (sessionStats && page !== 0) {
        const resList = res.data
        const keys = Object.keys(resList)
        keys.forEach(key => {
          if (sessionStats[key]) {
            list[key] = { ...sessionStats[key], ...resList[key] }
          } else {
            list[key] = resList[key]
          }
        })
      } else {
        list = res.data
      }

      dispatch(setSessionStats(sessionStats ? list : res.data))
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setSessionStats({}))
    })
}

export const setSessionStats = sessionStats => ({ type: ADMIN_SET_SESSION_STATS, sessionStats })

export const setSessionStatsPage = page => ({ type: ADMIN_SET_STATS_LIST_PAGE, page })

export const setIsLoading = isLoading => ({ type: ADMIN_SET_IS_LOADING, isLoading })
