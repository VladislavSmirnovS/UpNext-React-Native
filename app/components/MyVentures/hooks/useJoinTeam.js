import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { approvedInviteFromLink, setUserLoading } from 'store/user/user.actions'
import { useUserTeams, useUserInitialized } from 'store/user/user.uses'
import { openEditStartupPage } from 'services/navigation'

export default navigation => {
  const dispatch = useDispatch()
  const userTeams = useUserTeams()
  const isUserInitialized = useUserInitialized()

  const [params, setParams] = useState(navigation.state.params)
  const [isInviteHandle, setIsInviteHandle] = useState(false)

  useEffect(() => {
    if (navigation.state.params) {
      setParams(navigation.state.params)
    }
  }, [navigation.state.params])

  useEffect(() => {
    if (!isInviteHandle && isUserInitialized && params?.type) {
      if (params?.type === 'team_invite') {
        handleInvite()
      }
    }
  }, [isUserInitialized, params])

  const getUserTeamsIds = () => {
    return userTeams?.length ? userTeams?.map(item => item?.id) : []
  }

  const userHasInvitedTeam = invitedTeamId => {
    const userTeamsIds = getUserTeamsIds()
    return userTeamsIds.includes(invitedTeamId)
  }

  const handleInvite = () => {
    const { team_id } = params
    if (userHasInvitedTeam(team_id)) {
      // already in this team
      navigation.setParams({ type: null })
    } else {
      approveIvititaion()
    }
  }

  const approveIvititaion = () => {
    setIsInviteHandle(true)
    dispatch(setUserLoading(true))
    const { team_id, invite_user_id } = params
    dispatch(
      approvedInviteFromLink(invite_user_id, team_id, () => {
        dispatch(setUserLoading(false))
        dispatch(openEditStartupPage(navigation))
        setIsInviteHandle(false)

        setParams()
        navigation.setParams({ type: null })
      }),
    )
  }
}
