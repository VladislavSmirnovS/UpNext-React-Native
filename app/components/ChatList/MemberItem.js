import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ListItemCard from 'components/ChatList/ListItemCard'
import { getSendbirdUserById } from 'store/chat/chat.actions'
import { getUserFullName, getUserId, getUserAvatar, getUserAgeWithCountry } from 'utils/user'

export default ({ item, children }) => {
  const dispatch = useDispatch()

  const member = useMemo(() => getMemberInfo(item), [item])
  const chatName = useMemo(() => getUserFullName(item), [item])
  const additionalText = useMemo(() => getUserAgeWithCountry(item), [item])
  const type = useMemo(() => item.check_founder_teenvestor, [item])

  const [status, setStatus] = useState()
  useEffect(() => {
    if (!status) {
      dispatch(
        getSendbirdUserById(item?.id, res => {
          setStatus(res?.is_online ? 'online' : 'offline')
        }),
      )
    }
  }, [status])

  return (
    <ListItemCard
      member={member}
      chatName={chatName}
      status={status}
      type={type}
      additionalText={additionalText}
    >
      {children}
    </ListItemCard>
  )
}

const getMemberInfo = item => {
  const id = getUserId(item)
  const nickname = getUserFullName(item)
  const avatar = getUserAvatar(item)

  return {
    id,
    nickname,
    avatar,
  }
}
