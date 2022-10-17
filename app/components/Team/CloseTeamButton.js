import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ButtonOuter from 'components/Control/ButtonOuter'
import AlertModal from 'components/Control/AlertModal'
import Colors from 'appearance/colors'
import { closeTeam } from 'store/team/team.actions'

export default ({ team, navigation, onCallback }) => {
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)

  const shownConfirmModal = () => {
    setIsVisible(true)
  }

  const hideConfirmModal = () => {
    setIsVisible(false)
  }

  const onConfirm = () => {
    dispatch(closeTeam(team, navigation, onCallback))
    hideConfirmModal()
  }

  return (
    <Container>
      <CloseButton onPress={shownConfirmModal} />
      <AlertModal
        isVisible={isVisible}
        text="Closing this team will delete all of it's info and history"
        okText="Close team"
        onConfirm={onConfirm}
        cancelText="Cancel"
        onCancel={hideConfirmModal}
      />
    </Container>
  )
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`

const CloseButton = ({ onPress }) => (
  <ButtonOuter
    text="Close team"
    height={45}
    width="130px"
    onPress={onPress}
    color={Colors.COMMON_RED}
    textColor={Colors.TEXT_BRIGHT_BLUE}
  />
)
