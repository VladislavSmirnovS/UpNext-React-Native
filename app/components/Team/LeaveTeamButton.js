import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ButtonOuter from 'components/Control/ButtonOuter'
import LeaveTeamModal from 'components/Team/LeaveTeamModal'
import Colors from 'appearance/colors'
import { leaveTeam } from 'store/user/user.actions'

export default ({ navigation, onCallback }) => {
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)

  const shownLeaveTeamModal = () => {
    setIsVisible(true)
  }

  const hideLeaveTeamModal = () => {
    setIsVisible(false)
  }

  const onConfirm = reason => {
    dispatch(leaveTeam(navigation, reason, onCallback))
  }

  return (
    <Container>
      <LeaveButton onPress={shownLeaveTeamModal} />
      <LeaveTeamModal isVisible={isVisible} onHide={hideLeaveTeamModal} onConfirm={onConfirm} />
    </Container>
  )
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`

const LeaveButton = ({ onPress }) => (
  <ButtonOuter
    text="Leave team"
    height={45}
    width="130px"
    onPress={onPress}
    color={Colors.COMMON_RED}
    textColor={Colors.TEXT_BRIGHT_BLUE}
  />
)
