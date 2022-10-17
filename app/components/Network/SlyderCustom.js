import React from 'react'
import Colors from 'appearance/colors'
import { StyleSheet} from 'react-native'
import styled from 'styled-components'

const LabelBase = ({position, value }) => {
  return (
    <Label style={[styles.sliderLabel, { left: position - 25 }]}>
      <Text>{value}</Text>
    </Label>
  )
}

export default function SliderCustomLabel() {
  return function(props) {
    const { oneMarkerValue, twoMarkerValue, oneMarkerLeftPosition, twoMarkerLeftPosition } = props

    return (
      <View>
        <LabelBase position={oneMarkerLeftPosition} value={oneMarkerValue} />
        {twoMarkerValue ? (
          <LabelBase position={twoMarkerLeftPosition} value={twoMarkerValue} />
        ) : null}
      </View>
    )
  }
}

const View = styled.View``

const Label = styled.View``

const Text = styled.Text`
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  color: ${Colors.TEXT_BRIGHT_BLUE};
`
const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: -30,
    width: 50,
    height: 50,
  },
})
