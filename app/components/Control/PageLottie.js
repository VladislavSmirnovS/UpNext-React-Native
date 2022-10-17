import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import Lottie from 'components/Control/Lottie'
import { useOverflowAnimation } from 'store/app/app.uses'
import { setOverflowAnimation } from 'store/app/app.actions'

const PageLottie = ({}) => {
  const dispatch = useDispatch()
  const overflowAnimation = useOverflowAnimation()

  const onCallback = () => {
    dispatch(setOverflowAnimation(null))

    if (overflowAnimation?.callback && typeof overflowAnimation.callback === 'function') {
      overflowAnimation.callback()
    }
  }

  return overflowAnimation ? (
    <Lottie
      name={overflowAnimation.name}
      text={overflowAnimation.text}
      callback={overflowAnimation.isInfinitely ? null : onCallback}
      timout={overflowAnimation.timout}
      isOverlay={true}
      isInfinitely={overflowAnimation.isInfinitely}
      animationWidth={overflowAnimation.width}
      animationHeight="70%"
    />
  ) : null
}

const arePropsEqual = (prevProps, nextProps) => {
  return true
}

export default memo(PageLottie, arePropsEqual)
