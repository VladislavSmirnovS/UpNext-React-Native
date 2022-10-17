import { useSelector } from 'react-redux'

export const useStartupAllCardVideos = () =>
  useSelector(state => state.startup?.startupAllCardsVideos)
export const useStartupAllCardVideosLength = () =>
  useSelector(state => state.startup?.startupAllCardsVideos?.length)
export const useStartupVideosByCards = () => useSelector(state => state.startup?.videosByCards)
