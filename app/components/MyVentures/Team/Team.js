import React, { useState, useEffect, useMemo, memo } from 'react'
import { InteractionManager } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Member from 'components/MyVentures/Team/Member'
import BlueCard from 'components/MyProfile/BlueCard'
import LeaveTeamButton from 'components/Team/LeaveTeamButton'
import CloseTeamButton from 'components/Team/CloseTeamButton'
import NewMember from 'components/MyVentures/Team/NewMember'
import { updateTeamMemberRole } from 'store/team/team.actions'
import { useUser } from 'store/user/user.uses'
import { useTeam } from 'store/team/team.uses'
import { useRoles } from 'store/app/app.uses'
import { getUserId } from 'utils/user'

// memo
const Team = ({ navigation }) => {
  const dispatch = useDispatch()

  const user = useUser()
  const team = useTeam()
  const roleOptions = useRoles()

  const [members, setMembers] = useState([])
  // const options = useMemo(() => getRoles(members, team?.open_role, roleOptions), [
  //   members,
  //   roleOptions,
  //   team?.open_role,
  // ])

  useEffect(() => {
    const teamMembersWithoutStartup = [{ ...user, id: getUserId(user) }]
    setMembers(team?.new_team_members || teamMembersWithoutStartup)
  }, [team])

  const setRole = (memberId, role) => {
    const currentMember = members?.find(item => item?.id === memberId)
    const newMembers = members?.map(item =>
      item?.id === memberId ? { ...currentMember, role } : item,
    )
    setMembers(newMembers)

    InteractionManager.runAfterInteractions(() => {
      dispatch(updateTeamMemberRole(memberId, role))
    })
  }

  // const updateTeamOpenRole = role => {
  //   dispatch(updateTeam({ team: { ...team, open_role: role } }))
  // }

  const getDisabledRoles = () => {
    const one_role = 'Hustler'
    const membersRoles = members.map(item => item?.role)
    return membersRoles.includes(one_role) ? [one_role] : []
  }

  const renderMember = item => {
    return (
      <BlueCardWrapper key={getUserId(item)}>
        <Member
          size={AVATAR_SIZE}
          item={item}
          roleOptions={roleOptions}
          disabledRoles={getDisabledRoles()}
          setRole={setRole}
          navigation={navigation}
        />
      </BlueCardWrapper>
    )
  }

  const renderLeaveTeamButton = () => {
    return team?.new_team_members?.length > 1 ? <LeaveTeamButton navigation={navigation} /> : null
  }

  const renderCloseTeamButton = () => {
    return team?.new_team_members?.length === 1 ? (
      <CloseTeamButton team={team} navigation={navigation} />
    ) : null
  }

  return (
    <>
      {members?.map(renderMember)}

      <BlueCardWrapper>
        <NewMember
          size={AVATAR_SIZE}
          navigation={navigation}
          // roleOpen={team?.open_role}
          // roleOptions={roleOptions}
          // updateTeamOpenRole={updateTeamOpenRole}
        />
      </BlueCardWrapper>

      <FlexSpacer />
      {renderLeaveTeamButton()}
      {renderCloseTeamButton()}
    </>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return true
}

export default memo(Team, arePropsEqual)

// const getRoles = (members, openRole, roleOptions) => {
//   const one_role = 'Hustler'
//   const membersRoles = members.map(item => item.role)
//   const roles = openRole ? [...membersRoles, openRole] : membersRoles
//   return roles.includes(one_role) ? roleOptions?.filter(item => item !== one_role) : roleOptions
// }

const BlueCardWrapper = ({ children }) => {
  return <BlueCard wrapPadding={CARD_PADDING}>{children}</BlueCard>
}

const AVATAR_SIZE = 80
const CARD_PADDING = '5px 15px'

const FlexSpacer = styled.View`
  flex: 1;
`
