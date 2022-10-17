import React from 'react'
import styled from 'styled-components'
import Styles from 'appearance/styles'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ views }) => {
  return (
    <Button>
      <BackImage />
      <StatusCount>{views}</StatusCount>
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 10;
  left: 0;
  padding: ${Styles.PAGE_PADDING};
  z-index: 1;
`

export const BackImage = () => <Image resizeMode="contain" source={Images.view} />

const StatusCount = styled(Texts.PurpleSubTitleText)`
  color: ${Colors.WHITE};
  font-weight: 600;
`

const Image = styled.Image`
  width: 14px;
  height: 8px;
  margin-right: 5px;
  tint-color: ${Colors.WHITE};
`
