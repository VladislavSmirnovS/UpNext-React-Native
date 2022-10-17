import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import ButtonOuter from 'components/Control/ButtonOuter'
import Spacer from 'components/Page/Spacer'
import Loading from 'components/Page/Loading'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default ({
  isVisible,
  title,
  text,
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  okText = 'Continue',
  isLoading = false,
  getBodyText = null,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <CenteredView>
        <CardView>
          {title ? (
            <>
              <HeaderText>{title}</HeaderText>
              <Spacer h={20} />
            </>
          ) : null}
          {getBodyText && getBodyText()}
          {text ? (
            <>
              <TitleText>{text}</TitleText>
              <Spacer h={20} />
            </>
          ) : null}
          {isLoading ? (
            <WrapperLoader>
              <Loading />
            </WrapperLoader>
          ) : null}

          <Row isGroup={onCancel && onConfirm}>
            {onConfirm ? (
              <Button
                height={38}
                width="120px"
                text={okText}
                onPress={onConfirm}
                disabled={isLoading}
              />
            ) : null}
            {onCancel ? (
              <ButtonOuter
                height={38}
                width="120px"
                text={cancelText}
                onPress={onCancel}
                disabled={isLoading}
              />
            ) : null}
          </Row>
        </CardView>
      </CenteredView>
    </Modal>
  )
}

const { width } = Dimensions.get('window')
const MAX_WIDTH = width - 40

const Modal = styled.Modal``

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
`

const CardView = styled(Card)`
  padding: 20px;
  height: ${MAX_WIDTH}px;
  border-radius: ${MAX_WIDTH}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border: 5px solid ${Colors.COMMON_BLUE};
`

const HeaderText = styled(Texts.HeaderText)`
  text-align: center;
  font-size: 35px;
  line-height: 35px;
`

const TitleText = styled(Texts.HeaderText)`
  text-align: center;
`

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: ${p => (p.isGroup ? 'space-around' : 'center')};
`

const WrapperLoader = styled.View`
  height: 80px;
`
