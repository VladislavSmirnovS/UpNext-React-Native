import React from 'react'
import { useDispatch } from 'react-redux'
import AvatarBtn from 'components/Common/AvatarBtn'
import { openLobbyCurrentTeamPage } from 'services/navigation'

export default ({ uri, id, firsName, lastName, size, navigation }) => {
  const dispatch = useDispatch()

  const onPress = () => {
    const params = { teamId: id }
    dispatch(openLobbyCurrentTeamPage(navigation, params))
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
