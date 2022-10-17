import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import AlertModal from 'components/Control/AlertModal'
import { setIsShowNotLoginAlert } from 'store/app/app.actions'
import { openLoginPage } from 'services/navigation'
import { useIsShowNotLoginAlert } from 'store/app/app.uses'
import mixpanel from 'services/mixpanel'

const NotLoginAlert = ({ isFocused, navigation }) => {
  const dispatch = useDispatch()
  const isShowNotLoginAlert = useIsShowNotLoginAlert()

  const onConfirm = () => {
    onClose()
    dispatch(openLoginPage(navigation))
    mixpanel.trackEvent('Login to continue OK')
  }

  const onCancel = () => {
    onClose()
    mixpanel.trackEvent('Login to continue Cancel')
  }

  const onClose = () => {
    dispatch(setIsShowNotLoginAlert(false))
  }

  return (
    <AlertModal
      isVisible={isFocused && isShowNotLoginAlert}
      title="Login to continue"
      okText="OK"
      onConfirm={onConfirm}
      cancelText="Cancel"
      onCancel={onCancel}
    />
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  return true
}

export default memo(withNavigationFocus(NotLoginAlert), arePropsEqual)
