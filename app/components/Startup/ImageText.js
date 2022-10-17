import React from 'react'
import styled from 'styled-components'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({ image, title, size, textColor, color }) => (
  <Row>
    {image ? <Image source={Images[image]} resizeMode="contain" size={size} color={color} /> : null}
    {title ? (
      <Title color={textColor} image={image}>
        {title}
      </Title>
    ) : null}
  </Row>
)

const IMAGE_SIZE = 24

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Image = styled.Image`
  width: ${p => p.size || IMAGE_SIZE}px;
  height: ${p => p.size || IMAGE_SIZE}px;
  tint-color: ${p => p.color || Colors.TEXT_DARK_BLUE};
`

const Title = styled(Texts.TitleText)`
  color: ${p => p.color || Colors.COMMON_BLUE};
  margin-left: ${p => (p.image ? '10px' : 0)};
`
