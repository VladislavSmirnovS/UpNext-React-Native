import React, { memo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import { openCardVideosPage } from 'services/navigation'
import useStartupVideo from 'hooks/useStartupVideo'

const EmptyFeed = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isHasVideos, videos } = useStartupVideo('101')

  const onPress = () => {
    if (isHasVideos) {
      dispatch(openCardVideosPage(navigation, { videos, key: '101' }))
    }
  }

  return (
    <CenterdView>
      <LogoImage source={Images.upnextLogo} />
      <Spacer h={20} />
      <Texts.TitleText>Support ideas</Texts.TitleText>
      <Texts.TitleText>Influence what gets built</Texts.TitleText>
      <Texts.TitleText>Increase your chances of getting cool perks</Texts.TitleText>
      <Spacer h={20} />
      <Button text="Show me how" onPress={onPress} width="150px" height={40} />
    </CenterdView>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return true
}

export default memo(EmptyFeed, arePropsEqual)

const CenterdView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
  height:700;
`

const LogoImage = styled.Image`
  width: 134.3px;
  height: 46.3px;
`
