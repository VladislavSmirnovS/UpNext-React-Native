import { useMemo } from 'react'
import { useStartupVideosByCards } from 'store/startup/startup.uses'

export default cardIds => {
  const startupVideos = useStartupVideosByCards()

  const getVideos = cardIds => {
    let res = []
    cardIds.forEach(id => {
      const idVideos = startupVideos?.[id]
      if (idVideos?.length) {
        res = [...res, ...idVideos]
      }
    })
    return res
  }

  const videos = useMemo(() => {
    return getVideos(cardIds)
  }, [cardIds, startupVideos])

  const isHasVideos = useMemo(() => {
    return videos?.length
  }, [cardIds, startupVideos])

  return { isHasVideos, videos }
}
