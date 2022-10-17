import branch, { BranchEvent } from 'react-native-branch'
import { setBranchObject, getCurrentUser } from 'store/user/user.actions'
import { getUserId } from 'utils/user'
import { handleError } from 'services/logger'
import Config from 'root/config'

class Branchio {
  async createBranchObject({ uniqueId, title, contentDescription }) {
    return await branch.createBranchUniversalObject(uniqueId, {
      locallyIndex: true,
      title,
      contentDescription,
    })
  }

  trackLoginEvent() {
    if (!Config.IS_DEBUG) {
      const event = new BranchEvent(BranchEvent.Login)
      event.logEvent()
    }
  }

  trackViewIteamEvent() {
    if (!Config.IS_DEBUG) {
      const event = new BranchEvent(BranchEvent.ViewItem)
      event.logEvent()
    }
  }

  async showShareSheet({
    uniqueId = 1,
    controlParams = {},
    title = null,
    contentDescription = null,
    shareOptions = {},
    linkProperties = {},
  }) {
    const branchUniversalObject = await this.createBranchObject({
      uniqueId,
      title,
      contentDescription,
    })

    const { channel, completed, error } = await branchUniversalObject.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    )

    if (error) {
      handleError(error)
    }
  }

  async getUrl({
    uniqueId = 1,
    controlParams = {},
    title = null,
    contentDescription = null,
    linkProperties = {},
  }) {
    try {
      const branchUniversalObject = await this.createBranchObject({
        uniqueId,
        title,
        contentDescription,
      })

      let { url } = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
      return url
    } catch (error) {
      handleError(error)
    }
  }

  async invite({ uniqueId, inviteUserId }) {
    const controlParams = {
      $custom_meta_tags: JSON.stringify({
        invite_user_id: inviteUserId,
      }),
    }
    const linkProperties = {
      tags: ['INVITE'],
      campaign: 'Invite from app',
    }
    return await this.getUrl({ uniqueId, controlParams, linkProperties, title: 'Check it out...' })
  }

  async shareVideo({ uniqueId, inviteUserId, acitivityId, videoUrl, videoVimeoUrl }) {
    const controlParams = {
      $deeplink_path: 'Home',
      $custom_meta_tags: JSON.stringify({
        invite_user_id: inviteUserId,
        activity_id: acitivityId,
        video_url: videoUrl,
      }),
      $og_title: 'UpNext',
      $og_description: 'Join me on UpNext!',
      $og_video: videoVimeoUrl,

      $android_deepview: 'upnext_deepview_xdpd',
      $ios_deepview: 'upnext_deepview_xdpd',
    }
    const linkProperties = {
      tags: ['FEED_VIDEO'],
      campaign: 'Share feed video from app',
    }
    return await this.getUrl({ uniqueId, controlParams, linkProperties })
  }

  async inviteToTeam({ uniqueId, inviteUserId, teamId, message }) {
    const controlParams = {
      $deeplink_path: 'Startup',
      $custom_meta_tags: JSON.stringify({
        invite_user_id: inviteUserId,
        type: 'team_invite',
        message,
        team_id: teamId,
      }),
    }
    return await this.getUrl({
      uniqueId,
      controlParams,
      title: 'Join my startup team',
      contentDescription: 'UpNext GenZ',
    })
  }

  async inviteToNetwork({ uniqueId, inviteUserId }) {
    const controlParams = {
      $deeplink_path: 'Network',
      $custom_meta_tags: JSON.stringify({
        invite_user_id: inviteUserId,
        type: 'network_invite',
      }),
    }
    return await this.getUrl({
      uniqueId,
      controlParams,
      title: 'Join my network of teens investors & teen startup founders',
      contentDescription: 'UpNext GenZ',
    })
  }

  subscribe(navigation) {
    return async dispatch => {
      try {
        branch.subscribe(async ({ error, params }) => {
          if (error) {
            handleError(error)
          } else {
            dispatch(this.useDeepLink(navigation))
          }
        })
      } catch (error) {
        handleError(error)
      }
    }
  }

  useDeepLink(navigation) {
    return (dispatch, getState) => {
      this.getRedirectionParams()
        .then(({ redirectPath, redirectParams }) => {
          if (redirectPath || (redirectParams && Object.keys(redirectParams).length)) {
            dispatch(setBranchObject({ redirectPath, redirectParams }))

            const { user } = getState().user
            const userId = getUserId(user)
            if (userId) {
              dispatch(getCurrentUser({ isFromLogin: true, navigation }))
            }
          }
          if (redirectPath) {
            this.trackViewIteamEvent()
          }
        })
        .catch(error => handleError(error))
    }
  }

  getParams(params) {
    const redirectPath = params.$deeplink_path
    const redirectParams = params.$custom_meta_tags ? JSON.parse(params.$custom_meta_tags) : {}
    return { redirectPath, redirectParams }
  }

  async getRedirectionParams() {
    const last = await branch.getLatestReferringParams()
    const lastParams = this.getParams(last)
    return lastParams
  }
}

const branchio = new Branchio()
export default branchio
