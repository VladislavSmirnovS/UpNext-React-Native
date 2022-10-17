import React from 'react'
import styled from 'styled-components'
import { openAppInStorage } from 'services/app'
import Texts from 'appearance/texts'

export default ({}) => {
  return (
    <>
      <MainText>Your version is too low, please</MainText>
      <TouchableOpacity onPress={openAppInStorage}>
        <LinkText>update to the latest version</LinkText>
      </TouchableOpacity>
    </>
  )
}

const MainText = styled(Texts.TitleText)`
  width: 100%;
  text-align: center;
`

const LinkText = styled(Texts.BoldBlueTitleText)`
  width: 100%;
  text-align: center;
`

const TouchableOpacity = styled.TouchableOpacity``
