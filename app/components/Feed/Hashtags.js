import React, { memo } from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

const Hashtags = ({ item }) => {
  return item?.hashtags?.length ? (
    <HashtagText numberOfLines={2} ellipsizeMode="tail">
      {item?.hashtags?.map(item => `#${item} `)}
    </HashtagText>
  ) : null
}

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.item?.hashtags === nextProps.item?.hashtags
}

export default memo(Hashtags, arePropsEqual)

const HashtagText = styled(Texts.ContentText)`
  color: ${Colors.MENU_PURPLE};
`
