import { useSelector } from 'react-redux'

export const useTeam = () => useSelector(state => state.team?.team)
export const useTeamId = () => useSelector(state => state.team?.team?.id)
export const useTeamPainFeedId = () => useSelector(state => state.team?.team?.pain_video_feed_id)

export const useTeamMoreTeams = () => useSelector(state => state.team?.teamMoreTeams)
export const useTeamMoreTeamsPagination = () =>
  useSelector(state => state.team?.teamMoreTeamsPagination)

export const useTeamPainVideoParts = () => useSelector(state => state.team?.teamPainVideoParts)
export const useTeamLoaded = () => useSelector(state => state.team?.isLoaded)
export const useTeamsOptions = () => useSelector(state => state.team?.teamsOptions)
