import { useSelector } from 'react-redux'
import { getUserId, getUserAvatar } from 'utils/user'

export const useUser = () => useSelector(state => state.user?.user)
export const useUserId = () => useSelector(state => getUserId(state.user?.user))
export const useUserTutorials = () => useSelector(state => state.user?.user?.tutorials)
export const useUserStreamIoToken = () => useSelector(state => state.user?.user?.stream_io_token)
export const useUserFirstName = () => useSelector(state => state.user?.user?.first_name)
export const useUserSchoolCountry = () => useSelector(state => state.user?.user?.school_country)
export const useUserAvatar = () => useSelector(state => getUserAvatar(state.user?.user))
export const useUserIsMentor = () => useSelector(state => state.user?.user?.is_mentor)
export const useUserCoins = () => useSelector(state => state.user?.user?.coins)
export const useUserTeams = () => useSelector(state => state.user?.user?.teams || [])
export const useIsCoFounderProfileCompleted = () =>
  useSelector(state => state.user?.user?.isCoFounderProfileCompleted)

export const useAdminUser = () => useSelector(state => state.user?.adminUser)
export const useUserInitialized = () => useSelector(state => state.user?.initialized)
export const useUserImageLoading = () => useSelector(state => state.user?.isUserImageLoading)
export const useUserLoading = () => useSelector(state => state.user?.isUserLoading)
export const useIsLoggining = () => useSelector(state => state.user?.isLoggining)
export const useUserReportVideos = () => useSelector(state => state.user?.userReportVideos)
export const useInviteViewEvents = () => useSelector(state => state.user?.inviteViewEvents)
export const useInviteViewEventsCount = () =>
  useSelector(state => state.user?.inviteViewEventsCount)
export const useInviteViewEventsPagination = () =>
  useSelector(state => state.user?.inviteViewEventsPagination)
export const useInviteCoinEvents = () => useSelector(state => state.user?.inviteCoinEvents)
export const useInviteCoinEventsCount = () =>
  useSelector(state => state.user?.inviteCoinEventsCount)
export const useInviteCoinEventsPagination = () =>
  useSelector(state => state.user?.inviteCoinEventsPagination)

export const useBranchObj = () => useSelector(state => state.user?.branchObj)
