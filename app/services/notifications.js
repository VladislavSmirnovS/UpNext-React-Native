import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { getCurrentUser, updateDeviceAccessToken } from 'store/user/user.actions'
import { setFeedList, setFeedPage, getFeed } from 'store/feed/feed.actions'
import { getTeam } from 'store/team/team.actions'
import { getNotificationsWithFilter } from 'store/notification/notification.actions'
import { setSocialsList } from 'store/admin/admin.actions'
import { getNewNotificationCount } from 'store/app/app.actions'
import { setMembersFilters } from 'store/lobby/lobby.actions'
import {
  openEditStartupPage,
  openCurrentChatPage,
  openAdminPage,
  openNetworkWithDefTab,
  openHomePage,
  openLobbyCurrentMemberPage,
  openFeedSinglePage,
  openNotificationPage,
  openChatPage,
} from 'services/navigation'
import sendbird from 'services/sendbird'
import events from 'services/events'
import { Platform } from 'react-native'
import { getNotificationData, getShortVersionNotification } from 'services/utils'
import { getUserId, getUserAvatar } from 'utils/user'

let PAGE_ID = 0
let notifcaionID = 0

//-- Notifications types --//
// video pitch - the team pain video shown in the feed page

// 1) admin_enable - `New user signup`
// after a new user signup (first login), all admins receive a notif

// 2) share_install - `[user] just join app from your link`
// after a new user signup from share link, share user receive a notif

// 3) admin_disable_video - `Your video was removed from the feed due to unappropreate content, pls replace it or contact us for more info`
// after an admin disable pain video from admin panel, all team members of this video receive a notif

// 4) count_country_users - `Users from your country are joining UpNext, click to boost your network. Your network is your net worth ;-)`
// after a user set country, if country users = 10, 100, 1000, all country users receive a notif

// 5) friends_invite - `[user] invited you to connect`
// after a userA click connect button to userB from network, userB receive a notif

// 6) friends_accept - `[user] just confirm your connection. Say hello...`
// after a user accept connection from userA, userA receive a notif

// 7) friends_reject - `[user] rejected your connection`
// after a user ject connection from userA, userA receive a notif

// 7) team_updated - `[user] left your team`
// after a user left team, all team members receive a notif

// 8) team_updated - `[user] has joined your team`
// after a user join team, share user receive a notif

// 9) feed_end_video - `[user] just watched your video pitch till the end, seems like a good opportunity to win support. Connect now!`
// after a user watches a video pitch to the end, all team members of this video pitch receive a notif

// 10) video_comment - `[user] commented: [text]`
// after a user set comment to the video pitch, all team members of this video pitch receive a notif

// 11) coins_update - `[user] placed a coin on your video`
// after a user set coin to the video pitch, all team members of this video pitch receive a notif

// 12) video_update - `One of the startups in your investments portfolio changed it's video pitch, click to see new video and decide if you still want to invest in it`
// after user change video pitch, all invested users of this video pitch receive a notif

// 13) coins_back - `One of the startups you invested in just went back to stealth mode. The coin you invested was returned`
// after user hide video, all invested users of this video pitch receive a notif

// 14) feed_count_views - `Your pitch is getting noticed, [count] users watched it in the last 7 days. Have you shared to your profile networks?`
// if in the last 7 days 100 unique users watch a video pitch to the end, all team members of this video pitch receive a notif

// 15) video_not_uploaded_yet - `Is your pitch complete? Our short explainers videos offer a ton of info to improve`
// every friday (3 times) at 20:00 if team does not have pain video, all team members receive a notif

// 16) ask_support_video - `Congratulate [user] for uploading their new pitch. Add a supportive comment.`
// if user added video pitch, all users from his network, and inviting user receive a notif

// 17) feed_share - `[user] shared your pitch`
// if user share video pitch, all team members of this video pitch receive a notif

// 18) report_video - `[user] report the video`
// after user report video in the feed

// -- without real notificaton --//

// 18) chat_message - `[user] sent you a message`
// after user send to userB a message in chat, userB receive a notif

// 19) startup_chat - `[user] sent a message`
// after user send a message in chat, all chat users receive a notif

// 20) card_comments - `[user] post a comment`
// after user set a comment in cards chat, all team members receive a notif

const CHANNEL_ID = 'notification'

