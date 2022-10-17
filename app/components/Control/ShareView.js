import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'
import ShareSheet from 'components/Control/ShareSheet'
import { setShareData } from 'store/app/app.actions'
import { useShareData } from 'store/app/app.uses'

const ShareView = ({ isFocused }) => {
  const dispatch = useDispatch()

  const shareData = useShareData()

  useEffect(() => {
    if (!isFocused && !!shareData) {
      onShareClose()
    }
  }, [isFocused])

  const onShareClose = () => {
    dispatch(setShareData(null))
  }

  return isFocused ? (
    <ShareSheet isVisible={!!shareData} onClose={onShareClose} shareData={shareData} />
  ) : null
}

const arePropsEqual = (prevProps, nextProps) => {
  const isFocusedChanged = prevProps.isFocused === nextProps.isFocused
  return isFocusedChanged
}

export default memo(withNavigationFocus(ShareView), arePropsEqual)
