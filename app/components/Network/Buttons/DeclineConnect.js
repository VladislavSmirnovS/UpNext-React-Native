import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'components/Control/Button'
import Colors from 'appearance/colors'
import { declineFriendsInvite } from 'store/lobby/lobby.actions'
import mixpanel from 'services/mixpanel'
import { getUserId } from 'utils/user'

export default ({ navigation, member, callback, withoutMargin, ...props }) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const onDeclinePress = () => {
    setIsLoading(true)
    dispatch(declineFriendsInvite(getUserId(member), callback))
    mixpanel.trackEvent('Click on decline connect')
  }

  return (
    <Button
      text="Decline"
      isFull
      onPress={onDeclinePress}
      withoutMargin={withoutMargin}
      disabled={isLoading}
      backgroundColor={Colors.WHITE}
      color={Colors.COMMON_GREY}
      borderWidth={2}
      borderColor={Colors.COMMON_GREY}
      {...props}
    />
  )
}
