import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import Texts from 'appearance/texts'
import { getUserFullName } from 'utils/user'

export default ({ user, alignItems, subTitle }) => {
  return (
    <View alignItems={alignItems}>
      <NameText numberOfLines={1} ellipsizeMode="tail">
        {getUserFullName(user)}
      </NameText>
      <Texts.TitleText>{subTitle}</Texts.TitleText>
    </View>
  )
}

const AVATAR_SIZE = 80
const IMAGE_SIZE = 50

const View = styled.View`
  align-items: ${p => p.alignItems || 'flex-start'};
`

const { width } = Dimensions.get('window')
const NameText = styled(Texts.SubHeader)`
  max-width: ${width - 3 * 5 - 2 * 15 - AVATAR_SIZE - 2 * IMAGE_SIZE}px;
  font-weight: 700;
`
