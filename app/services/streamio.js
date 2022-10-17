import { connect } from 'getstream'
import api from 'services/api'
import { STRIMEO_APP_TOKEN } from '@env'
import { getUserFullName, getUserAvatar } from 'utils/user'

export const API_ID = '97538'

class Streamio {
  client = null
  userToken = null

  init = user => {
    const userToken = user.stream_io_token
    this.userToken = userToken

    this.client = connect(
      STRIMEO_APP_TOKEN,
      userToken,
      API_ID,
    )
  }

  updateInfo = user => {
    if (this.client) {
      this.updateUser(user)
    }
  }

  updateUser = user => {
    this.client.currentUser.update({
      name: getUserFullName(user),
      country: user?.school_country,
      profileImage: getUserAvatar(user),
    })
  }

  getFeed = ({
    feedType = 'common',
    feedId = 'videos',
    page = 0,
    size = 10,
    activityId,
    ranking,
  }) => {
    return new Promise((resolve, reject) => {
      if (this.client) {
        // const feed = this.client.feed('common', 'topic-test')
        const feed = this.client.feed(feedType, feedId)
        const queryParams = {
          limit: size,
          withReactionCounts: true,
          withOwnReactions: true,
        }

        if (ranking) {
          queryParams.ranking = ranking
        }

        if (activityId && !page) {
          queryParams.id_lte = activityId
        } else if (activityId && page) {
          queryParams.id_lt = activityId
        } else {
          queryParams.offset = page * size
        }

        feed
          .get(queryParams)
          .then(res => resolve(res))
          .catch(error => reject(error))
      } else {
        reject('Can not get user')
      }
    })
  }

  addActivity = ({ feedId, text, isVideoAttached, fileUrl, team, vimeoData }) => {
    return new Promise((resolve, reject) => {
      if (this.client) {
        const now = new Date()
        const activity = {
          actor: this.client.currentUser,
          verb: 'tweet',
          text: text || ' ',
          object: ' ',
          foreign_id: team?.id,
          time: now.toISOString(),
          is_progress: true,

          teamId: team?.id,
          teamImage: team?.avatar,
          teamName: team?.name,
          teamSlogan: team?.slogan,

          vimeoData,
        }

        if (fileUrl && isVideoAttached) {
          activity.video_url = fileUrl
        } else if (fileUrl && !isVideoAttached) {
          activity.image = fileUrl
        }

        if (team?.hashtags?.length) {
          activity.hashtags = team?.hashtags
        }

        const userFeed = this.client.feed('common', feedId, this.userToken)
        userFeed
          .addActivity(activity)
          .then(res => resolve(res))
          .catch(error => reject(error))
      } else {
        reject('Can not get user')
      }
    })
  }

  quietEditActivity = ({
    activityId,
    vimeoData,
    viewsCount,
    viewsProgress,
    likesCount,
    favoritesCount,
  }) => {
    return new Promise((resolve, reject) => {
      const set = {}

      if (vimeoData) {
        set.vimeoData = vimeoData
      }

      if (viewsCount) {
        set.views_count = viewsCount
      }
      if (viewsProgress) {
        set.views_progress = viewsProgress
      }
      if (likesCount) {
        set.likes_count = likesCount
      }
      if (favoritesCount) {
        set.favorites_count = favoritesCount
      }

      api
        .updateFeedPost(activityId, set)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  editActivity = ({ text, isVideoAttached, fileUrl, activityId, team, vimeoData }) => {
    return new Promise((resolve, reject) => {
      const set = {
        teamId: team?.id,
        teamImage: team?.avatar,
        teamName: team?.name,
        teamSlogan: team?.slogan,
      }

      if (text) {
        set.text = text
      }

      if (isVideoAttached) {
        set.video_url = fileUrl
      } else if (fileUrl && !isVideoAttached) {
        set.image = fileUrl
      }

      if (isVideoAttached) {
        set.is_progress = true
        set.usersDisable = []
        set.vimeoData = {}

        const now = new Date()
        set.last_edit_video_date = now.toISOString()
      }

      if (vimeoData) {
        set.vimeoData = vimeoData
      }

      if (team?.hashtags?.length) {
        set.hashtags = team?.hashtags
      }

      api
        .updateFeedPost(activityId, set)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  editActivityFields = ({
    activityId,
    teamName,
    teamImage,
    teamSlogan,
    chatUrl,
    usersDisable,
    favorites,
    hashtags,
  }) => {
    return new Promise((resolve, reject) => {
      const set = {}

      if (teamName) {
        set.teamName = teamName
      }
      if (teamImage) {
        set.teamImage = teamImage
      }
      if (teamSlogan) {
        set.teamSlogan = teamSlogan
      }
      if (chatUrl) {
        set.chatUrl = chatUrl
      }
      if (usersDisable) {
        set.usersDisable = usersDisable
      }
      if (favorites) {
        set.favorites = favorites
      }

      if (hashtags) {
        set.hashtags = hashtags
      }

      api
        .updateFeedPost(activityId, set)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  addHashtags = ({ activity, teamId, hashtags }) => {
    return new Promise((resolve, reject) => {
      const foreignId = activity?.foreign_id
      if (foreignId) {
        const tags = hashtags?.map(item => `common:${item}`)
        api
          .changeHashtags(teamId, foreignId, activity?.time, tags)
          .then(res => resolve(res))
          .catch(error => reject(error))
      }
    })
  }

  hideHashtags = ({ activity, teamId, hashtags }) => {
    return new Promise((resolve, reject) => {
      const foreignId = activity?.foreign_id
      if (foreignId) {
        const tags = hashtags?.map(item => `common:${item}`)
        api
          .changeHashtags(teamId, foreignId, activity?.time, [], tags)
          .then(res => resolve(res))
          .catch(error => reject(error))
      }
    })
  }

  likeActivity = activity => {
    return new Promise((resolve, reject) => {
      api
        .likeFeedPost(activity?.id, this.client.currentUser?.id, activity.teamId, activity.time)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  unlikeActivity = (reactionId, activity) => {
    return new Promise((resolve, reject) => {
      api
        .unlikeFeedPost(activity?.id, reactionId, activity.teamId, activity.time)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  unlikeActivityForUser = (reactionId, userId) => {
    return new Promise((resolve, reject) => {
      api
        .unlikeActivityForUser(reactionId, userId)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }

  removeActivity = async (teamId, activityId) => {
    return await api.removeActivity(teamId, activityId)
  }

  follow = teamId => {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.client
          .feed('timeline')
          .follow('team', teamId)
          .then(res => resolve(res))
          .catch(error => reject(error))
      } else {
        reject('Can not get user')
      }
    })
  }

  unfollow = teamId => {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.client
          .feed('timeline')
          .unfollow('team', teamId)
          .then(res => resolve(res))
          .catch(error => reject(error))
      } else {
        reject('Can not get user')
      }
    })
  }
}

const streamio = new Streamio()
export default streamio
