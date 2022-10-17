import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import UserNeedProfileErrorModal from 'components/Control/UserNeedProfileErrorModal'
import CommonButton from 'components/Network/Buttons/CommonButton'
import PendingButton from 'components/Network/Buttons/PendingButton'
import { createFriendsInvite } from 'store/lobby/lobby.actions'
import { createChannel } from 'store/chat/chat.actions'
import {
  useIsCoFounderProfileCompleted,
  useUserId,
  useUserFirstName,
  useUserAvatar,
} from 'store/user/user.uses'
import mixpanel from 'services/mixpanel'
import { getUserChatMember, getUserId, getUserAvatar } from 'utils/user'
import Colors from 'appearance/colors'

export default ({ navigation, member, callback, withoutMargin, withPendingBtn, ...props }) => {
  if (!member?.isCoFounderProfileCompleted) {
    return null
  }

  const dispatch = useDispatch()
  const isCoFounderProfileCompleted = useIsCoFounderProfileCompleted()
  const userId = useUserId()
  const userFirstName = useUserFirstName()
  const userAvatar = useUserAvatar()

  const memberId = getUserId(member)

  const [isVisible, setIsVisible] = useState(false)
  const [isPending, setIsPendig] = useState(false)

  const onClose = () => {
    setIsVisible(false)
  }

  const isCompleted = () => {
    return isCoFounderProfileCompleted
  }

  const onConnect = () => {
    setIsPendig(true)
    dispatch(createFriendsInvite(memberId, createFriendsInviteCallback))
    mixpanel.trackEvent('Click on connect')
  }

  const createFriendsInviteCallback = (resUserId, status) => {
    if (status === 'accept') {
      const firstGroupMember = getUserChatMember(
        memberId,
        member?.first_name,
        getUserAvatar(member),
      )
      const secondGroupMember = getUserChatMember(userId, userFirstName, userAvatar)

      const group = [firstGroupMember, secondGroupMember]
      const groupName = `${firstGroupMember.nickname}, ${secondGroupMember.nickname}`
      const groupPicture = firstGroupMember.avatar

      dispatch(createChannel(group, groupName, groupPicture))
    }
    callback && callback(resUserId, status)
  }

  const onConnectPress = () => {
    if (isCompleted()) {
      onConnect()
    } else {
      setIsVisible(true)
    }
  }

  const isCurrentUser = () => {
    return userId === memberId
  }

  if (isCurrentUser()) {
    return null
  }

  return isPending && !withPendingBtn ? (
    <PendingButton {...props} withoutMargin={withoutMargin} />
  ) : (
    <>
      <CommonButton
        text="Connect"
        isFull
        onPress={onConnectPress}
        withoutMargin={withoutMargin}
        disabled={isPending}
        backgroundColor={Colors.WHITE}
        color={Colors.TEXT_BRIGHT_BLUE}
        borderWidth="2px"
        borderColor={Colors.TEXT_BRIGHT_BLUE}
        {...props}
      />
      <UserNeedProfileErrorModal
        isVisible={isVisible}
        onclose={onClose}
        title="Want to connect with others?"
        subTitle="They’d like to see your profile &#128521;"
        navigation={navigation}
      />
    </>
  )
}
