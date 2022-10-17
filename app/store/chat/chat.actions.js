import sendbird from 'services/sendbird'
import {
  openMyStartupPage,
  openCurrentChatPage,
  CHAT_ROUTE,
  CURRENT_CHAT_ROUTE,
} from 'services/navigation'
import { handleError } from 'services/logger'
import api from 'services/api'
import streamio from 'services/streamio'
import { getTeamsOptions } from 'store/team/team.actions'
import { getLikedFeed, updateFeedActivityChatUrl } from 'store/feed/feed.actions'
import { onlyUnique } from 'services/utils'
import { getUserFullName, getUserId } from 'utils/user'

export const CHAT_HANDLER_ID = 'group_chat_handler_id'

export const CHAT_SET_CHATS_LISTS = 'CHAT_SET_CHATS_LISTS'
export const CHAT_SET_CHATS_LIST_PAGE = 'CHAT_SET_CHATS_LIST_PAGE'
export const CHAT_SET_CHATS_LIST_REQUEST_INDEX = 'CHAT_SET_CHATS_LIST_REQUEST_INDEX'
export const CHAT_SET_CHATS_LIST_IS_END = 'CHAT_SET_CHATS_LIST_IS_END'
export const CHAT_REMOVE_CHATSLIST_ITEM = 'CHAT_REMOVE_CHATSLIST_ITEM'
export const RESET_CHATS_LISTS = 'RESET_CHATS_LISTS'
export const CHAT_ADD_CHATSLIST_ITEM = 'CHAT_ADD_CHATSLIST_ITEM'
export const CHAT_SET_ADDITONAL_INFO = 'CHAT_SET_ADDITONAL_INFO'
export const CHAT_CHANGE_CHATSLIST_ITEM = 'CHAT_CHANGE_CHATSLIST_ITEM'
export const SET_OPEN_CHANNEL_LIST_QUERY = 'SET_OPEN_CHANNEL_LIST_QUERY'
export const SET_GROUP_CHANNEL_LIST_QUERY = 'SET_GROUP_CHANNEL_LIST_QUERY'
export const SET_CHANNEL_LIST = 'SET_CHANNEL_LIST'
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL'
export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const ADD_MESSAGE_TO_CHANNEL = 'ADD_MESSAGE_TO_CHANNEL'
export const CHANNEL_RESET = 'CHANNEL_RESET'
export const SET_CARDS_CHANNELS = 'SET_CARDS_CHANNELS'
export const SET_CARDS_MESSAGES = 'SET_CARDS_MESSAGES'
export const ADD_CARDS_MESSAGE = 'ADD_CARDS_MESSAGE'
export const ADD_MESSAGE_TO_CARDS_CHANNEL = 'ADD_MESSAGE_TO_CARDS_CHANNEL'
export const CHAT_SAVE_DRAFT = 'CHAT_SAVE_DRAFT'

export const resetChatsList = () => ({ type: RESET_CHATS_LISTS })

export const addChatsRequestFromEvent = item => async (dispatch, getState) => {
  const { requests } = getState().chat?.chatsLists
  if (requests) {
    dispatch(addChatsListItem('requests', item))
  }
}

export const removeChatsPendingsFromEvent = item => async (dispatch, getState) => {
  const { pendings } = getState().chat?.chatsLists
  if (pendings) {
    dispatch(removeChatsListItem('pendings', item.id))
  }
}

export const updateChatsWithAdd = (name, item) => (dispatch, getState) => {
  const chatList = getChatsList(getState())

  if (chatList) {
    const { chatsListPagination } = getState().chat
    const { requestIndex, requests } = chatsListPagination

    const currentItem = chatList.findIndex(i => i.id === item.id)
    const isNotExist = currentItem === -1

    dispatch(resetChatsList())

    if (isNotExist && requestIndex + 1 === requests?.length) {
      dispatch(addChatsListItem(name, item))
    } else {
      dispatch(resetChatsList())
    }
  }
}

