import React, { useState, useEffect, useRef } from 'react'
import { AppState, Platform, KeyboardAvoidingView, View, FlatList, Clipboard } from 'react-native'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import ScrollPadder from 'components/Page/ScrollPadder'
import Message from 'components/Chat/Message'
import ChatInput from 'components/Chat/Input'
import ChatMenu from 'components/Chat/ChatMenu'
import { setAppAlert } from 'store/app/app.actions'
import {
  getCurrentChannel,
  resetChannel,
  sendMessage,
  sendFile,
  reorderChannelList,
  removeMessage,
  saveDraft,
  getOpenChannel,
} from 'store/chat/chat.actions'
import { useCurrentChannel, useMessageList, useDraft } from 'store/chat/chat.uses'
import { useUser } from 'store/user/user.uses'
import { openChatPage } from 'services/navigation'
import api from 'services/api'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { handleError } from 'services/logger'
import { showCopyDoneAlert } from 'services/toast'
import { getUserId } from 'utils/user'

// Android does keyboard height adjustment natively.
const ChatView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})()

const CurrentChat = ({ navigation }) => {
  const draft = useDraft()

  const [message, setMessage] = useState('')
  const [choosenMsg, setChoosenMsg] = useState(false)
  const [isSending, setIsSending] = useState('')
  const [isError, setIsError] = useState(false)

  const onMessageLongPress = item => {
    setChoosenMsg(item)
  }

  const onMessagePress = () => {
    if (choosenMsg) {
      setChoosenMsg(null)
    }
  }

  const onChatMenuClose = () => {
    setChoosenMsg(null)
  }

  const onChatMenuRemove = () => {
    dispatch(removeMessage(channel, choosenMsg))
    setChoosenMsg(null)
  }

  const [appState, setAppState] = useState(AppState.currentState)
  const scroll = useRef(null)

  const { url, group, groupName, groupPicture, isFromChat, channelType } = navigation.state.params
  const dispatch = useDispatch()

  const user = useUser()
  const userId = getUserId(user)
  const channel = useCurrentChannel()
  const messages = useMessageList()

  const isPersonalChat =
    (!channel?.channelType || channelType !== 'open') && channel?.members?.length === 2
  const secondMember = channel?.members?.find(item => item.userId !== userId)
  const isOpenChannel = channel?.channelType && channelType === 'open'
  const chatName = isPersonalChat ? secondMember?.nickname : channel?.name

  const [localActivity, setLocalActivity] = useState()

  useEffect(() => {
    if (!localActivity && channelType === 'open') {
      api.getActivityByChatUrl(url).then(res => {
        setLocalActivity(res.data)
      })
    }
  }, [localActivity, channelType])

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    return () => AppState.removeEventListener('change', _handleAppStateChange)
  }, [])

  const _handleAppStateChange = nextAppState => {
    setAppState(nextAppState)
  }

  useEffect(() => {
    if (appState === 'active') {
      if (channelType === 'open') {
        dispatch(getOpenChannel(url))
      } else {
        dispatch(getCurrentChannel(url, group, groupName, groupPicture, isFromChat))
      }
    }
    return () => {
      dispatch(resetChannel())
    }
  }, [appState])

  useEffect(() => {
    const membersIds = getMembersIds()
    const operatorsIds = getOperatorsIds()

    if (isOpenChannel && (membersIds || operatorsIds)) {
      const isMember = membersIds?.length ? membersIds.includes(userId) : true
      const isOperator = operatorsIds?.length ? operatorsIds.includes(userId) : true

      // if (!isMember && !isOperator) {
      //   setIsError(true)
      // }
    }
  }, [channel, isOpenChannel])

  const getOperatorsIds = () => {
    return channel?.operators?.map(item => item?.userId)
  }

  const getMembersIds = () => {
    const data = channel?.data ? JSON.parse(channel.data) : {}
    return data?.members
  }

  const getOpenChannelMembersCount = () => {
    const liked = localActivity?.reaction_counts?.like
    const data = channel?.data ? JSON.parse(channel.data) : {}
    return localActivity ? liked : data?.members?.length
  }

  useEffect(() => {
    if (messages && channel) {
      if (channelType === 'group') {
        channel.markAsRead()
      }
      dispatch(reorderChannelList())
    }
  }, [messages && messages.length])

  useEffect(() => {
    if (messages && channel && isPersonalChat) {
      const msgFirstMember = messages.filter(item => item?._sender?.userId === userId)
      const msgSecondMember = secondMember
        ? messages.filter(item => item?._sender?.userId === secondMember.userId)
        : []

      if (msgSecondMember && msgFirstMember.length && msgSecondMember.length) {
        api
          .setAvailableToTeam(secondMember.userId)
          .then(res => {})
          .catch(error => handleError(error))
      }
    }
  }, [messages && messages.length, isPersonalChat])

  useEffect(() => {
    const channelUrl = channel?.url
    const channelDraft = draft[channelUrl]
    if (channelUrl && channelDraft && message !== channelDraft) {
      setMessage(channelDraft)
    }
  }, [channel, draft])

  const getPrevSender = index => {
    if (!index) {
      return null
    }
    const prevMsg = messages && messages[index - 1]
    return prevMsg?._sender?.nickname || prevMsg.messageType
  }

  const getPrevDate = index => {
    if (!index) {
      return null
    }
    const prevDate = messages && messages[index - 1]
    return prevDate?.createdAt
  }

  const isRemovable = msg => {
    return msg?._sender?.userId && userId && msg?._sender?.userId === userId
  }

  const renderItem = ({ item, index }) => {
    const isAdmin = item.messageType === 'admin'
    const isMyMsg = user && !isAdmin ? item?._sender?.userId === userId : false
    const isSelected = choosenMsg && choosenMsg.messageId === item.messageId ? true : false

    return (
      <Message
        key={`message-${index}`}
        item={item}
        isMyMsg={isMyMsg}
        prevSender={getPrevSender(index)}
        prevDate={getPrevDate(index)}
        date={item.createdAt}
        isGroupChat={channel?.channelType === 'group' && channel?.members?.length > 2}
        onLongPress={onMessageLongPress}
        onPress={onMessagePress}
        isSelected={isSelected}
      />
    )
  }

  const onGoBack = () => {
    dispatch(openChatPage(navigation))
    onSaveDraft()
  }

  const onSaveDraft = () => {
    if (message) {
      dispatch(saveDraft(channel?.url, message))
    }
  }

  const onClearDraft = () => {
    if (draft[(channel?.url)]) {
      dispatch(saveDraft(channel?.url, ''))
    }
  }

  const renderCustomSubHeader = () => {
    return (
      <ChatMenu
        onClose={onChatMenuClose}
        onRemove={isRemovable(choosenMsg) ? onRemoveClick : null}
        onCopy={onCopy}
      />
    )
  }

  const onRemoveClick = () => {
    dispatch(
      setAppAlert({
        text: 'Are you sure?',
        isSmallBtns: true,
        okText: 'Yes',
        onConfirm: () => {
          onChatMenuRemove()
          onRemoveClose()
        },
        cancelText: 'Cancel',
        onCancel: () => onRemoveClose(),
      }),
    )
  }

  const onCopy = () => {
    Clipboard.setString(choosenMsg?.message)
    showCopyDoneAlert()
    onChatMenuClose()
  }

  const onRemoveClose = () => {
    dispatch(setAppAlert(null))
  }

  const onContentSizeChange = () => {
    scroll.current?.scrollToEnd({ animated: true })
  }

  const onSendMessage = message => {
    dispatch(sendMessage({ channel, message, secondMemberId: secondMember?.userId }))
    onClearDraft()
  }

  const onSendFile = file => {
    setIsSending(true)
    dispatch(
      sendFile({
        channel,
        file,
        secondMemberId: secondMember?.userId,
        callback: () => {
          setIsSending(false)
        },
      }),
    )
  }

  const getStatus = () => {
    if (!isPersonalChat || !secondMember?.connectionStatus) {
      return null
    }
    return secondMember?.connectionStatus === 'online' ? 'online' : 'offline'
  }

  const isAvailable = () => {
    const isGroupChannel = channel?.channelType === 'group'
    const operatorsIds = isGroupChannel ? [] : getOperatorsIds()
    return isGroupChannel ? true : operatorsIds?.includes(userId)
  }

  return (
    <ChatViewWrapper behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <PageContainer
        subTitle={channel && chatName ? chatName : null}
        chatStatus={getStatus()}
        back={true}
        navigation={navigation}
        noPadding
        hideTopHeader
        titleBack
        paddingTop
        isLoading={!messages}
        onGoBack={onGoBack}
        customSubHeader={!!choosenMsg ? renderCustomSubHeader() : null}
      >
        {isError ? (
          <ScrollPadder>
            <Texts.GreyText>
              You can not read this chat, you are not an investor in this startup
            </Texts.GreyText>
          </ScrollPadder>
        ) : (
          <>
            {isOpenChannel && getOpenChannelMembersCount() ? (
              <SupportedText>
                Supported by : <BlueText>{getOpenChannelMembersCount()}</BlueText> teens
              </SupportedText>
            ) : null}

            {/* @TODO: remove scrollPadder */}
            <ScrollPadder ref={scroll} onContentSizeChange={onContentSizeChange} noPadding>
              {messages ? (
                <FlatListStyled
                  data={messages}
                  renderItem={renderItem}
                  keyExtractor={getKey}
                  shouldComponentUpdate={shouldComponentUpdate}
                />
              ) : null}
              {isSending ? <Texts.GreyText>Sending...</Texts.GreyText> : null}
            </ScrollPadder>
            {messages && isAvailable() ? (
              <ChatInput
                message={message}
                setMessage={setMessage}
                onSendMessage={onSendMessage}
                onSendFile={onSendFile}
              />
            ) : null}
          </>
        )}
      </PageContainer>
    </ChatViewWrapper>
  )
}

const getKey = item => {
  return item.messageId
}

const shouldComponentUpdate = () => {
  return false
}

const ChatViewWrapper = styled(ChatView)`
  flex: 1;
  width: 100%;
`

const FlatListStyled = styled(FlatList)`
  width: 100%;
`

const SupportedText = styled(Texts.GreyText)`
  font-weight: 700;
`

const BlueText = styled(Texts.SubtitleText)`
  color: ${Colors.COMMON_BLUE};
`

CurrentChat.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default CurrentChat
