import React, { useState } from 'react'
import Modal from 'components/Team/Modal'
import ReasonItem from 'components/Team/LeaveTeamReason'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'

export default ({ isVisible, onHide, onConfirm }) => {
  const [reason, setReason] = useState(null)

  const onClose = () => {
    setReason(null)
    onHide()
  }

  const onSend = () => {
    setReason(null)
    onConfirm(reason)
    onHide()
  }

  const renderOptions = item => {
    return (
      <ReasonItem key={item} item={item} isSelected={reason === item} onSetReason={setReason} />
    )
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Card>
        <Texts.HeaderText>Why are you leaving the team</Texts.HeaderText>
        <Spacer h={20} />
        {REASON_OPTIONS.map(renderOptions)}
        <Spacer h={20} />
        <Button text="Send" disabled={!reason} onPress={onSend} padding={15} />
      </Card>
    </Modal>
  )
}

const REASON_OPTIONS = [
  'Not a good people match',
  'Not a good topic match',
  'I don`t have time',
  'Other reason',
]