export const getChatsList = state => {
  return [
    ...(state.chat?.chatsLists?.requests || []),
    ...(state.chat?.chatsLists?.personalChats || []),
    ...(state.chat?.chatsLists?.startupsChats || []),
    ...(state.chat?.chatsLists?.likedStartupsChats || []),
    ...(state.chat?.chatsLists?.pendings || []),
  ]
}

export const addChatsListItem = (name, item) => ({ type: CHAT_ADD_CHATSLIST_ITEM, name, item })

export const changeChatsListItem = (name, item) => ({
  type: CHAT_CHANGE_CHATSLIST_ITEM,
  name,
  item,
})

export const setChatsList = (name, list) => ({ type: CHAT_SET_CHATS_LISTS, name, list })

export const setChatsListPage = page => ({ type: CHAT_SET_CHATS_LIST_PAGE, page })

export const setChatsListRequestIndex = requestIndex => ({
  type: CHAT_SET_CHATS_LIST_REQUEST_INDEX,
  requestIndex,
})

export const setChatsListIsEnd = isEnd => ({ type: CHAT_SET_CHATS_LIST_IS_END, isEnd })

export const removeChatsListItem = (name, id) => ({ type: CHAT_REMOVE_CHATSLIST_ITEM, name, id })

export const getFriendsRequests = (page, size, callback) => async (dispatch, getState) => {
  try {
    const res = await api.getFriendsRequests(page, size)

    const { requests } = getState().chat?.chatsLists
    const resList = !page ? res.data?.result : [...(requests || []), ...res.data?.result]
    dispatch(setChatsList('requests', resList))
    callback && callback(res.data?.result?.length)
  } catch (error) {
    handleError(error)
  }
}

export const getSendbirdUserById = (memberId, callback) => async (dispatch, getState) => {
  try {
    const userInfo = dispatch(getUserInfoForChat())

    if (userInfo?.userId && memberId) {
      const res = await sendbird.getUserById(memberId)
      callback && callback(res)
    }
  } catch (error) {
    handleError(error)
  }
}

export const setAdditonalInfoById = (name, additionalInfo) => ({
  type: CHAT_SET_ADDITONAL_INFO,
  name,
  additionalInfo,
})

export const getFriendsPendings = (page, size, callback) => async (dispatch, getState) => {
  try {
    const res = await api.getFriendsPending(page, size)

    const { pendings } = getState().chat?.chatsLists
    const resList = !page ? res.data?.result : [...(pendings || []), ...res.data?.result]
    dispatch(setChatsList('pendings', resList))
    callback && callback(res.data?.result?.length)
  } catch (error) {
    handleError(error)
  }
}

export const createStartupChat = activity => async dispatch => {
  try {
    const userInfo = dispatch(getUserInfoForChat())

    if (userInfo?.userId && activity?.id && activity?.teamId) {
      const activitiesRes = await api.getActivitiesByIds([activity?.id])
      const checkedActivity = activitiesRes?.data?.results?.[0]

      const teamDataRes = await api.getTeamActivityDataForChat(activity?.teamId)
      const {
        new_team_members_ids,
        team_name,
        team_avatar,
        team_pain_video_feed_chat,
      } = teamDataRes?.data

      let chatUrl
      if (!checkedActivity.chatUrl && !team_pain_video_feed_chat) {
        await sendbird.checkSbConnect(userInfo)

        const openChannel = await sendbird.createOpenChannel({
          operatorUserIds: new_team_members_ids,
          name: `${team_name} Updates`,
          image: team_avatar,
        })
        chatUrl = openChannel.url
      }
      if (!checkedActivity.chatUrl && team_pain_video_feed_chat) {
        chatUrl = team_pain_video_feed_chat
      }
      if (checkedActivity.chatUrl && !team_pain_video_feed_chat) {
        chatUrl = checkedActivity.chatUrl
      }

      if (!checkedActivity.chatUrl) {
        await streamio.editActivityFields({ activityId: activity?.id, chatUrl })
      }

      if (!team_pain_video_feed_chat) {
        await api.setVideoPainFeedChat(activity?.teamId, chatUrl)
      }

      if (!checkedActivity.chatUrl || !team_pain_video_feed_chat) {
        dispatch(updateFeedActivityChatUrl(activity?.id, chatUrl))

        // dispatch(
        //   addChatsListItem('likedStartupsChats', {
        //     id: activity?.chatUrl,
        //     channelType: 'open',
        //     url: activity?.chatUrl,
        //     name: `${activity?.teamName} Updates`,
        //     coverUrl: activity?.teamImage,
        //   }),
        // )
      }
    }
  } catch (error) {
    handleError(error)
  }
}

