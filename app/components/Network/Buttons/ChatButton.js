import React from 'react'
import { useDispatch } from 'react-redux'
import CommonButton from 'components/Network/Buttons/CommonButton'
import { openCurrentChatPage } from 'services/navigation'
import { getUserChatMember, getUserId, getUserAvatar } from 'utils/user'

export default ({ navigation, user, member, isFull, title }) => {
  const dispatch = useDispatch()

  const userId = getUserId(user)
  const memberId = getUserId(member)

  if (userId === memberId) {
    return null
  }

  const onChat = () => {
    const firstGroupMember = getUserChatMember(memberId, member?.first_name, getUserAvatar(member))
    const secondGroupMember = getUserChatMember(userId, user?.first_name, getUserAvatar(user))
    const params = {
      group: [firstGroupMember, secondGroupMember],
      groupName: `${firstGroupMember.nickname}, ${secondGroupMember.nickname}`,
      groupPicture: firstGroupMember.avatar,
    }
    dispatch(openCurrentChatPage(navigation, params))
  }

  return <CommonButton text={title} isFull={isFull} onPress={onChat} />
}
