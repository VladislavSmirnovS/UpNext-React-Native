import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const DOUBLE_PRESS_DELAY = 300

export default ({ onPress, onLongPress, onDoubleTap, isFlex, children }) => {
  const [lastTap, setLastTap] = useState(0)
  const [singlePressTimer, setSinglePressTimer] = useState(0)

  const cancelSinglePressTimer = () => {
    if (singlePressTimer) {
      clearTimeout(singlePressTimer)
      setSinglePressTimer(0)
    }
  }

  const handleTap = (event, gestureState) => {
    cancelSinglePressTimer()

    const timeNow = Date.now()
    if (lastTap && timeNow - lastTap < DOUBLE_PRESS_DELAY) {
      onDoubleTap && onDoubleTap()
    } else {
      setLastTap(timeNow)

      const timeout = setTimeout(() => {
        setLastTap(0)
        onPress && onPress()
      }, DOUBLE_PRESS_DELAY)

      setSinglePressTimer(timeout)
    }
  }

  return (
    <TouchableOpacity
      onPress={handleTap}
      onLongPress={onLongPress}
      activeOpacity={1}
      isFlex={isFlex}
    >
      {children}
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  ${p =>
    p.isFlex &&
    css`
      flex: 1;
    `};
`
