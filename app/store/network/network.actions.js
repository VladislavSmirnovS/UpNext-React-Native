import api from 'services/api'
import { handleError } from 'services/logger'
import { getUserId } from 'utils/user'

export const NETWORK_SET_FRIENDS_WITH_INVESTMENTS = 'NETWORK_SET_FRIENDS_WITH_INVESTMENTS'
export const NETWORK_SET_FRIENDS_WITH_INVESTMENTS_PAGE = 'NETWORK_SET_FRIENDS_WITH_INVESTMENTS_PAGE'
export const NETWORK_SET_MENTORS = 'NETWORK_SET_MENTORS'
export const NETWORK_SET_MENTORS_PAGE = 'NETWORK_SET_MENTORS_PAGE'

export const joinNetworkFromLink = (userId, callback) => async dispatch => {
  try {
    await api.joinNetworkFromLink(userId)
  } catch (error) {
    handleError(error)
  }
}

export const getFriendsWithInvestments = (page, size, callback) => (dispatch, getState) => {
  const { user } = getState().user
  const userId = getUserId(user)
  if (userId) {
    api
      .getFriendsWithInvestments(page, size)
      .then(res => {
        const { friendsWithInvestments } = getState().network
        dispatch(
          setFriendsWithInvestments(
            !page ? res.data.result : [...friendsWithInvestments, ...res.data.result],
            res.data?.count,
          ),
        )
        callback && callback()
      })
      .catch(error => {
        handleError(error)
        dispatch(setFriendsWithInvestments([], 0))
      })
  }
}

export const setFriendsWithInvestments = (list, count) => ({
  type: NETWORK_SET_FRIENDS_WITH_INVESTMENTS,
  list,
  count,
})

export const setFriendsWithInvestmentsPage = page => ({
  type: NETWORK_SET_FRIENDS_WITH_INVESTMENTS_PAGE,
  page,
})

export const getMentors = (page, size, callback) => (dispatch, getState) => {
  api
    .getMentors(page, size)
    .then(res => {
      const { mentors } = getState().network
      dispatch(
        setMentors(!page ? res.data.result : [...mentors, ...res.data.result], res.data?.count),
      )
      callback && callback()
    })
    .catch(error => {
      handleError(error)
      dispatch(setMentors([], 0))
    })
}

export const setMentors = (mentors, count) => ({ type: NETWORK_SET_MENTORS, mentors, count })

export const setMentorsPage = page => ({ type: NETWORK_SET_MENTORS_PAGE, page })
