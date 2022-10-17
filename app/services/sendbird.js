import SendBird from 'sendbird'
import axios from 'axios'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import notification from 'services/notifications'
import { handleError } from 'services/logger'
import { onlyUnique } from 'services/utils'
import { SENDBIRD_APP_TOKEN } from '@env'
import { getUserAvatar } from 'utils/user'

const APP_ID = 'A803331D-FAE3-4D5C-BEDB-D727389FD640'
const API_BASE_URL = `https://api-${APP_ID}.sendbird.com/v3`

class Sendbird {
  sb = new SendBird({ appId: APP_ID })

  changeAppState(nextAppState) {
    if (this.sb) {
      if (nextAppState === 'active') {
        if (Platform.OS === 'ios') {
          PushNotificationIOS.setApplicationIconBadgeNumber(0)
        }
        this.sb.setForegroundState()
      } else if (nextAppState === 'background') {
        this.sb.setBackgroundState()
      }
    }
  }

  //-- Users --//
  getUserInfo() {
    const user = this.sb.currentUser
    return {
      userId: user?.userId,
      nickname: user?.nickname,
    }
  }

  isCurrentUser(userId) {
    return this.sb.currentUser?.userId === userId
  }

  isUpdatedUser(nickname) {
    return this.sb.currentUser?.nickname === nickname
  }

