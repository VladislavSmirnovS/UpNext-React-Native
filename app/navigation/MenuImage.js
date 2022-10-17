import React from 'react'
import { Image } from 'react-native'
import Colors from 'appearance/colors'

export default ({ source, size, focused }) => {
  const imageSize = size || MENU_ITEM_SIZE
  const tintColor = focused ? Colors.MENU_PURPLE : Colors.MENU_BLUE
  const imageStyle = { tintColor, height: imageSize, width: imageSize }

  return <Image source={source} resizeMode="contain" style={imageStyle} />
}

const MENU_ITEM_SIZE = 30
