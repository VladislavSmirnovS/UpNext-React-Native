import styled, { css } from 'styled-components'
import Texts from 'appearance/texts'

export const CenteredTitleText = styled(Texts.TitleText)`
  text-align: center;
  ${p => p.color && ColorStyle}
`

export const CenteredHeaderText = styled(Texts.HeaderText)`
  text-align: center;
`

const ICON_SIZE = 80

export const Icon = styled.Image`
  height: ${p => p.height || ICON_SIZE}px;
  width: ${p => p.height || ICON_SIZE}px;
  align-self: center;
  ${p => p.tintColor && TintColorStyle}
`

const TintColorStyle = css`
  tint-color: ${p => p.tintColor};
`

const ColorStyle = css`
  color: ${p => p.color};
`

export const Button = styled.TouchableOpacity`
  padding: 20px 0;
`
