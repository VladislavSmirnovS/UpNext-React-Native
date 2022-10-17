import React from 'react'
import { useDispatch } from 'react-redux'
import { InteractionManager } from 'react-native'
import Button from 'components/Control/Button'
import { logout } from 'store/auth/auth.actions'
import { setBranchObject } from 'store/user/user.actions'
import Colors from 'appearance/colors'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const doLogout = () => {
    InteractionManager.runAfterInteractions(async () => {
      resetBranchData()
      await dispatch(logout(navigation))
    })
  }

  const resetBranchData = () => {
    dispatch(setBranchObject(null))
  }

  return (
    <Button
      text="Logout"
      onPress={doLogout}
      width="140px"
      backgroundColor={Colors.TEXT_DARK_PURPLE}
      height={35}
    />
  )
}
