import React from 'react'
import styled from 'styled-components'
import ConfirmConnect from 'components/Network/Buttons/ConfirmConnect'
import PendingButton from 'components/Network/Buttons/PendingButton'
import ChatButton from 'components/Network/Buttons/ChatButton'
import SturtupButton from 'components/Network/Buttons/SturtupButton'
import { useUser } from 'store/user/user.uses'
import { getUserId } from 'utils/user'

export default ({ navigation, member, withStartupBtns }) => {
  const { friend_status, teams } = member

  const user = useUser()

  const isMemberCurrentUser = () => {
    const currentUserId = getUserId(user)
    const memberId = getUserId(member)
    return currentUserId && memberId && currentUserId === memberId
  }

  const isFriend = () => {
    return friend_status === 'accept'
  }

  const isFriendPending = () => {
    return friend_status === 'pending'
  }

  const getStartupBtn = () => {
    // user teams
    return teams
      ? teams?.map((team, index) => {
          if (team.lobby) {
            return <SturtupButton navigation={navigation} team={team} index={index} />
          }
        })
      : null
  }

  const getChatBtn = () => {
    if (isFriend() || user?.is_mentor) {
      return (
        <ChatButton navigation={navigation} member={member} user={user} isFull title="Chat now" />
      )
    }
    if (isFriendPending()) {
      return <PendingButton />
    }
    return <ConfirmConnect navigation={navigation} member={member} />
  }

  if (isMemberCurrentUser()) {
    return null
  }

  return (
    <ButtonView>
      {withStartupBtns ? getStartupBtn() : null}
      {getChatBtn()}
    </ButtonView>
  )
}

const ButtonView = styled.View`
  justify-content: space-around;
  flex-wrap: wrap;
`
