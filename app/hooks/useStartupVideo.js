import { useMemo } from 'react'
import { useStartupVideosByCards } from 'store/startup/startup.uses'

export default cardId => {
  const startupVideos = useStartupVideosByCards()

  const getVideos = cardId => {
    return startupVideos?.[cardId]
  }

  const videos = useMemo(() => {
    return getVideos(cardId)
  }, [cardId, startupVideos])

  const isHasVideos = useMemo(() => {
    return videos?.length
  }, [cardId, startupVideos])

  const checkIsHasVideosByCardId = cardId => {
    return startupVideos?.[cardId]?.length
  }

  return { isHasVideos, videos, checkIsHasVideosByCardId }
}
