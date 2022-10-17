import { useSelector } from 'react-redux'

export const useCurrentChannel = () => useSelector(state => state.chat?.currentChannel)
export const useMessageList = () => useSelector(state => state.chat?.messageList)
export const useDraft = () => useSelector(state => state.chat?.draft)

export const useChatsList = () =>
  useSelector(state => [
    ...(state.chat?.chatsLists?.requests || []),
    ...(state.chat?.chatsLists?.personalChats || []),
    ...(state.chat?.chatsLists?.startupsChats || []),
    ...(state.chat?.chatsLists?.likedStartupsChats || []),
    ...(state.chat?.chatsLists?.pendings || []),
  ])
export const useChatsListPagination = () => useSelector(state => state.chat?.chatsListPagination)
