import React, { useEffect, useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import Spacer from 'components/Page/Spacer'
import Loading from 'components/Page/Loading'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import { setAppAlert } from 'store/app/app.actions'
import { useAppAlert } from 'store/app/app.uses'

const AppAlert = ({ isFocused }) => {
  let timer = null
  const dispatch = useDispatch()
  const appAlert = useAppAlert()
  const [confirmCallbackCounter, setConfirmCallbackCounter] = useState()

  useEffect(() => {
    if (appAlert && appAlert.callbackConfirmInterval && appAlert.callbackConfirmInterval > 0) {
      !confirmCallbackCounter && setConfirmCallbackCounter(appAlert.callbackConfirmInterval)
      onCount()
    }
    return () => clearTimeout(timer)
  }, [appAlert, confirmCallbackCounter])

  const onCount = () => {
    timer = setTimeout(() => {
      const counter = confirmCallbackCounter - 1
      setConfirmCallbackCounter(counter)
      if (counter === 0) {
        dispatch(setAppAlert(null))
        appAlert.onConfirm()
      }
    }, 1000)
  }

  const getConfirmBtnText = () => {
    const counterText = confirmCallbackCounter ? ` (${confirmCallbackCounter} sec)` : ''
    return appAlert.okText ? appAlert.okText + counterText : 'Continue' + counterText
  }

  const onClickOutside = () => {
    if (appAlert.isCloseByOutside) {
      dispatch(setAppAlert(null))
    }
  }

  const onConfirm = () => {
    dispatch(setAppAlert(null))
    appAlert.onConfirm()
  }

  const onCancel = () => {
    dispatch(setAppAlert(null))
    appAlert.onCancel()
  }

  return isFocused && appAlert ? (
    <Modal animationType={false} transparent={true} visible={true}>
      <CenteredView activeOpacity={appAlert.isCloseByOutside ? 0 : 1} onPress={onClickOutside}>
        <CardView>
          {appAlert.title ? (
            <>
              <HeaderText>{appAlert.title}</HeaderText>
              <Spacer h={20} />
            </>
          ) : null}
          {appAlert.text ? (
            <>
              <TitleText>{appAlert.text}</TitleText>
              <Spacer h={20} />
            </>
          ) : null}
          {appAlert.body ? (
            <>
              {appAlert.body}
              <Spacer h={20} />
            </>
          ) : null}

          {appAlert.isLoading ? (
            <WrapperLoader>
              <Loading />
            </WrapperLoader>
          ) : null}

          <Row isGroup={appAlert.onCancel && appAlert.onConfirm}>
            {appAlert.onConfirm ? (
              <Button
                height={30}
                text={getConfirmBtnText()}
                onPress={onConfirm}
                disabled={appAlert.isLoading}
                width={appAlert.isSmallBtns ? '120px' : null}
              />
            ) : null}
            {appAlert.onCancel ? (
              <Button
                height={30}
                text={appAlert.cancelText || 'Cancel'}
                backgroundColor={Colors.BUTTON_RED}
                onPress={onCancel}
                disabled={appAlert.isLoading}
                width={appAlert.isSmallBtns ? '120px' : null}
              />
            ) : null}
          </Row>
        </CardView>
      </CenteredView>
    </Modal>
  ) : null
}

const arePropsEqual = (prevProps, nextProps) => {
  const isFocusedChanged = prevProps.isFocused === nextProps.isFocused
  return isFocusedChanged
}

export default memo(withNavigationFocus(AppAlert), arePropsEqual)

const Modal = styled.Modal``

const CenteredView = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
`

const CardView = styled(Card)`
  padding: 20px 30px;
`

const HeaderText = styled(Texts.HeaderText)`
  text-align: center;
`

const TitleText = styled(Texts.TitleText)`
  text-align: center;
`

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: ${p => (p.isGroup ? 'space-between' : 'center')};
`

const WrapperLoader = styled.View`
  height: 80px;
`
