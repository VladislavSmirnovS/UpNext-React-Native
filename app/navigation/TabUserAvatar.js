import React from 'react'
import Avatar from 'components/Common/Avatar'
import { useUser, useUserInitialized } from 'store/user/user.uses'
import { getUserAvatarProps, getUserId } from 'utils/user'

export default () => {
  const user = useUser()
  const isUserInitialized = useUserInitialized()

  return (
    <Avatar
      withoutUser={isUserInitialized && !getUserId(user)}
      {...getUserAvatarProps(user)}
      size={AVATAR_SIZE}
    />
  )
}

const AVATAR_SIZE = 35
