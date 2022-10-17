import React from 'react'
import { Pagination } from 'react-native-snap-carousel'
import Colors from 'appearance/colors'
import styled from 'styled-components'

const DOT_SIZE = 12

export default ({ step, stepsLength, currentPage }) => {
  return (
    <>
      <StepCount currentPage={currentPage}>Step {step + 1}</StepCount>

      <Pagination
        dotsLength={stepsLength}
        activeDotIndex={step}
        dotStyle={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          borderWidth: 2,
          borderColor: currentPage === 2 ? Colors.WHITE : Colors.TEXT_BRIGHT_BLUE,
          marginHorizontal: 0,
          backgroundColor: currentPage === 2 ? Colors.WHITE : Colors.TEXT_BRIGHT_BLUE,
        }}
        inactiveDotStyle={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          borderWidth: 2,
          borderColor: currentPage === 2 ? Colors.WHITE : Colors.TEXT_BRIGHT_BLUE,
          marginHorizontal: 0,
          backgroundColor: currentPage === 2 ? '#00000000' : Colors.WHITE,
        }}
        containerStyle={{
          paddingVertical: 5,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </>
  )
}

const StepCount = styled.Text`
  color: ${p => (p.currentPage === 2 ? Colors.WHITE : Colors.TEXT_BRIGHT_BLUE)};
  text-align: center;
  margin: 5px 0;
  font-weight: 700;
  font-size: 16px;
`
