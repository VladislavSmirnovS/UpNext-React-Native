import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import ListItemCard from 'components/ChatList/ListItemCard'
import { openCurrentChatPage } from 'services/navigation'
import { getUserFullName, getUserId, getUserAgeWithCountry } from 'utils/user'

export default ({ navigation, item, unreadMessageCount, children }) => {
  const dispatch = useDispatch()

  const { isPersonalChat } = useMemo(() => getChatInfo(item), [item])

  const member = useMemo(() => getMemberInfo(item, isPersonalChat), [item, isPersonalChat])
  const chatName = useMemo(() => getChatName(item, isPersonalChat), [item, isPersonalChat])
  const additionalText = useMemo(() => getAdditionalText(item), [item])
  const status = useMemo(() => getStatus(item, isPersonalChat), [item, isPersonalChat])
  const lastMsgTime = useMemo(() => getLastMsgTime(item), [item])
  const type = useMemo(() => item.secondMember?.check_founder_teenvestor, [item])

  const onPress = () => {
    const params = {
      url: item.url,
      isFromChat: true,
      channelType: item.channelType,
    }
    dispatch(openCurrentChatPage(navigation, params, item.url))
  }

  return (
    <ListItemCard
      member={member}
      chatName={chatName}
      status={status}
      unreadMessageCount={unreadMessageCount}
      time={lastMsgTime}
      onPress={onPress}
      type={type}
      additionalText={additionalText}
    >
      {children}
    </ListItemCard>
  )
}

const getChatInfo = item => {
  const { members } = item
  const isPersonalChat = item?.channelType === 'group' && members?.length === 2

  return { isPersonalChat }
}

const getMemberInfo = (item, isPersonalChat) => {
  const { coverUrl, secondMember } = item
  const chatImg = isPersonalChat ? secondMember?.plainProfileUrl : coverUrl

  const id = getUserId(secondMember)
  const nickname = secondMember?.name
  const avatar = chatImg

  return {
    id,
    nickname,
    avatar,
  }
}

const getChatName = (item, isPersonalChat) => {
  const { name, secondMember } = item
  return isPersonalChat ? getUserFullName(secondMember) : name
}

const getAdditionalText = item => {
  return getUserAgeWithCountry(item?.secondMember)
}

const getStatus = (item, isPersonalChat) => {
  const { secondMember } = item

  if (isPersonalChat) {
    return secondMember?.connectionStatus === 'online' ? 'online' : 'offline'
  }

  if (item.channelType === 'open') {
    return 'startup'
  }

  return null
}

const getLastMsgTime = item => {
  const { lastMessage } = item

  if (!lastMessage) {
    return null
  }

  const t = new Date(lastMessage?.createdAt)
  const hr = t.getHours()
  const min = t.getMinutes()
  return `${hr || '00'}:${min || '00'} ${t.getHours() >= 12 ? 'PM' : 'AM'}`
}
