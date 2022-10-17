import { addChatsRequestFromEvent, removeChatsPendingsFromEvent } from 'store/chat/chat.actions'
import { addFriend } from 'store/network/network.actions'
import { setUserCoins } from 'store/user/user.actions'
import {
  removeActivityFromFeed,
  onAddNewToQueue,
  updateFeedActivityInLikedList,
  removeActivityFromInvestments,
  addLike,
} from 'store/feed/feed.actions'
import { getNotificationData } from 'services/utils'

class Events {
  eventListener = res => dispatch => {
    const { handler } = res
    const item = this.getItem(res)

    if (handler && item) {
      switch (handler) {
        case 'onChangeMyNetwork':
          dispatch(this.onChangeMyNetwork(item))
          break

        case 'onChangeCoinsBalance':
          dispatch(this.onChangeCoinsBalance(item))
          break

        case 'onRemoveFromFeed':
          dispatch(this.onRemoveFromFeed(item))
          break

        case 'onAddToFeed':
          dispatch(this.onAddToFeed(item))
          break

        case 'onChangeFeedBalance':
          dispatch(this.onChangeFeedBalance(item))
          break
      }
    }
  }

  eventHandlerFromNotif = notification => dispatch => {
    const { data } = notification
    const item = this.getItem(data)

    if (data?.type) {
      switch (data?.type) {
        case 'friends_invite':
          dispatch(this.onChangeRequests(item))
          break

        case 'friends_reject':
        case 'friends_accept':
          dispatch(this.onChangePendings(item))
          break

        case 'coins_update':
          dispatch(this.onChangeStartupCoins(data))
      }
    }
  }

  getItem = res => {
    return res?.item ? JSON.parse(res?.item) : null
  }

  onChangeStartupCoins = data => dispatch => {
    const { message } = data
    const { param } = getNotificationData(message)

    if (param.activity_id) {
      dispatch(addLike(param.activity_id))
    }
  }

  onChangeRequests = item => dispatch => {
    if (item?.id) {
      dispatch(addChatsRequestFromEvent({ ...item, friend_status: null }))
    }
  }

  onChangePendings = item => dispatch => {
    if (item?.id) {
      dispatch(removeChatsPendingsFromEvent(item))
    }
  }

  onChangeMyNetwork = item => dispatch => {
    // add friend
  }

  onChangeCoinsBalance = item => dispatch => {
    dispatch(setUserCoins(item?.coins))
  }

  onRemoveFromFeed = item => dispatch => {
    if (item?.activity_id) {
      dispatch(removeActivityFromFeed(item?.activity_id))
      dispatch(removeActivityFromInvestments(item?.activity_id))
    }
  }

  onAddToFeed = item => dispatch => {
    if (item?.activity_id) {
      dispatch(onAddNewToQueue(item?.activity_id))
    }
  }

  onChangeFeedBalance = item => dispatch => {
    if (item?.activity_id) {
      dispatch(updateFeedActivityInLikedList(item?.activity_id))
    }
  }
}

const events = new Events()
export default events
