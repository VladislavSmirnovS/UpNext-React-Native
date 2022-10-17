import React from 'react'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'

export default ({ isVisible, buttonText, onButtonPress, children }) => {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <CenteredView>
        <CardView>{children}</CardView>
        <Spacer h={10} />
        {onButtonPress ? (
          <Button text={buttonText || 'OK'} height={38} onPress={onButtonPress} />
        ) : null}
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 20px 60px 20px;
`

const CardView = styled(Card)`
  padding: 20px;
  margin: 0;
  justify-content: center;
  align-items: center;
`
