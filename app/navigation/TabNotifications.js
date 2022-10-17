import React from 'react'
import styled from 'styled-components'
import MenuImage from 'navigation/MenuImage'
import { useNewNotificationsCount } from 'store/app/app.uses'
import Images from 'appearance/images'
import Texts from 'appearance/texts'

export default ({ focused }) => {
  return (
    <>
      <MenuImage source={Images.menu_notifications} focused={focused} />
      <NotificationCount />
    </>
  )
}

const NotificationCount = () => {
  const newNotificationsCount = useNewNotificationsCount()

  return newNotificationsCount ? (
    <CountBackground>
      <Text>{newNotificationsCount}</Text>
    </CountBackground>
  ) : null
}

const CountBackground = styled.View`
  background: red;
  border-radius: 20px;
  padding: 1px 5px;
  position: absolute;
  right: -5px;
  top: 0;
`

const Text = styled(Texts.ButtonText)`
  font-size: 10px;
`
