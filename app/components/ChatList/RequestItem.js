import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import MemberItem from 'components/ChatList/MemberItem'
import ConfirmConnect from 'components/Network/Buttons/ConfirmConnect'
import DeclineConnect from 'components/Network/Buttons/DeclineConnect'
import { removeChatsListItem } from 'store/chat/chat.actions'
import Spacer from 'components/Page/Spacer'

export default ({ navigation, item }) => {
  return (
    <MemberItem item={item}>
      <Buttons navigation={navigation} item={item} />
    </MemberItem>
  )
}

const Buttons = ({ navigation, item }) => {
  const dispatch = useDispatch()

  const onConfirm = (id, status) => {
    if (status === 'accept') {
      dispatch(removeChatsListItem('requests', id))
    }
  }

  const onDecline = (id, status) => {
    if (status === 'reject') {
      dispatch(removeChatsListItem('requests', id))
    }
  }

  return (
    <ButtonGroup>
      <FlexButton>
        <ConfirmConnect
          width="77px"
          navigation={navigation}
          member={item}
          height={BUTTON_HEIGHT}
          withoutMargin
          callback={onConfirm}
          withPendingBtn
        />
      </FlexButton>
      <Spacer h={8} />
      <FlexButton>
        <DeclineConnect
          width="77px"
          navigation={navigation}
          member={item}
          height={BUTTON_HEIGHT}
          withoutMargin
          callback={onDecline}
        />
      </FlexButton>
    </ButtonGroup>
  )
}

const BUTTON_HEIGHT = 25

const ButtonGroup = styled.View`
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
`

const FlexButton = styled.View`
  flex: 1;
`
