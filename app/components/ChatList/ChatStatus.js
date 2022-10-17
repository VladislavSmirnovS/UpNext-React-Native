import React from 'react'
import styled, { css } from 'styled-components'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ status }) => {
  if (status === 'online') {
    return <OnlineStatus />
  }

  if (status === 'offline') {
    return <OfflineStatus />
  }

  if (status === 'startup') {
    return <StartupImage source={Images.menu_startup} resizeMode="contain" />
  }

  return null
}

const CIRCLE_SIZE = 16
const IMAGE_SIZE = 20

const Status = css`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: ${CIRCLE_SIZE / 2}px;
`

const Image = css`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`

const OfflineStatus = styled.View`
  ${Status};
  background: ${Colors.COMMON_GREY};
`

const OnlineStatus = styled.View`
  ${Status};
  background: ${Colors.MENU_BLUE};
`

const StartupImage = styled.Image`
  ${Image};
`
