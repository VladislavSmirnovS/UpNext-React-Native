import React from 'react'
import SwipeUpTutorial from 'components/Tutorials/SwipeUp'
import useTutorials from 'hooks/useTutorials'

export default ({ videos }) => {
  const [isSwipeTutorialShow, hideSwipeTutorial] = useTutorials(
    'card_swipe',
    null,
    videos?.length > 1,
  )

  return (
    <SwipeUpTutorial
      isVisible={isSwipeTutorialShow}
      onHide={hideSwipeTutorial}
      onSwipeUp={hideSwipeTutorial}
    />
  )
}
