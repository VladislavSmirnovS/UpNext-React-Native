import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getStartupAllCardsVideos } from 'store/startup/startup.actions'
import { useStartupAllCardVideosLength } from 'store/startup/startup.uses'

export default () => {
  const dispatch = useDispatch()
  const startupVideosLength = useStartupAllCardVideosLength()

  useEffect(() => {
    if (!startupVideosLength) {
      dispatch(getStartupAllCardsVideos())
    }
  }, [startupVideosLength])

  const isLoading = useMemo(() => {
    return !startupVideosLength
  }, [startupVideosLength])

  return { isLoading }
}