class Notification {
  register = navigation => dispatch => {
    return new Promise((resolve, reject) => {
      this.checkPermission()
        .then(() => updateDeviceAccessToken())
        .then(() => sendbird.registerSendbirdNotification())
        .then(() => {
          dispatch(this.configure(navigation))
          dispatch(this.messageListener(navigation))
          resolve()
        })
        .catch(error => reject(error))
    })
  }

  checkPermission = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        this.requestPermission()
          .then(enable => resolve(enable))
          .catch(error => reject(error))
      } else {
        resolve(true)
      }
    })
  }

  // @TODO: permission gets without a popup with permission
  requestPermission = () => {
    return new Promise((resolve, reject) => {
      messaging()
        .requestPermission()
        .then(authStatus => {
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL

          if (enabled) {
            resolve(true)
          } else {
            reject('Notification permission is disabled')
          }
        })
        .catch(error => reject(error))
    })
  }

  configure = navigation => dispatch => {
    PushNotification.configure({
      onNotification: notification => {
        if (!notification?.data) {
          return
        }
        notification.userInteraction = true
        notification.finish(PushNotificationIOS.FetchResult.NoData)

        const isAndroidClick = notification?.alertAction === 'view'
        const isIosClick =
          Platform.OS === 'ios' &&
          (!!notification?.data?.aps?.alert || !!notification?.alert || !!notification?.action)

        if (isAndroidClick || isIosClick) {
          // dispatch(getNotificationsWithFilter())
          // dispatch(openNotificationPage(navigation, null, `notificaion-${notification?.id}`))

          dispatch(this.onClickNotifications(notification, navigation))
        }
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    })
  }

  createChannel = () => {
    PushNotification.createChannel({
      channelId: CHANNEL_ID, // (required)
      channelName: 'Channel for notifications', // (required)
    })
  }

  onClickNotifications = (notification, navigation, isFromNotificationsPage) => dispatch => {
    const func = dispatch(
      this.getNotificationClickFunction(notification, navigation, isFromNotificationsPage),
    )
    func()
  }

  getNotificationEventFunction = (notification, navigation) => dispatch => {
    const { data } = notification
    if (data?.sendbird) {
      return () => {}
    }

    const type = data?.type || data?.item?.type
    switch (type) {
      case 'coins_back':
        return () => {
          dispatch(getCurrentUser({ navigation }))
        }

      default:
        return () => {}
    }
  }

  getNotificationClickFunction = (
    notification,
    navigation,
    isFromNotificationsPage,
  ) => dispatch => {
    if (!isFromNotificationsPage) {
      dispatch(getNotificationsWithFilter())
      dispatch(getNewNotificationCount())
    }

    const { data } = notification

    if (data?.sendbird) {
      const isString = typeof data?.sendbird === 'string'
      const obj = isString ? JSON.parse(data?.sendbird) : data?.sendbird

      if (obj?.channel?.channel_type === 'open') {
        return () => dispatch(this.onClickNotificationFromChat(notification, navigation))
      } else if (obj?.channel?.custom_type) {
        return () => dispatch(this.onClickNotificationFromCardComment(notification, navigation))
      } else {
        return () => dispatch(this.onClickNotificationFromChat(notification, navigation))
      }
    }

    const type = data?.type || data?.item?.type
    switch (type) {
      case 'admin_enable':
        return () => dispatch(this.onClickNotificationAdminEnable(notification, navigation))

      case 'report_video':
        return () => dispatch(this.onClickNotificationReportVideo(notification, navigation))

      case 'share_install':
        return () => dispatch(this.onClickNotificationShareInstall(notification, navigation))

      case 'coins_update':
        return () => dispatch(this.onClickNotificationCoinsUpdate(notification, navigation))

      case 'video_update':
        return () => dispatch(this.onClickNotificationVideoUpdate(notification, navigation))

      case 'coins_back':
        return () => dispatch(this.onClickNotificationCoinsBack(notification, navigation))

      case 'team_updated':
        return () => dispatch(this.onClickNotificationTeamUpdated(notification, navigation))

      case 'friends_invite':
        return () => dispatch(this.onClickNotificatioFriendsInvite(notification, navigation))

      case 'friends_accept':
        return () => dispatch(this.onClickNotificatioFriendsAccept(notification, navigation))

      case 'friends_reject':
        return () => dispatch(this.onClickNotificatioFriendsReject(notification, navigation))

      case 'video_comment':
        return () => dispatch(this.onClickNotificatioVideoComment(notification, navigation))

      case 'admin_disable_video':
      case 'video_not_uploaded_yet':
        return () => dispatch(this.onClickNotificatioTeamPainVideo(notification, navigation))

      case 'feed_end_video':
        return () => dispatch(this.onClickNotificatioMember(notification, navigation))

      case 'count_country_users':
        return () => dispatch(this.onClickNotificatioCountCountryUsers(notification, navigation))

      case 'feed_count_views':
      case 'ask_support_video':
      case 'feed_share':
        return () => dispatch(this.onClickNotificatioFeedVideo(notification, navigation))

      default:
        return () => dispatch(this.openNotificationsPage(navigation))
    }
  }

  openMemberPage = (notification, navigation) => dispatch => {
    const message = notification?.data?.message
    const { param } = getNotificationData(message)

    dispatch(openLobbyCurrentMemberPage(navigation, param))
  }

  openFeedPageWithCurrentVideo = (notification, navigation) => (dispatch, getState) => {
    const message = notification?.data?.message

    const { param } = getNotificationData(message)
    dispatch(setFeedList(null, 0))
    dispatch(setFeedPage(0))

    const { feedPagination } = getState().feed
    dispatch(getFeed(0, feedPagination.size, param.activity_id))

    setTimeout(() => {
      dispatch(openHomePage(navigation, param))
    }, 300)
  }

  openStartupPage = (notification, navigation, params) => (dispatch, getState) => {
    const { team } = getState().team

    const message = notification?.data?.message
    const { param } = getNotificationData(message)

    if (param && param?.team_id !== team?.id) {
      dispatch(getTeam(param?.team_id))
    }

    dispatch(openEditStartupPage(navigation, params))
  }

  onClickNotificationFromChat = (notification, navigation) => dispatch => {
    const { id, data } = notification
    const isString = typeof data?.sendbird === 'string'
    const res = isString ? JSON.parse(data?.sendbird) : data?.sendbird

    if (res?.channel?.channel_url) {
      const params = {
        url: res?.channel?.channel_url,
        isFromChat: true,
        channelType: res?.channel?.channel_type,
      }
      dispatch(openCurrentChatPage(navigation, params, id))
    }
  }

  onClickNotificationFromCardComment = (notification, navigation) => (dispatch, getState) => {
    const { data } = notification
    const isString = typeof data?.sendbird === 'string'
    const res = isString ? JSON.parse(data?.sendbird) : data?.sendbird

    if (res?.channel?.custom_type) {
      dispatch(openMyStartupPage(navigation))
    }
  }

  onClickNotificationAdminEnable = (notification, navigation) => dispatch => {
    if (notification?.data?.is_new) {
      dispatch(setSocialsList(null, 0))
    }

    const params = { defaultActiveTab: 1 } // socials
    dispatch(openAdminPage(navigation, params))
  }

  onClickNotificationReportVideo = (notification, navigation) => dispatch => {
    if (notification?.data?.is_new) {
      dispatch(setReportsList(null, 0))
    }

    const params = { defaultActiveTab: 3 } // reports
    dispatch(openAdminPage(navigation, params))
  }

  onClickNotificatioFriendsInvite = (notification, navigation) => dispatch => {
    dispatch(openChatPage(navigation))
  }

  onClickNotificatioFriendsAccept = (notification, navigation) => dispatch => {
    dispatch(openChatPage(navigation))
  }

  onClickNotificatioFriendsReject = (notification, navigation) => dispatch => {
    const { data } = notification
    const param = { user_id: getUserId(data?.user) }
    dispatch(openLobbyCurrentMemberPage(navigation, param))
  }

  onClickNotificatioVideoComment = (notification, navigation) => dispatch => {
    const message = notification?.data?.message
    const { param } = getNotificationData(message)

    PAGE_ID++

    dispatch(openFeedSinglePage(navigation, param, PAGE_ID))
  }

  onClickNotificatioTeamPainVideo = (notification, navigation) => dispatch => {
    dispatch(this.openStartupPage(notification, navigation, { currentStep: 2 })) // Pain video
  }

  onClickNotificatioFeedVideo = (notification, navigation) => dispatch => {
    dispatch(this.openFeedPageWithCurrentVideo(notification, navigation))
  }

  onClickNotificationTeamUpdated = (notification, navigation) => dispatch => {
    dispatch(this.openStartupPage(notification, navigation, { currentStep: 0 })) // Team
  }

  onClickNotificatioMember = (notification, navigation) => dispatch => {
    dispatch(this.openMemberPage(notification, navigation))
  }

  onClickNotificatioCountCountryUsers = (notification, navigation) => dispatch => {
    const message = notification?.data?.message
    const { param } = getNotificationData(message)

    const params = { defaultActiveTab: 0 } // Founders

    PAGE_ID++

    dispatch(setMembersFilters({ school_country: [param?.school_country] }))
    dispatch(openNetworkWithDefTab(navigation, params, `${notification?.id}-${PAGE_ID}`))
  }

  onClickNotificationShareInstall = (notification, navigation) => dispatch => {
    dispatch(getCurrentUser({ navigation })) // for update user coins
    dispatch(this.openMemberPage(notification, navigation))
  }

  onClickNotificationCoinsUpdate = (notification, navigation) => dispatch => {
    dispatch(this.openFeedPageWithCurrentVideo(notification, navigation))

    dispatch(getCurrentUser({ navigation }))
  }

  onClickNotificationVideoUpdate = (notification, navigation) => dispatch => {
    dispatch(this.openFeedPageWithCurrentVideo(notification, navigation))
  }

  onClickNotificationCoinsBack = (notification, navigation) => dispatch => {
    dispatch(getCurrentUser({ navigation }))
    dispatch(this.openNotificationsPage(navigation))
  }

  openNotificationsPage = navigation => dispatch => {
    dispatch(openNotificationPage(navigation))
  }

  messageListener = navigation => dispatch => {
    messaging().onMessage(async notification => {
      if (this.isShownNotif(notification)) {
        const isChatNotification = notification?.data?.sendbird
        if (!isChatNotification) {
          dispatch(this.showLocalNotifications(notification, navigation))
        }
      } else {
        dispatch(events.eventListener(notification?.data || {}))
      }
    })

    messaging().onTokenRefresh(async token => updateDeviceAccessToken())
  }

  isShownNotif = notification => {
    const handler = notification?.data?.handler
    return handler === 'message' || !handler
  }

  showLocalNotifications = (notification, navigation) => (dispatch, getState) => {
    const { showNotification } = getState().app
    const { title, message, user } = notification?.data

    const userObj = user ? JSON.parse(user) : null

    const onShow = onPress => {
      showNotification &&
        showNotification({
          title,
          message,
          icon: userObj?.id
            ? {
                uri: getUserAvatar(userObj),
                nickname: userObj?.name,
              }
            : null,
          isFull: true,
          onPress,
        })
    }

    dispatch(events.eventHandlerFromNotif(notification))

    const event = dispatch(this.getNotificationEventFunction(notification, navigation))
    event()

    const func = dispatch(this.getNotificationClickFunction(notification, navigation))
    onShow(func)
  }

  handleBackgroundNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      this.createChannel()
      notifcaionID++
      const { message, sendbird, channel } = remoteMsg?.data

      const { text } = getNotificationData(message)
      const resMessage = sendbird ? getShortVersionNotification(text) : text
      const title = channel?.channelType === 'group' && channel?.customType ? 'New comment' : null

      if (this.isShownNotif(remoteMsg)) {
        this.showNotification(notifcaionID, title, resMessage, remoteMsg?.data, CHANNEL_ID)
      }
    })
  }

  showNotification = (id, title, message, data = {}, channelId) => {
    const options = {
      soundName: 'default',
      playSound: true,
    }
    PushNotification.localNotification({
      // Android only
      ...this.buildAndroidNotification(id, title, message, data, options),
      // Ios and android
      ...this.buildIosNotification(id, title, message, data, options),
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false,
      channelId,
    })
  }

  buildAndroidNotification(id, title, message, data = {}, options = {}) {
    return {
      id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data,
    }
  }

  buildIosNotification(id, title, message, data = {}, options = {}) {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id,
        item: data,
      },
    }
  }

  cancelAllNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications()
    } else {
      PushNotification.cancelAllLocalNotifications()
    }
  }

  getToken = async () => {
    try {
      const token = await messaging().getToken()
      return token
    } catch (error) {
      throw error
    }
  }

  getFcmToken = () => {
    return new Promise((resolve, reject) => {
      this.getToken()
        .then(token => resolve(token))
        .catch(error => reject(error))
    })
  }

  deleteToken = () => {
    return new Promise((resolve, reject) => {
      messaging()
        .deleteToken(undefined, '*')
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  unRegister = () => {
    return new Promise((resolve, reject) => {
      sendbird
        .unregisterSendbirdNotification()
        .then(() => {
          this.deleteToken()
          PushNotification.unregister()
          resolve()
        })
        .catch(error => reject(error))
    })
  }
}

const notification = new Notification()
export default notification
