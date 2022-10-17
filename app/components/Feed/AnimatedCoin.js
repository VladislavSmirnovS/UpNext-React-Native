import React, { useRef, useEffect, memo } from 'react'
import styled from 'styled-components'
import { Animated } from 'react-native'
import Images from 'appearance/images'

const AnimatedCoin = ({ isCoinPress }) => {
  const opacity = useRef(new Animated.Value(0)).current
  const animate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isCoinPress) {
      showCoin()

      Animated.timing(animate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        hideCoin()

        Animated.timing(animate, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start()
      })
    }
  }, [isCoinPress])

  const showCoin = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const hideCoin = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const animStyle = {
    opacity,
    transform: [
      {
        scaleX: animate.interpolate({
          inputRange: [0, 0.6, 0.7, 0.8, 1],
          outputRange: [0, 2.5, 1.8, 2, 2.1],
        }),
      },
      {
        scaleY: animate.interpolate({
          inputRange: [0, 0.6, 0.7, 0.8, 1],
          outputRange: [0, 2.5, 1.8, 2, 2.1],
        }),
      },
    ],
  }

  return (
    <AnimatedView style={animStyle}>
      <CoinImage source={Images.coin} resizeMode="contain" />
    </AnimatedView>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.isCoinPress === nextProps.isCoinPress
}

export default memo(AnimatedCoin, arePropsEqual)

const IMAGE_SIZE = 60

const AnimatedView = styled(Animated.View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const CoinImage = styled.Image`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`
