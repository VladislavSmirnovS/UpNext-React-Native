import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'native-base'
import Colors from 'appearance/colors'

export default ({ onClose, onCopy, onRemove }) => {
  return (
    <Container>
      <TransparentButton onPress={onClose}>
        <Icon name="close" noShadow />
      </TransparentButton>

      <RightContainer>
        {onCopy ? (
          <TransparentButton onPress={onCopy}>
            <Icon name="copy" noShadow />
          </TransparentButton>
        ) : null}

        {onRemove ? (
          <TransparentButton onPress={onRemove}>
            <Icon name="trash" noShadow />
          </TransparentButton>
        ) : null}
      </RightContainer>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${Colors.COMMON_BLUE};
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`

const RightContainer = styled.View`
  flex-direction: row;
`

const TransparentButton = styled(Button)`
  background-color: transparent;
  elevation: 0;
`
