import React from 'react'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import Colors from 'appearance/colors'
import Lottie from 'appearance/lottie'

export default ({ isVisible, onHide, onSwipeUp }) => {
  if (!isVisible) {
    return null
  }

  return (
    <Container>
      <SwipeContainer onSwipeUp={onSwipeUp}>
        <TouchableOpacity onPress={onHide}>
          <TopSpacer />
          <AnimationWrapper>
            <Animation source={Lottie.swipeUp} autoPlay loop resizeMode="cover" />
          </AnimationWrapper>
        </TouchableOpacity>
      </SwipeContainer>
    </Container>
  )
}

const Container = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: ${Colors.TUTORIAL_OPAQUE};
`

const SwipeContainer = styled(GestureRecognizer)`
  flex: 1;
  width: 100%;
`

const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
`

const AnimationWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

const TopSpacer = styled.View`
  flex: 1;
`

const Animation = styled(LottieView)`
  height: auto;
`
