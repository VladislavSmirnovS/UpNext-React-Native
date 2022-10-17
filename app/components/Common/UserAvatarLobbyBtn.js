import React from 'react'
import { useDispatch } from 'react-redux'
import AvatarBtn from 'components/Common/AvatarBtn'
import { openLobbyCurrentMemberPage } from 'services/navigation'

export default ({ uri, id, firsName, lastName, size, navigation, callback }) => {
  const dispatch = useDispatch()

  const onPress = () => {
    const params = { user_id: id }
    dispatch(openLobbyCurrentMemberPage(navigation, params))

    callback && callback()
  }

  return (
    <AvatarBtn
      uri={uri}
      id={id}
      firsName={firsName}
      lastName={lastName}
      size={size}
      onPress={onPress}
    />
  )
}
