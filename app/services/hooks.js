import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPagesWebviews } from 'store/app/app.actions'
import { usePagesWebviews } from 'store/app/app.uses'

export const useAllPagesWebviews = pageName => {
  const dispatch = useDispatch()
  const webviews = usePagesWebviews()

  useEffect(() => {
    if (!webviews) {
      dispatch(getPagesWebviews())
    }
  }, [])

  return webviews ? webviews.find(item => item.page_name === pageName) || {} : null
}
