import React, { useRef } from 'react'
import { Platform, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const { width } = Dimensions.get('window')

export default ({ options, renderItem, maxWidth, itemWidth = 0, onEndReached }) => {
  const _carousel = useRef(null)

  return (
    <Carousel
      ref={_carousel}
      useScrollView={Platform.OS === 'ios'}
      data={options || []}
      renderItem={renderItem}
      sliderWidth={maxWidth || width}
      itemWidth={itemWidth + 10}
      activeSlideOffset={0}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      activeSlideAlignment="start"
      onEndReached={onEndReached || null}
    />
  )
}
