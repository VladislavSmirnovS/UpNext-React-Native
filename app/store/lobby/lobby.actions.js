import api from 'services/api'
import { handleError } from 'services/logger'

export const LOBBY_SET_MEMBERS = 'LOBBY_SET_MEMBERS'
export const LOBBY_SET_MEMBERS_PAGE = 'LOBBY_SET_MEMBERS_PAGE'
export const LOBBY_SET_MEMBERS_FILTERS = 'LOBBY_SET_MEMBERS_FILTERS'
export const LOBBY_MEMBERS_SET_CHAT_PENDING_STATUS = 'LOBBY_MEMBERS_SET_CHAT_PENDING_STATUS'
export const LOBBY_SET_MEMBERS_SEARCH = 'LOBBY_SET_MEMBERS_SEARCH'

export const setMembersSearch = membersSearch => ({ type: LOBBY_SET_MEMBERS_SEARCH, membersSearch })

export const getFounderMembers = (page, size, search, filters, callback) => (
  dispatch,
  getState,
) => {
  api
    .getFounderMembers(page, size, search, filters)
    .then(res => {
      const { members } = getState().lobby
      const newList = res.data.items || []

      const resList = !page ? newList : [...members, ...newList]
      dispatch(setMembers(resList, res.data?.count))
      callback && callback(newList?.length)
    })
    .catch(error => handleError(error))
}

export const createFriendsInvite = (userId, callback) => dispatch => {
  api
    .createFriendsInvite(userId)
    .then(res => {
      dispatch(setMembersChatPendingStatus(userId, res.data.status))
      callback && callback(userId, res.data.status)
      // update notification page
    })
    .catch(error => handleError(error))
}

export const declineFriendsInvite = (userId, callback) => dispatch => {
  api
    .declineFriendsInvite(userId)
    .then(res => {
      callback && callback(userId, res.data.status)
    })
    .catch(error => handleError(error))
}

export const setMembers = (members, count) => ({ type: LOBBY_SET_MEMBERS, members, count })

export const setMembersPage = page => ({ type: LOBBY_SET_MEMBERS_PAGE, page })

export const setMembersFilters = filters => ({ type: LOBBY_SET_MEMBERS_FILTERS, filters })

export const setMembersChatPendingStatus = (id, status) => ({
  type: LOBBY_MEMBERS_SET_CHAT_PENDING_STATUS,
  id,
  status,
})
