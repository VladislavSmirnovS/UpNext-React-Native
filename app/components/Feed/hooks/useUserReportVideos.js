import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserReportVideos } from 'store/user/user.actions'
import { useUserReportVideos } from 'store/user/user.uses'
import { useUserId } from 'store/user/user.uses'

export default () => {
  const dispatch = useDispatch()

  const userId = useUserId()
  const userReportVideos = useUserReportVideos()

  useEffect(() => {
    if (!userReportVideos && userId) {
      dispatch(getUserReportVideos())
    }
  }, [userReportVideos, userId])

  const isReportNotAvailable = activity => {
    return userReportVideos?.map(item => item.report_team_id)?.includes(activity.teamId)
  }

  const isMarAvailable = activity => {
    const isMarked = activity?.favorites?.includes(userId)
    return !isMarked
  }

  return { isReportNotAvailable, isMarAvailable }
}
