import React from 'react'
import styled from 'styled-components'
import { TOP_INSETS } from 'components/Control/DeviceHeight'
import Styles from 'appearance/styles'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ onPress }) => {
  return (
    <Button onPressIn={onPress} onPress={onPress}>
      <BackImage />
    </Button>
  )
}

const IMAGE_SIZE = 24

const Button = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${Styles.PAGE_PADDING};
  z-index: 99999;
  top: ${TOP_INSETS}px;
`

const BackImage = () => <Image source={Images.backArrow} resizeMode="contain" />

const Image = styled.Image`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  margin-right: 5px;
  tint-color: ${Colors.WHITE};
`
