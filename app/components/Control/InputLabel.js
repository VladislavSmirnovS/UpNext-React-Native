import React from 'react'
import styled from 'styled-components'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default ({ label, error, required }) => {
  if (!label) {
    return null
  }

  return (
    <Texts.PurpleHeaderText>
      {label}
      {error ? <ErrorText> - {error}</ErrorText> : null}
      {required ? <Required> *</Required> : null}
    </Texts.PurpleHeaderText>
  )
}

const Required = styled(Texts.SubtitleText)`
  color: ${Colors.INPUT_REQUIRED_RED};
`

const ErrorText = styled(Texts.SubtitleText)`
  color: ${Colors.COMMON_RED};
`
