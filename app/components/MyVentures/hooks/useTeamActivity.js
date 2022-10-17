import { useState, useEffect } from 'react'
import { getActvityById } from 'store/feed/feed.actions'
import { handleError } from 'services/logger'

export default activityId => {
  const [localActivity, setLocalActivity] = useState()

  useEffect(() => {
    const getActivityData = async () => {
      try {
        if (activityId) {
          const activity = await getActvityById(activityId)
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
  }, [activityId])

  return [localActivity]
}
