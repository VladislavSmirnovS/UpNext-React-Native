import { useSelector } from 'react-redux'

export const useMembers = () => useSelector(state => state.lobby?.members)
export const useMembersCount = () => useSelector(state => state.lobby?.membersCount)
export const useMembersPagination = () => useSelector(state => state.lobby?.membersPagination)
export const useMembersSearch = () => useSelector(state => state.lobby?.membersSearch)
export const useMembersFilters = () => useSelector(state => state.lobby?.membersFilters)

export const useTeams = () => useSelector(state => state.lobby?.teams)
export const useTeamsPagination = () => useSelector(state => state.lobby?.teamsPagination)
export const useTeamsFilters = () => useSelector(state => state.lobby?.teamsFilters)
