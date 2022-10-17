import React from 'react'
import Lottie from 'components/Control/Lottie'
import { useIsLoggining } from 'store/user/user.uses'

export default () => {
  const isLoggining = useIsLoggining()

  if (!isLoggining) {
    return null
  }

  return <Lottie name="loader" animationHeight="100px" animationWidth="100px" isInfinitely />
}
