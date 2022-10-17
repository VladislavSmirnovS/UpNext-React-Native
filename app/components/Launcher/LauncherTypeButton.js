import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import { LAUNCHER_CANDIDATE_KEY, LAUNCHER_SEARCHER_KEY } from 'constants'

export default ({ type, isActive, title, description, onPress, size, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Icon source={getImage(type, isActive)} resizeMode="contain" size={size} />
      {title ? <Texts.BoldBlueTitleText textAlign="center">{title}</Texts.BoldBlueTitleText> : null}
      {description ? <CenteredText>{description}</CenteredText> : null}
    </TouchableOpacity>
  )
}

const getImage = (type, isActive) => {
  if (type === LAUNCHER_CANDIDATE_KEY) {
    return isActive ? Images.candidateIcon : Images.candidateDisabledIcon
  }

  if (type === LAUNCHER_SEARCHER_KEY) {
    return isActive ? Images.searcherIcon : Images.searcherDisabledIcon
  }

  return null
}

const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
`

const ICON_SIZE = 100

const Icon = styled.Image`
  height: ${p => p.size || ICON_SIZE}px;
  width: ${p => p.size || ICON_SIZE}px;
  align-self: center;
`

const CenteredText = styled(Texts.TitleText)`
  text-align: center;
  flex: 1;
`
