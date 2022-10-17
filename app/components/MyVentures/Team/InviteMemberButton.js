import React from 'react'
import { useDispatch } from 'react-redux'
import PlusButton from 'components/MyVentures/PlusButton'
import { updateTeam, inviteToTeamByLink } from 'store/team/team.actions'
import { useUser } from 'store/user/user.uses'
import { useTeam } from 'store/team/team.uses'

export default ({ size, navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()
  const team = useTeam()

  const onPress = () => {
    if (team) {
      inviteToTeam(team)
    } else {
      createNewTeam(inviteToTeam)
    }
  }

  const inviteToTeam = team => {
    dispatch(inviteToTeamByLink({ team, user, navigation }))
  }

  const createNewTeam = callback => {
    dispatch(updateTeam({ team: {}, callback }))
  }

  return <PlusButton onPress={onPress} size={size} />
}
