import React, { useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Colors from 'appearance/colors'

const { width } = Dimensions.get('window')
const DOT_SIZE = 5

export default ({ data, renderItem, onEndReached }) => {
  const _carousel = useRef(null)
  const [activeItem, setActiveItem] = useState(0)

  const onSnapToItem = index => {
    setActiveItem(index)
  }

  const renderPagination = () => {
    return (
      <>
        <Spacer h={30} />
        <Wrapper>
          <Pagination
            carouselRef={_carousel}
            dotsLength={data.length}
            activeDotIndex={activeItem}
            style={{ paddingVertical: 0, position: 'absolute' }}
            dotStyle={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              borderWidth: 2,
              borderColor: Colors.TEXT_GREY,
              marginHorizontal: 0,
              backgroundColor: Colors.TEXT_GREY,
            }}
            inactiveDotStyle={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              borderWidth: 2,
              borderColor: Colors.APP_SHADOW_GREY,
              marginHorizontal: 0,
              backgroundColor: Colors.APP_SHADOW_GREY,
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </Wrapper>
      </>
    )
  }

  const hangleRenderItem = ({ item }) => {
    return renderItem({ item, renderPagination })
  }

  return (
    <Container>
      <Carousel
        ref={c => (_carousel.current = c)}
        useScrollView={Platform.OS === 'ios'}
        data={data || []}
        renderItem={hangleRenderItem}
        sliderWidth={width}
        itemWidth={width - 40}
        activeSlideOffset={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideAlignment={'start'}
        onSnapToItem={onSnapToItem}
        onEndReached={onEndReached}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const Wrapper = styled.View`
  width: ${width - 60}px;
  position: absolute;
  bottom: 0;
`