  updateUser(userInfo) {
    return new Promise((resolve, reject) => {
      const { userId, nickname, age, schoolCountry } = userInfo
      const nick = nickname || userId

      if (this.isUpdatedUser(nick)) {
        resolve()
      }

      this.updateProfile(nick)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  async sbConnect(userInfo) {
    return new Promise((resolve, reject) => {
      const { userId } = userInfo

      this.sb.connect(userId, (user, error) => {
        if (error) {
          reject(error)
          return
        }

        this.updateUser(userInfo)
          .then(res => resolve(res))
          .catch(error => reject(error))
      })
    })
  }

  updateProfile(nickname) {
    return new Promise((resolve, reject) => {
      if (!nickname) {
        reject('Nickname is required')
        return
      }

      this.sb.updateCurrentUserInfo(nickname, null, (user, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(user)
        }
      })
    })
  }

  checkSbConnect(userInfo) {
    const { userId } = userInfo

    return new Promise((resolve, reject) => {
      if (this.isCurrentUser(userId)) {
        this.updateUser(userInfo)
          .then(res => resolve(res))
          .catch(error => reject(error))
      } else {
        this.sbConnect(userInfo)
          .then(res => resolve(res))
          .catch(error => reject(error))
      }
    })
  }

  createNewUserIfNotExist(userId, nickname, avatar) {
    const nick = nickname || userId
    return new Promise((resolve, reject) => {
      this.sendbirdApiRequest('get', `/users/${userId}`)
        .then(res => {
          this.sendbirdApiRequest('put', `/users/${userId}`, {
            user_id: userId,
            nickname,
            profile_url: avatar,
          })
          resolve(res)
        })
        .catch(error => {
          this.sendbirdApiRequest('post', '/users', {
            user_id: userId,
            nickname: nick,
            profile_url: avatar,
          })
            .then(res => resolve(res))
            .catch(error => reject(error))
        })
    })
  }

  getUsersList() {
    return new Promise((resolve, reject) => {
      const query = this.sb.createUserListQuery()
      query.next((users, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(users)
        }
      })
    })
  }

  getUserById(userId) {
    return new Promise((resolve, reject) => {
      this.sendbirdApiRequest('get', `/users/${userId}`)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  checkUsers(group) {
    const _processArray = (array, fn) => {
      return array.reduce((p, item) => {
        return p
          .then(() => {
            return fn(item?.id, item?.nickname || item?.id, getUserAvatar(item))
          })
          .catch(error => handleError(error))
      }, Promise.resolve())
    }

    return new Promise((resolve, reject) => {
      _processArray(group, (userId, nickname, avatar) =>
        this.createNewUserIfNotExist(userId, nickname, avatar),
      )
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
  //--  --//

  //-- Channel --//
  // createInvitation(userInfo, secondMemberId, groupName, groupPicture) {
  //   return new Promise((resolve, reject) => {
  //     this.checkUsers([secondMemberId])
  //       .then(() => this.createChannel([userInfo.userId], groupName, groupPicture, true))
  //       .then(groupChannel => groupChannel.inviteWithUserIds([secondMemberId]))
  //       .then(groupChannel => resolve(groupChannel))
  //       .catch(error => reject(error))
  //   })
  // }

  getChannelList(userId) {
    return new Promise((resolve, reject) => {
      let groupChannelsData

      this.getGroupChannelList()
        .then(res => (groupChannelsData = res))
        .then(() => {
          return { list: [], openChannelListQuery: null }
        })
        // .then(() => this.getOpenChannelList(userId))
        .then(openChannelsData => {
          const list = groupChannelsData?.list.concat(openChannelsData.list)
          resolve({
            list,
            groupChannelListQuery: groupChannelsData.groupChannelListQuery,
            openChannelListQuery: openChannelsData.openChannelListQuery,
          })
        })
        .catch(error => {
          resolve({ list: [] })
        })
    })
  }

  getGroupChannelList() {
    return new Promise((resolve, reject) => {
      const channelListQuery = this.sb.GroupChannel.createMyGroupChannelListQuery()
      channelListQuery.includeEmpty = true
      channelListQuery.order = 'latest_last_message'
      channelListQuery.customTypesFilter = ['']

      if (channelListQuery.hasNext) {
        channelListQuery.next((channels, error) => {
          if (error) {
            reject(error)
          } else {
            resolve({ list: channels, groupChannelListQuery: channelListQuery })
          }
        })
      } else {
        resolve({ list: [], groupChannelListQuery: channelListQuery })
      }
    })
  }

  getGroupChannelNext(channelListQuery) {
    return new Promise((resolve, reject) => {
      if (channelListQuery) {
        channelListQuery.next((channels, error) => {
          if (error) {
            reject(error)
          } else {
            resolve({ list: channels, groupChannelListQuery: channelListQuery })
          }
        })
      }
    })
  }

  filterOpenChannel(openChannels, userId) {
    return openChannels.filter(item => {
      const data = JSON.parse(item?.data)
      const operatorsIds = item?.operators?.map(item => item?.userId)
      return data?.members.includes(userId) || operatorsIds.includes(userId)
    })
  }

  getOpenChannelList(userId) {
    return new Promise((resolve, reject) => {
      const channelListQuery = this.sb.OpenChannel.createOpenChannelListQuery()

      if (channelListQuery.hasNext) {
        channelListQuery.next((openChannels, error) => {
          if (error) {
            reject(error)
          } else {
            const res = this.filterOpenChannel(openChannels, userId)
            resolve({ list: res, openChannelListQuery: channelListQuery })
          }
        })
      } else {
        resolve({ list: [], openChannelListQuery: channelListQuery })
      }
    })
  }

  getOpenChannelListByName(name) {
    return new Promise((resolve, reject) => {
      const channelListQuery = this.sb.OpenChannel.createOpenChannelListQuery()
      channelListQuery.nameKeyword = name

      if (channelListQuery.hasNext) {
        channelListQuery.next((openChannels, error) => {
          if (error) {
            reject(error)
          } else {
            resolve(openChannels)
          }
        })
      } else {
        resolve([])
      }
    })
  }

  getOpenChannelNext(channelListQuery, userId) {
    return new Promise((resolve, reject) => {
      if (channelListQuery) {
        channelListQuery.next((openChannels, error) => {
          if (error) {
            reject(error)
          } else {
            const res = this.filterOpenChannel(openChannels, userId)
            resolve({ list: res, openChannelListQuery: channelListQuery })
          }
        })
      }
    })
  }

  getCurrentChannel(url, group, groupName, groupPicture, isFromChat, isDistinct, type, isPublic) {
    return new Promise((resolve, reject) => {
      if (isFromChat) {
        this.getChannelByUrl(url)
          .then(groupChannel => resolve(groupChannel))
          .catch(error => reject(error))
      } else {
        const usersIds = group ? group.map(item => item?.id) : []
        this.checkUsers(group)
          .then(() => this.createChannel(usersIds, groupName, groupPicture, isDistinct))
          .then(groupChannel =>
            this.updateChannel(groupChannel, usersIds, groupName, groupPicture, type, isPublic),
          )
          .then(groupChannel => resolve(groupChannel))
          .catch(error => reject(error))
      }
    })
  }

  getChannelByUrl(url) {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.getChannel(url, (groupChannel, error) => {
        if (error) {
          reject(error)
        } else {
          groupChannel.markAsRead()
          resolve(groupChannel)
        }
      })
    })
  }

  getOpenChannelByUrl(url) {
    return new Promise((resolve, reject) => {
      this.sb.OpenChannel.getChannel(url, (openChannel, error) => {
        if (error) {
          reject(error)
        } else {
          openChannel.enter((response, error) => {
            if (error) {
              reject(error)
            } else {
              resolve(openChannel)
            }
          })
          resolve(openChannel)
        }
      })
    })
  }

  createChannel(usersIds, groupName, groupPicture, isDistinct) {
    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.createChannelWithUserIds(
        usersIds,
        isDistinct,
        groupName,
        groupPicture,
        '',
        (groupChannel, error) => {
          if (error) {
            reject(error)
          } else {
            groupChannel.markAsRead()
            resolve(groupChannel)
          }
        },
      )
    })
  }

  createOpenChannel({ data, operatorUserIds, name, image }) {
    return new Promise((resolve, reject) => {
      this.sb.OpenChannel.createChannel(
        name,
        image,
        data || null,
        ['admin', ...operatorUserIds],
        'startup_invest_chat',
        (openChannel, error) => {
          if (error) {
            reject(error)
          } else {
            resolve(openChannel)
          }
        },
      )
    })
  }

  sbAdminConnect() {
    return new Promise((resolve, reject) => {
      this.sb.connect('admin', (user, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(user)
        }
      })
    })
  }

  updateOpenChanncelData({ openChannel, data, operatorsIds = null, coverUrl, name }) {
    return new Promise((resolve, reject) => {
      const userInfo = this.getUserInfo()

      const operators = operatorsIds
        ? ['admin', ...operatorsIds].filter(onlyUnique)
        : ['admin', ...openChannel.operators?.map(item => item?.userId)].filter(onlyUnique)

      this.sbAdminConnect()
        .then(() => {
          const newData = data ? JSON.stringify(data) : null

          return openChannel.updateChannel(
            name || openChannel.name,
            coverUrl || openChannel.coverUrl,
            newData || openChannel.data,
            operators,
            (response, error) => {
              if (error) {
                reject(error)
              } else {
                resolve(response)
              }
            },
          )
        })
        .then(() => this.sbConnect(userInfo))
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  updateChannel(groupChannel, usersIds, groupName, groupPicture, type, isPublic) {
    return new Promise((resolve, reject) => {
      const params = new this.sb.GroupChannelParams()
      params.isPublic = groupChannel.isPublic
      params.isEphemeral = groupChannel.isEphemeral
      params.isDistinct = groupChannel.isDistinct
      params.isSuper = groupChannel.isSuper
      params.channelUrl = groupChannel.channelUrl
      params.data = groupChannel.data

      if (type) {
        params.customType = type
      }
      if (isPublic) {
        params.isPublic = isPublic
      }

      // Changed
      params.name = groupName
      params.coverUrl = groupPicture
      params.addUserIds(usersIds)
      groupChannel.updateChannel(params, (groupChannel, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(groupChannel)
        }
      })
    })
  }

  addChannelHandler(
    id,
    onMessageReceived,
    onMessageRemoved,
    onDeliveryReceiptUpdated,
    onReadReceiptUpdated,
  ) {
    const channelHandler = new this.sb.ChannelHandler()

    channelHandler.onMessageReceived = (channel, message) => {
      onMessageReceived(channel, this.getMessageWithStatus(channel, message))
    }
    channelHandler.onMessageDeleted = (channel, messageId) => {
      onMessageRemoved(channel, messageId)
    }
    channelHandler.onDeliveryReceiptUpdated = channel => onDeliveryReceiptUpdated(channel)
    channelHandler.onReadReceiptUpdated = channel => onReadReceiptUpdated(channel)
    this.sb.addChannelHandler(id, channelHandler)
  }

  removeChannelHandler(id) {
    this.sb.removeChannelHandler(id)
  }

  joinToCardChat(url) {
    return new Promise((resolve, reject) => {
      this.getChannelByUrl(url)
        .then(groupChannel => {
          if (groupChannel.isPublic) {
            groupChannel.join((response, error) => {
              if (error) {
                reject(error)
              } else {
                resolve(response)
              }
            })
          }
          resolve()
        })
        .catch(error => reject(error))
    })
  }

  leaveCardChat(url) {
    return new Promise((resolve, reject) => {
      this.getChannelByUrl(url)
        .then(groupChannel => {
          if (groupChannel.isPublic) {
            groupChannel.leave((response, error) => {
              if (error) {
                reject(error)
              } else {
                resolve(response)
              }
            })
          }
          resolve()
        })
        .catch(error => reject(error))
    })
  }
  //--  --//

  //-- Message --//
  getChannelMessages(channel) {
    const limit = 30
    const reverse = false
    return new Promise((resolve, reject) => {
      const previousMessageListQuery = channel.createPreviousMessageListQuery()
      previousMessageListQuery.load(limit, reverse, (messages, error) => {
        if (error) {
          reject(error)
        } else {
          const messageList = messages.map(message => {
            return this.getMessageWithStatus(channel, message)
          })
          resolve(messageList)
        }
      })
    })
  }

  sendMessage(channel, textMessage) {
    return new Promise((resolve, reject) => {
      this.send(channel, textMessage)
        .then(message => resolve(message))
        .catch(error => {
          if (error?.code == 900020) {
            this.retrySendMessage(channel, textMessage)
              .then(message => resolve(message))
              .catch(error => reject(error))
          } else {
            reject(error)
          }
        })
    })
  }

  retrySendMessage(channel, textMessage) {
    return new Promise((resolve, reject) => {
      this.joinToCardChat(channel.url)
        .then(() => this.send(channel, textMessage))
        .then(message => resolve(message))
        .catch(error => reject(error))
    })
  }

  send(channel, textMessage) {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(textMessage, (message, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(message)
        }
      })
    })
  }

  removeMessage(channel, message) {
    return new Promise((resolve, reject) => {
      channel.deleteMessage(message, (response, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })
  }

  sendFile(channel, file) {
    return new Promise((resolve, reject) => {
      const params = new this.sb.FileMessageParams()
      params.file = file
      params.mimeType = file.type
      params.thumbnailSizes = [{ maxWidth: 100, maxHeight: 100 }]
      channel.sendFileMessage(params, (message, error) => {
        if (error) {
          reject(error)
        } else {
          resolve(message)
        }
      })
    })
  }

  getMessageWithStatus(channel, message) {
    const isGroupChannel = channel?.channelType === 'group'

    message.isDelivered = isGroupChannel ? channel.getUndeliveredMemberCount(message) === 0 : true
    message.isRead = isGroupChannel ? channel.getUnreadMembers(message).length === 0 : true
    message.unreadMembersCount = isGroupChannel
      ? channel?.members?.length > 2
        ? channel.getUnreadMembers(message).length
        : 0
      : 0
    return message
  }
  //--  --//

  sendbirdApiRequest(type, request, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: type,
        url: API_BASE_URL + request,
        data,
        headers: {
          'Api-Token': SENDBIRD_APP_TOKEN,
        },
      })
        .then(response => resolve(response.data))
        .catch(error => reject({ error }))
    })
  }

  enableStateChange() {
    this.sb.enableStateChange()
  }

  disableStateChange() {
    this.sb.disableStateChange()
  }

  //-- Notifications --//
  registerSendbirdNotification() {
    return new Promise((resolve, reject) => {
      notification
        .checkPermission()
        .then(() => notification.getToken())
        .then(token => this.sbRegisterPushToken(token))
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  unregisterSendbirdNotification() {
    return new Promise((resolve, reject) => {
      notification
        .getToken()
        .then(token => this.sbUnregisterPushToken(token))
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  sbRegisterPushToken(token) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        this.sb.registerAPNSPushTokenForCurrentUser(token, (response, error) => {
          if (error) {
            reject(error)
          } else {
            resolve(response)
          }
        })
      } else {
        this.sb.registerGCMPushTokenForCurrentUser(token, (response, error) => {
          if (error) {
            reject(error)
          } else {
            resolve(response)
          }
        })
      }
    })
  }

  sbUnregisterPushToken() {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        notification
          .getToken()
          .then(token => {
            this.sb.unregisterAPNSPushTokenForCurrentUser(token, (response, error) => {
              if (error) {
                reject(error)
              } else {
                resolve(response)
              }
            })
          })
          .catch(error => reject(error))
      } else {
        notification
          .getToken()
          .then(token => {
            this.sb.unregisterGCMPushTokenForCurrentUser(token, (response, error) => {
              if (error) {
                reject(error)
              } else {
                resolve(response)
              }
            })
          })
          .catch(error => reject(error))
      }
    })
  }

  removeChannel(chatUrl) {
    return new Promise((resolve, reject) => {
      this.getOpenChannelByUrl(chatUrl)
        .then(openChannel => openChannel.delete())
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
}

const sendbird = new Sendbird()
export default sendbird
