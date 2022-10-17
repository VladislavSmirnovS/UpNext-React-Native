import { useState, useEffect } from 'react'
import { getActvityById } from 'store/feed/feed.actions'
import { useTeamPainFeedId } from 'store/team/team.uses'
import { handleError } from 'services/logger'

export default () => {
  const teamPainVideoFeedId = useTeamPainFeedId()

  const [localActivity, setLocalActivity] = useState()

  useEffect(() => {
    const getActivityData = async () => {
      try {
        if (teamPainVideoFeedId) {
          const activity = await getActvityById(teamPainVideoFeedId)
          if (activity?.id) {
            setLocalActivity(activity)
          } else {
            setLocalActivity(null)
          }
        } else {
          setLocalActivity(null)
        }
      } catch (error) {
        handleError(error)
      }
    }

    getActivityData()
  }, [teamPainVideoFeedId])

  return [localActivity]
}
