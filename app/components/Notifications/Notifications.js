import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FlatList from 'components/Control/FlatList'
import Loader from 'components/Page/Loader'
import UpnextNotification from 'components/Notifications/UpnextNotification'
import CommentNotification from 'components/Notifications/CommentNotification'
import CoinsNotification from 'components/Notifications/CoinsNotification'
import RequestNotification from 'components/Notifications/RequestNotification'
import EmptyComponent from 'components/Notifications/EmptyComponent'
import { getNotifications, setNotificationsPage } from 'store/notification/notification.actions'
import {
  useFilter,
  useNotifications,
  useNotificationsPagination,
} from 'store/notification/notification.uses'
import Texts from 'appearance/texts'
import { getNotificationData, isThisWeek } from 'services/utils'
import { getUserId } from 'utils/user'
import AppHeader from 'root/app/navigation/AppHeader'
import Filter from 'components/Notifications/Filter'
import { Animated } from 'react-native'

export default ({ navigation, isLoading, setIsLoading }) => {
  const dispatch = useDispatch()

  const filter = useFilter()
  const notificatons = useNotifications()
  const notificationsPagination = useNotificationsPagination()
  const [isEnd, setIsEnd] = useState(false)

  const [notificationsIsLoading, setNotificationsIsLoading] = useState(false)

  const [resNotifications, setResNotifications] = useState()
  const [groupNotifications, setGroupNotifications] = useState()

  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 100)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  })

  useEffect(() => {
    if (notificatons?.length) {
      setGroupNotifications(getGroupedNotificatons(notificatons))
    } else {
      setGroupNotifications()
    }
  }, [notificatons])

  useEffect(() => {
    if (groupNotifications) {
      setResNotifications(
        notificatons
          .map(item => {
            const key = getItemKey(item)
            const groupItems = key ? groupNotifications[key] : []
            const isGroup = groupItems?.length && groupItems[0]?.id !== item?.id
            const newCount = groupItems?.length
              ? groupItems.map(i => i?.is_new).filter(i => i)?.length
              : 0
            return { ...item, currentTimeDevider: getTimeDevider(item), isGroup, newCount }
          })
          .filter(item => !item?.isGroup),
      )
      return () => setResNotifications([])
    }
  }, [groupNotifications])

  useEffect(() => {
    if (resNotifications?.length < 8 && !isEnd) {
      onEndScroll()
    }
  }, [resNotifications])

  const getGroupedNotificatons = arr => {
    return arr?.reduce((acc, item) => {
      const key = getItemKey(item)

      if (key) {
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item)
      }

      return acc
    }, {})
  }

  const getItemKey = item => {
    const isChatMsg = item?.type === 'chat_message'
    const isCardComment = item?.type === 'card_comments'
    // const isNewUser = item?.type === 'admin_enable'
    let key = null

    const currentTimeDevider = getTimeDevider(item)

    if (isChatMsg) {
      const userId = getUserId(item?.user)
      key = `${currentTimeDevider}-${userId}`
    }

    if (isCardComment) {
      const itemParam = getNotificationData(item.message)?.param
      const customType = item?.sendbird?.channel?.custom_type
      key = `${currentTimeDevider}-${itemParam?.team_id}-${customType}`
    }

    // if (isNewUser) {
    //   key = `${currentTimeDevider}`
    // }

    return key
  }

  useEffect(() => {
    setIsLoading(true)
    setIsEnd(false)
    getNewNotifications(0)
    dispatch(setNotificationsPage(0))
    setResNotifications()
    setGroupNotifications()
  }, [filter])

  const getNewNotifications = page => {
    setNotificationsIsLoading(true)
    dispatch(
      getNotifications(page, notificationsPagination.size, filter, resLength => {
        checkEnd(resLength)
        setNotificationsIsLoading(false)
        setIsLoading(false)
      }),
    )
  }

  const onRefresh = () => {
    onChangePage(0)
    setIsEnd(false)
  }

  const checkEnd = resLength => {
    if (!resLength) {
      setIsEnd(true)
    }
  }

  const onEndScroll = e => {
    if (!isEnd && !notificationsIsLoading) {
      onChangePage(notificationsPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewNotifications(page)
    dispatch(setNotificationsPage(page))
  }

  const getFooterComp = () => {
    return !isEnd ? <Loader /> : null
  }

  const getPrevItem = index => {
    if (!index || !resNotifications?.length) {
      return null
    }
    return resNotifications[index - 1]
  }

  const getNextItem = index => {
    if (!resNotifications?.length || index > resNotifications?.length - 2) {
      return null
    }
    return resNotifications[index + 1]
  }

  const renderNewDevider = (item, index) => {
    const nextItem = getNextItem(index)

    return item.is_new && (!nextItem || !nextItem?.is_new) ? <Separator /> : null
  }
  const onScroll = e => {
    scrollY.setValue(e?.nativeEvent?.contentOffset.y)
  }

  const getItem = (item, newCount) => {
    switch (item.filter_key) {
      case 'upnext':
        return <UpnextNotification item={item} navigation={navigation} newCount={newCount} />

      case 'comments':
        return <CommentNotification item={item} navigation={navigation} newCount={newCount} />

      case 'coins':
        return <CoinsNotification item={item} navigation={navigation} newCount={newCount} />

      case 'requests':
        return <RequestNotification item={item} navigation={navigation} newCount={newCount} />

      default:
        return null
    }
  }

  const renderTimeDevider = (item, index) => {
    const prevItem = getPrevItem(index)
    return item?.currentTimeDevider !== prevItem?.currentTimeDevider ? (
      <Texts.GreyText>{item?.currentTimeDevider}</Texts.GreyText>
    ) : null
  }

  const renderItem = ({ item, index }) => {
    return (
      <>
        {renderTimeDevider(item, index)}
        {getItem(item, item?.newCount)}
        {renderNewDevider(item, index)}
      </>
    )
  }

  return isLoading && !groupNotifications ? null : (
    <>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 200,
          position: 'absolute',
        }}
      >
        <ContainerForHeader>
          <AppHeader />
          <Filter />
        </ContainerForHeader>
      </Animated.View>

      <FlatList
        data={resNotifications}
        onRefresh={onRefresh}
        refreshing={false}
        onEndReached={onEndScroll}
        onEndReachedThreshold={0.2}
        keyExtractor={getKey}
        onScroll={onScroll}
        paddingTop="110px"
        ListEmptyComponent={EmptyComponent}
        renderItem={renderItem}
        ListFooterComponent={getFooterComp()}
        shouldComponentUpdate={shouldComponentUpdate}
      />
    </>
  )
}

const getTimeDevider = item => {
  const todayDate = getTodayDate()
  const yesterday = getYesterdayDate()
  const itemCreated = new Date(item.created)
  const itemDate = itemCreated.getDate()

  if (todayDate === itemDate) {
    return 'Today'
  }

  if (itemDate === yesterday) {
    return 'Yesterday'
  }

  if (isThisWeek(itemCreated)) {
    return 'This week'
  }

  if (!isThisWeek(itemCreated)) {
    return 'Later'
  }

  return null
}

const getTodayDate = () => {
  return new Date().getDate()
}

const getYesterdayDate = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.getDate()
}

const getKey = item => {
  return item?.id?.toString()
}

const shouldComponentUpdate = () => {
  return false
}
const ContainerForHeader = styled.View`
  padding: 0 20px;
  padding-top: 30px;
  background-color: #fff;
  min-width: 100%;
`

const Separator = styled.View`
  border-bottom-color: #f0f0f0;
  border-bottom-width: 1px;
  height: 1px;
  margin-bottom: 10px;
`