export const leaveStartupChatAsOperator = (activityId, chatUrl) => dispatch => {
  const userInfo = dispatch(getUserInfoForChat())

  if (userInfo?.userId && activityId && chatUrl) {
    sendbird
      .checkSbConnect(userInfo)
      .then(() => sendbird.getOpenChannelByUrl(chatUrl))
      .then(openChannel => {
        const operatorsIds = openChannel.operators.map(item => item.userId)
        const newOperatorsIds = operatorsIds
          .filter(item => item !== userInfo?.userId)
          .filter(onlyUnique)

        return sendbird.updateOpenChanncelData({
          openChannel,
          operatorsIds: newOperatorsIds,
        })
      })
      .then(() => dispatch(resetChatsList()))
      .catch(error => handleError(error))
  }
}

export const joinStartupChatAsOperator = (activityId, chatUrl, team) => dispatch => {
  const userInfo = dispatch(getUserInfoForChat())

  if (userInfo?.userId && activityId && chatUrl) {
    sendbird
      .checkSbConnect(userInfo)
      .then(() => sendbird.getOpenChannelByUrl(chatUrl))
      .then(openChannel => {
        const operatorsIds = openChannel.operators.map(item => item.userId)
        const newOperatorsIds = [...operatorsIds, userInfo?.userId].filter(onlyUnique)

        dispatch(
          updateChatsWithAdd('startupsChats', {
            id: chatUrl,
            channelType: 'open',
            url: chatUrl,
            name: `${team?.name} Updates`,
            coverUrl: team?.avatar_small || team?.avatar,
          }),
        )

        return sendbird.updateOpenChanncelData({
          openChannel,
          operatorsIds: newOperatorsIds,
        })
      })
      .catch(error => handleError(error))
  }
}

export const changeStartupChatInfo = ({ chatUrl, name, coverUrl }) => dispatch => {
  const userInfo = dispatch(getUserInfoForChat())

  if (userInfo?.userId && chatUrl) {
    sendbird
      .checkSbConnect(userInfo)
      .then(() => sendbird.getOpenChannelByUrl(chatUrl))
      .then(openChannel =>
        sendbird.updateOpenChanncelData({
          openChannel,
          name: name ? `${name} Updates` : null,
          coverUrl,
        }),
      )
      .catch(error => handleError(error))
  }
}

const getTeamsChats = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    try {
      const { teamsOptions } = getState().team
      if (teamsOptions?.length) {
        resolve(teamsOptions)
      } else {
        dispatch(getTeamsOptions(res => resolve(res)))
      }
    } catch (error) {
      reject(error)
    }
  })
}

