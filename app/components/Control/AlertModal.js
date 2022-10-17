import React from 'react'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'
import Loading from 'components/Page/Loading'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import LinearGradient from 'react-native-linear-gradient'

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
  okWidth,
  cancelWidth,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <LinearGradientBackground colors={GRADIENT_COLORS} />
      <CenteredView>
        <CardView>
          {title ? (
            <>
              <HeaderText>{title}</HeaderText>
              <Spacer h={25} />
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
                height={30}
                width={okWidth || '92px'}
                text={okText}
                backgroundColor={Colors.WHITE}
                onPress={onConfirm}
                disabled={isLoading}
                color={Colors.TEXT_BRIGHT_BLUE}
                borderWidth={2}
                borderColor={Colors.TEXT_BRIGHT_BLUE}
                radius={20}
                fontSize={16}
              />
            ) : null}

            {onCancel ? (
              <Button
                height={30}
                width={cancelWidth || '92px'}
                text={cancelText}
                backgroundColor={Colors.WHITE}
                onPress={onCancel}
                disabled={isLoading}
                color={Colors.TEXT_RED}
                radius={20}
                borderColor={Colors.TEXT_RED}
                borderWidth={2}
                fontSize={16}
              />
            ) : null}
          </Row>
        </CardView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const CardView = styled(Card)`
  padding: 25px 30px;
  width: 85%;
  margin: 0;
`

const HeaderText = styled(Texts.PurpleHeaderText)`
  padding-top: 7px;
  text-align: center;
`

const TitleText = styled(Texts.TitleText)`
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
const LinearGradientBackground = styled(LinearGradient)`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.6;
`
const GRADIENT_COLORS = ['#3F005E', '#000000']
