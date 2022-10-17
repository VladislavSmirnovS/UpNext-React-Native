import { useSelector } from 'react-redux'

export const useIsLoading = () => useSelector(state => state.admin?.isLoading)

export const useCodesList = () => useSelector(state => state.admin?.codesList)
export const useCodesListCount = () => useSelector(state => state.admin?.codesListCount)
export const useCodesListPagination = () => useSelector(state => state.admin?.codesListPagination)
export const useCodesSearch = () => useSelector(state => state.admin?.codesSearch)

export const useSocialsList = () => useSelector(state => state.admin?.socialsList)
export const useSocialsListCount = () => useSelector(state => state.admin?.socialsListCount)
export const useSocialsListPagination = () =>
  useSelector(state => state.admin?.socialsListPagination)
export const useSocialsLoginTypeCounts = () =>
  useSelector(state => state.admin?.socialsLoginTypeCounts)
export const useSocialsSearch = () => useSelector(state => state.admin?.socialsSearch)

export const useTeamsList = () => useSelector(state => state.admin?.teamsList)
export const useTeamsListCount = () => useSelector(state => state.admin?.teamsListCount)
export const useTeamsSearch = () => useSelector(state => state.admin?.teamsSearch)
export const useTeamsListPagination = () => useSelector(state => state.admin?.teamsListPagination)

export const useReportsList = () => useSelector(state => state.admin?.reportsList)
export const useReportsListCount = () => useSelector(state => state.admin?.reportsListCount)
export const useReportsSearch = () => useSelector(state => state.admin?.reportsSearch)
export const useReportsListPagination = () =>
  useSelector(state => state.admin?.reportsListPagination)

export const useSessionStats = () => useSelector(state => state.admin?.sessionStats)
export const useSessionStatsPagination = () =>
  useSelector(state => state.admin?.sessionStatsPagination)