const getLikedFeedChats = page => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    try {
      const { likedFeedList, likedFeedPagination } = getState().feed

      if (likedFeedList?.length >= (page + 1) * likedFeedPagination.size) {
        const startIndex = page * likedFeedPagination.size
        const endIndex =
          startIndex + (likedFeedPagination.size > 1 ? likedFeedPagination.size - 1 : 1)
        const res = likedFeedList?.slice(startIndex, endIndex)
        resolve(res)
      } else {
        dispatch(getLikedFeed(page, likedFeedPagination.size, res => resolve(res)))
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const getPersonalChats = (page, size, callback) => async (dispatch, getState) => {
  try {
    const userInfo = dispatch(getUserInfoForChat())
    await sendbird.checkSbConnect(userInfo)

    const { personalChats } = getState().chat?.chatsLists

    let groupChannelsData = { list: [] }
    if (page === 0) {
      groupChannelsData = await sendbird.getChannelList(userInfo?.userId)
    } else {
      const { groupChannelListQuery } = getState().chat
      groupChannelsData = await sendbird.getGroupChannelNext(
        groupChannelListQuery,
        userInfo?.userId,
      )
    }

    dispatch(setGroupChannelListQuery(groupChannelsData?.groupChannelListQuery))

    const newList = groupChannelsData.list?.map(chatItem => {
      const secondMember = chatItem?.members?.find(member => member.userId !== userInfo.userId)
      return { ...chatItem, secondMember }
    })

    const resList = !page ? newList : [...(personalChats || []), ...newList]
    dispatch(setChatsList('personalChats', resList))
    callback && callback(newList?.length)

    if (newList?.length) {
      const ids = newList
        ?.map(chatItem => chatItem?.secondMember?.userId)
        .filter(item => !!item)
        .filter(onlyUnique)

      const res = await api.getUsersByIds(ids)
      dispatch(setAdditonalInfoById('personalChats', res.data?.result))
    }
  } catch (error) {
    handleError(error)
  }
}

export const getStartupsChats = (page, size, callback) => async (dispatch, getState) => {
  try {
    const userInfo = dispatch(getUserInfoForChat())
    await sendbird.checkSbConnect(userInfo)

    const { startupsChats } = getState().chat?.chatsLists

    if (!page) {
      const teamsOptions = await dispatch(getTeamsChats())
      const teamsChats = teamsOptions
        ?.filter(team => team?.pain_video_feed_chat)
        ?.map(team => {
          return {
            id: team?.pain_video_feed_chat,
            channelType: 'open',
            url: team?.pain_video_feed_chat,
            name: `${team?.name} Updates`,
            coverUrl: team?.avatar,
          }
        })

      const resList = !page ? teamsChats : [...(personalChats || []), ...teamsChats]
      dispatch(setChatsList('startupsChats', resList))
      callback && callback(resList?.length)
    } else {
      callback && callback(null)
    }
  } catch (error) {
    handleError(error)
  }
}

export const getLikedStartupsChats = (page, size, callback) => async (dispatch, getState) => {
  try {
    const userInfo = dispatch(getUserInfoForChat())
    await sendbird.checkSbConnect(userInfo)

    const { startupsChats, likedStartupsChats } = getState().chat?.chatsLists

    const teamsChatsUrls = startupsChats?.map(item => item.url)

    const likedFeedList = await dispatch(getLikedFeedChats(page))
    const likedFeedChats = likedFeedList
      ?.map(activity => {
        return {
          id: activity?.chatUrl,
          channelType: 'open',
          url: activity?.chatUrl,
          name: `${activity?.teamName} Updates`,
          coverUrl: activity?.teamImage,
        }
      })
      ?.filter(chat => !teamsChatsUrls?.includes(chat?.url))

    const resList = !page ? likedFeedChats : [...(likedStartupsChats || []), ...likedFeedChats]
    dispatch(setChatsList('likedStartupsChats', resList))
    callback && callback(likedFeedChats?.length)
  } catch (error) {
    handleError(error)
  }
}

export const getChannelList = (page, callback) => async (dispatch, getState) => {
  try {
    const userInfo = dispatch(getUserInfoForChat())
    await sendbird.checkSbConnect(userInfo)

    const { channelList } = getState().chat

    let groupChannelsData = { list: [] }
    if (page === 0) {
      groupChannelsData = await sendbird.getChannelList(userInfo?.userId)
    } else {
      const { groupChannelListQuery } = getState().chat
      groupChannelsData = await sendbird.getGroupChannelNext(
        groupChannelListQuery,
        userInfo?.userId,
      )
    }

    dispatch(setGroupChannelListQuery(groupChannelsData?.groupChannelListQuery))

    let teamsChats = []
    if (page === 0) {
      const teamsOptions = await dispatch(getTeamsChats())
      teamsChats = teamsOptions
        ?.filter(team => team?.pain_video_feed_chat)
        ?.map(team => {
          return {
            id: team?.pain_video_feed_chat,
            channelType: 'open',
            url: team?.pain_video_feed_chat,
            name: `${team?.name} Updates`,
            coverUrl: team?.avatar,
          }
        })
    }
    const teamsChatsUrls = teamsChats?.map(item => item.url)

    const likedFeedList = await dispatch(getLikedFeedChats(page))
    const likedFeedChats = likedFeedList
      ?.map(activity => {
        return {
          id: activity?.chatUrl,
          channelType: 'open',
          url: activity?.chatUrl,
          name: `${activity?.teamName} Updates`,
          coverUrl: activity?.teamImage,
        }
      })
      ?.filter(chat => !teamsChatsUrls?.includes(chat?.url))

    dispatch(
      setChannelList([
        ...(channelList || []),
        ...groupChannelsData?.list,
        ...teamsChats,
        ...likedFeedChats,
      ]),
    )

    callback && callback()
  } catch (error) {
    handleError(error)
  }
}

export const getOpenChannelNext = (openChannelNext, callback) => (dispatch, getState) => {
  const userInfo = dispatch(getUserInfoForChat())
  const { channelList } = getState().chat

  sendbird
    .getOpenChannelNext(openChannelNext, userInfo?.userId)
    .then(res => {
      dispatch(setChannelList(channelList.concat(res?.list)))
      dispatch(setOpenChannelListQuery(res?.openChannelListQuery))
    })
    .then(() => {
      callback && callback()
    })
    .catch(error => {
      handleError(error)
    })
}

export const getGroupChannelNext = (groupChannelListQuery, callback) => (dispatch, getState) => {
  const userInfo = dispatch(getUserInfoForChat())
  const { channelList } = getState().chat

  sendbird
    .getGroupChannelNext(groupChannelListQuery, userInfo?.userId)
    .then(res => {
      dispatch(setChannelList(channelList.concat(res?.list)))
      dispatch(setGroupChannelListQuery(res?.groupChannelListQuery))
    })
    .then(() => {
      callback && callback()
    })
    .catch(error => {
      handleError(error)
    })
}

export const reorderChannelList = () => (dispatch, getState) => {
  const { channelList } = getState().chat
  dispatch(setChannelList(channelList))
}

export const createChannel = (group, groupName, groupPicture) => async dispatch => {
  try {
    const userInfo = dispatch(getUserInfoForChat())
    await sendbird.checkSbConnect(userInfo)
    const channel = await sendbird.getCurrentChannel(
      null,
      group,
      groupName,
      groupPicture,
      false,
      true,
    )
    dispatch(addChatsListItem('personalChats', channel))
  } catch (error) {
    handleError(error)
  }
}

export const getCurrentChannel = (url, group, groupName, groupPicture, isFromChat) => dispatch => {
  const userInfo = dispatch(getUserInfoForChat())
  sendbird
    .checkSbConnect(userInfo)
    .then(() => sendbird.getCurrentChannel(url, group, groupName, groupPicture, isFromChat, true))
    .then(channel => {
      dispatch(setCurrentChannel(channel))
      return channel
    })
    .then(channel => sendbird.getChannelMessages(channel))
    .then(messageList => dispatch(setMessageList(messageList)))
    .catch(error => handleError(error))
}

export const getOpenChannel = url => dispatch => {
  const userInfo = dispatch(getUserInfoForChat())
  sendbird
    .checkSbConnect(userInfo)
    .then(() => sendbird.getOpenChannelByUrl(url))
    .then(channel => {
      dispatch(setCurrentChannel(channel))
      return channel
    })
    .then(channel => sendbird.getChannelMessages(channel))
    .then(messageList => dispatch(setMessageList(messageList)))
    .catch(error => handleError(error))
}

export const sendMessage = ({ channel, message, secondMemberId }) => dispatch => {
  sendbird
    .sendMessage(channel, message)
    .then(res => {
      const msg = sendbird.getMessageWithStatus(channel, res)
      dispatch(addMessage(msg))

      const resSendbird = {
        channel: {
          channel_url: channel.url,
          channel_type: channel.channelType,
        },
      }
      if (channel.channelType === 'open') {
        const data = channel.data ? JSON.parse(channel.data) : {}
        return api.addNotificationStartupChat(message, resSendbird, data.members, channel.url)
      } else {
        return api.addNotificationChat(secondMemberId, message, resSendbird)
      }
    })
    .catch(error => handleError(error))
}

export const removeMessage = (channel, message) => dispatch => {
  sendbird
    .removeMessage(channel, message)
    .then(res => {
      dispatch(deleteMessage(message.messageId))
    })
    .catch(error => handleError(error))
}

export const sendFile = ({ channel, file, secondMemberId, callback }) => dispatch => {
  sendbird
    .sendFile(channel, file)
    .then(res => {
      const msg = sendbird.getMessageWithStatus(channel, res)
      dispatch(addMessage(msg))
      callback && callback()

      const resSendbird = {
        channel: {
          channel_url: channel.url,
          channel_type: channel.channelType,
        },
      }
      if (channel.channelType === 'open') {
        const data = channel.data ? JSON.parse(channel.data) : {}
        return api.addNotificationStartupChat(
          'file attached',
          resSendbird,
          data.members,
          channel.url,
        )
      } else {
        return api.addNotificationChat(secondMemberId, 'file attached', resSendbird)
      }
    })
    .catch(error => handleError(error))
}

export const addChannelHandler = (navigation, id) => (dispatch, getState) => {
  const onMessageReceived = (channel, message) => {
    if (channel.channelType === 'group' && !!channel.customType) {
      dispatch(addMessageToCardsChannel(channel.customType, channel, message))
      dispatch(showCardsNotifications(navigation, message, channel.customType))
    } else {
      dispatch(addMessageToChannel(channel, message))
      dispatch(showChatNotifications(navigation, message))
    }
  }

  const onMessageRemoved = (channel, messageId) => {
    dispatch(deleteMessage(messageId))
  }

  const getNewMsgList = channel => {
    const messageList = getState().chat.messageList
    return messageList
      ? messageList.map(message => sendbird.getMessageWithStatus(channel, message))
      : null
  }

  const onDeliveryReceiptUpdated = channel => {
    const messageList = getNewMsgList(channel)
    dispatch(setMessageList(messageList))
  }
  const onReadReceiptUpdated = channel => {
    const messageList = getNewMsgList(channel)
    dispatch(setMessageList(messageList))
  }

  sendbird.addChannelHandler(
    id,
    onMessageReceived,
    onMessageRemoved,
    onDeliveryReceiptUpdated,
    onReadReceiptUpdated,
  )
}

export const showChatNotifications = (navigation, message) => (dispatch, getState) => {
  const { routeAction } = getState().app
  const isChatPage = routeAction?.routeName === CHAT_ROUTE
  const isCurrentChat =
    routeAction?.routeName === CURRENT_CHAT_ROUTE &&
    routeAction?.params?.url === message?.channelUrl

  if (!isChatPage && !isCurrentChat) {
    const onNotificatonPress = () => {
      dispatch(resetChannel())

      const params = {
        url: message.channelUrl,
        isFromChat: true,
        channelType: message?.channelType,
      }
      dispatch(openCurrentChatPage(navigation, params, message.channelUrl))
    }

    dispatch(showLocalNotifications(message, 'New message', onNotificatonPress))
  }
}

export const showCardsNotifications = (navigation, message, chatKey) => dispatch => {
  const onNotificatonPress = () => {
    dispatch(openMyStartupPage(navigation))
  }

  dispatch(showLocalNotifications(message, 'New comment', onNotificatonPress))
}

export const showLocalNotifications = (message, title, onNotificatonPress) => (
  dispatch,
  getState,
) => {
  const MAX_LENGTH = 25

  const { showNotification } = getState().app

  let msg = `${message?._sender?.nickname || message?.messageType}: `
  if (message.messageType === 'file') {
    msg += 'File attached'
  } else {
    msg +=
      message?.message.length > MAX_LENGTH
        ? `${message?.message.substring(0, MAX_LENGTH)}...`
        : message?.message
  }

  showNotification &&
    showNotification({
      icon: {
        uri: message?._sender?.plainProfileUrl,
        nickname: message?._sender?.nickname || message?.messageType,
      },
      title,
      message: message.messageType === 'file' ? 'File attached' : msg,
      onPress: onNotificatonPress,
    })
}

export const removeOpenChannels = (urls, callback) => (dispatch, getState) => {
  const userInfo = dispatch(getUserInfoForChat())

  sendbird
    .checkSbConnect(userInfo)
    .then(() => {
      const promisses = []
      urls.forEach(url => {
        if (url) {
          promisses.push(sendbird.removeChannel(url))
        }
      })
      Promise.all(promisses).then(() => {
        callback && callback()
      })
    })
    .catch(error => handleError(error))
}

export const removeOpenChannel = url => dispatch => {
  const userInfo = dispatch(getUserInfoForChat())

  sendbird
    .checkSbConnect(userInfo)
    .then(() => sendbird.removeChannel(url))
    .catch(error => handleError(error))
}

export const getUserInfoForChat = () => (dispatch, getState) => {
  const { user } = getState().user
  const userInfo = {
    userId: getUserId(user),
    nickname: getUserFullName(user),
    age: user.age,
    schoolCountry: user?.school_country,
  }
  return userInfo
}

export const removeChannelHandler = id => {
  sendbird.removeChannelHandler(id)
}

export const setChannelList = channelList => ({ type: SET_CHANNEL_LIST, channelList })

export const setOpenChannelListQuery = openChannelListQuery => ({
  type: SET_OPEN_CHANNEL_LIST_QUERY,
  openChannelListQuery,
})

export const setGroupChannelListQuery = groupChannelListQuery => ({
  type: SET_GROUP_CHANNEL_LIST_QUERY,
  groupChannelListQuery,
})

export const setCurrentChannel = currentChannel => ({ type: SET_CURRENT_CHANNEL, currentChannel })

export const setMessageList = messageList => ({ type: SET_MESSAGE_LIST, messageList })

export const addMessage = message => ({ type: ADD_MESSAGE, message })

export const deleteMessage = messageId => ({ type: REMOVE_MESSAGE, messageId })

export const addMessageToChannel = (channel, message) => ({
  type: ADD_MESSAGE_TO_CHANNEL,
  channel,
  message,
})

export const resetChannel = () => ({ type: CHANNEL_RESET })

export const setCardsChannels = (chatKey, channel) => ({
  type: SET_CARDS_CHANNELS,
  chatKey,
  channel,
})

export const setCardsMessages = (chatKey, messages) => ({
  type: SET_CARDS_MESSAGES,
  chatKey,
  messages,
})

export const addCardsMessage = (chatKey, message) => ({
  type: ADD_CARDS_MESSAGE,
  chatKey,
  message,
})

export const addMessageToCardsChannel = (chatKey, channel, message) => ({
  type: ADD_MESSAGE_TO_CARDS_CHANNEL,
  chatKey,
  channel,
  message,
})

export const saveDraft = (url, message) => ({ type: CHAT_SAVE_DRAFT, url, message })
