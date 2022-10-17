import React from 'react'
import styled from 'styled-components'
import Styles from 'appearance/styles'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

export default ({ navigation, topOffset, imageSource, position, onGoBackPress, whiteButton }) => {
  const onPress = () => {
    navigation && navigation.goBack()
    onGoBackPress && onGoBackPress()
  }

  return (
    <Button onPressIn={onPress} top={topOffset} position={position}>
      <BackImage imageSource={imageSource} whiteButton={whiteButton} />
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  position: ${p => p.position || 'absolute'};
  top: ${p => p.top || 0}px;
  left: 0;
  padding: ${Styles.PAGE_PADDING};
  z-index: 1;
`

export const BackImage = ({ imageSource, whiteButton }) => (
  <Image source={imageSource || Images.backArrow} resizeMode="contain" whiteButton={whiteButton}/>
)

const IMAGE_SIZE = 24

const Image = styled.Image`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  margin-right: 5px;
  tint-color: ${p => (p.whiteButton ? Colors.WHITE : Colors.MENU_BLUE)};
`
