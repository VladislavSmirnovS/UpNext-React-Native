import React from 'react'
import styled, { css } from 'styled-components'
import Button from 'components/Control/Button'
import { useFilter } from 'store/notification/notification.uses'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'

export default () => {
  const filter = useFilter()

  if (filter.key === 'coins') {
    return <EmptyEl text={getText(filter.key)} animation="coin" />
  }

  if (filter.key === 'requests') {
    return <EmptyEl text={getText(filter.key)} renderTopEl={RequestTopEl} />
  }

  return <EmptyEl icon={filter.icon} text={getText(filter.key)} iconColor={filter.iconColor} />
}

const getText = key => {
  switch (key) {
    case 'upnext':
      return 'When Upnext’s admin sends you a message, you’ll see it here'

    case 'comments':
      return 'When someone comments on your video pitch, you’ll see it here'

    case 'coins':
      return 'When someone place a coin on your pitch, you’ll see it here'

    case 'requests':
      return 'When someone wants to connect with you, you’ll see it here'

    default:
      return 'Any activity whatsoever, you’ll see it here'
  }
}

const RequestTopEl = () => {
  return (
    <Button
      height={30}
      width="120px"
      text="Connect"
      onPress={onEmptyPress}
      activeOpacity={1}
      backgroundColor={Colors.BLACK}
    />
  )
}

const onEmptyPress = () => {}

const EmptyEl = ({ icon, iconColor, text, animation, renderTopEl }) => {
  return (
    <Container>
      {icon ? <Icon source={Images[icon]} resizeMode="contain" color={iconColor} /> : null}
      {animation ? <Image source={Images.coin} resizeMode="contain" /> : null}
      {renderTopEl && renderTopEl()}
      <Text>{text}</Text>
    </Container>
  )
}

const ICON_SIZE = 60

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Text = styled(Texts.GreyText)`
  text-align: center;
  margin-top: 10px;
`

const Icon = styled.Image`
  align-self: center;
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  ${p => p.color && iconColor}
`

const iconColor = css`
  tint-color: ${p => p.color};
`

const Image = styled.ImageBackground`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
`
