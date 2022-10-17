import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import Lottie from 'appearance/lottie'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'

const { height } = Dimensions.get('window')

export default ({
  name,
  text,
  callback,
  timout = 1000,
  isOverlay = false,
  isInfinitely = false,
  animationWidth,
  animationHeight,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback && callback()
    }, timout)
    return () => clearTimeout(timer)
  }, [])

  const source = Lottie[name]

  const onPress = () => {
    callback && callback()
  }

  return (
    <Wrapper isOverlay={isOverlay} isInfinitely={isInfinitely} onPress={onPress}>
      {text ? <Text>{text}</Text> : null}
      <View width={animationWidth} height={animationHeight}>
        <Animation source={source} autoPlay loop />
      </View>
    </Wrapper>
  )
}

const Wrapper = ({ isOverlay, isInfinitely, onPress, children }) =>
  isInfinitely ? (
    <LottieOverlayWithoutPress>{children}</LottieOverlayWithoutPress>
  ) : isOverlay ? (
    <LottieOverlay onPress={onPress}>{children}</LottieOverlay>
  ) : (
    <LottieContainer>{children}</LottieContainer>
  )

const LottieOverlay = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.6);
  flex: 1;
  height: ${height}px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  justify-content: center;
  align-items: center;
  elevation: ${Styles.ELEVATION};
`

const LottieOverlayWithoutPress = styled.View`
  background: rgba(0, 0, 0, 0.6);
  flex: 1;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  justify-content: center;
  align-items: center;
  elevation: ${Styles.ELEVATION};
`

const LottieContainer = styled.View`
  height: ${height}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Animation = styled(LottieView)`
  height: auto;
`

const Text = styled(Texts.OverflowText)`
  text-align: center;
  padding: 20px;
`

const View = styled.View`
  height: ${p => p.height || '100%'};
  width: ${p => p.width || '100%'};
`
