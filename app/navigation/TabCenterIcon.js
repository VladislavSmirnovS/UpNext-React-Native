import React from 'react'
import MenuImage from 'navigation/MenuImage'
import { useUserInitialized, useUserIsMentor } from 'store/user/user.uses'
import Images from 'appearance/images'

export default ({ focused }) => {
  const isUserInitialized = useUserInitialized()
  const userIsMentor = useUserIsMentor()

  if (isUserInitialized && userIsMentor) {
    return <MenuImage source={Images.search} focused={focused} />
  }

  return <MenuImage source={Images.menu_startup} focused={focused} size={AVATAR_SIZE} />
}

const AVATAR_SIZE = 35
