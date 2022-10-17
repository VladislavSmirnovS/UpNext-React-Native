import React, { memo } from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import Images from 'appearance/images'
import Texts from 'appearance/texts'

const EmptyFavoritesFeed = () => {
  return (
    <CenterdView>
      <LogoImage source={Images.upnextLogo} />
      <Spacer h={20} />
      <Texts.TitleText>Long-press any video in your feed to add it favorites</Texts.TitleText>
    </CenterdView>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return true
}

export default memo(EmptyFavoritesFeed, arePropsEqual)

const CenterdView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
`

const LogoImage = styled.Image`
  width: 134.3px;
  height: 46.3px;
`
