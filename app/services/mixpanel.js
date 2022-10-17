import { Mixpanel } from 'mixpanel-react-native'
import Config from 'root/config'
import { MIXPANEL_APP_TOKEN } from '@env'
import { getUserId } from 'utils/user'

class MyMixpanel {
  mixpanel

  init = async () => {
    if (!Config.IS_DEBUG) {
      this.mixpanel = await Mixpanel.init(MIXPANEL_APP_TOKEN)
    }
  }

  initUser(user) {
    if (!Config.IS_DEBUG && this.mixpanel) {
      const userId = getUserId(user)

      this.mixpanel.identify(userId)
      this.mixpanel.getPeople().set({
        USER_ID: userId,
        $first_name: user.first_name,
        school_country: user.school_country,
        age: user.age,
      })
    }
  }

  trackEvent(event) {
    if (!Config.IS_DEBUG && this.mixpanel) {
      event && this.mixpanel.track(event)
    }
  }
}

const mixpanel = new MyMixpanel()
export default mixpanel
