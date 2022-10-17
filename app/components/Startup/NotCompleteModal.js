import React from 'react'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'

export default ({
  isVisible,
  modalText,
  additionalModalText,
  onConfirm,
  onSharePress,
  modalError,
  text,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <CenteredView>
        <CardView>
          {modalError ? null : <HeaderText>Please complete</HeaderText>}

          <Text>{modalText}</Text>
          <TitleText>{modalError}</TitleText>

          {modalError ? null : <TitleText>{text}</TitleText>}

          <Spacer h={20} />
          {additionalModalText ? (
            <>
              <TitleText>{additionalModalText}.</TitleText>
              <TouchableOpacity onPress={onSharePress}>
                <Texts.TitleText>Share with friends and get more coins</Texts.TitleText>
                <Image source={Images.share} resizeMode="contain" size={60} />
              </TouchableOpacity>
            </>
          ) : null}
          <Spacer h={30} />
          <Row isGroup={false}>
            {onConfirm ? <Button height={30} width="120px" text="OK" onPress={onConfirm} /> : null}
          </Row>
        </CardView>
      </CenteredView>
    </Modal>
  )
}

const IMAGE_SIZE = 24

const Modal = styled.Modal``

const TouchableOpacity = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
`

const CardView = styled(Card)`
  padding: 20px 30px;
`

const HeaderText = styled(Texts.HeaderText)`
  text-align: center;
  color: ${Colors.COMMON_BLUE};
`

const TitleText = styled(Texts.TitleText)`
  text-align: center;
`

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: ${p => (p.isGroup ? 'space-between' : 'center')};
`

const Text = styled(Texts.TitleText)`
  text-align: center;
  color: ${Colors.TEXT_GREY};
`

const Image = styled.Image`
  width: ${p => p.size || IMAGE_SIZE}px;
  height: ${p => p.size || IMAGE_SIZE}px;
  tint-color: ${p => p.color || Colors.TEXT_DARK_BLUE};
`
