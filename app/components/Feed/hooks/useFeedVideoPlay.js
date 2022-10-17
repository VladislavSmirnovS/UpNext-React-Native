import { useState, useEffect } from 'react'
import { useIsShowSearchHashtagModal } from 'store/app/app.uses'

export default navigation => {
  const isShowSearchHashtagModal = useIsShowSearchHashtagModal()

  const [isFeedPlay, setIsFeedPlay] = useState(true)

  useEffect(() => {
    const blurSubscription = navigation.addListener('willBlur', () => {
      setIsFeedPlay(false)
    })
    return () => blurSubscription.remove()
  }, [])

  useEffect(() => {
    const didFocusSubscription = navigation.addListener('didFocus', () => {
      setIsFeedPlay(true)
    })
    return () => didFocusSubscription.remove()
  }, [])

  useEffect(() => {
    setIsFeedPlay(!isShowSearchHashtagModal)
  }, [isShowSearchHashtagModal])

  return { isFeedPlay }
}
