import React, { useState } from 'react'
import mixpanel from 'services/mixpanel'
import AppNavigator from 'navigation/AppNavigator'
import { setRouterAction } from 'store/app/app.actions'
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  MAIN_HOME_ROUTE,
  MAIN_MY_STARTUPS_ROUTE,
  FEED_SINGLE_VIDEO_ROUTE,
  NOTIFICATION_ROUTE,
  MY_NETWORK_ROUTE,
  NETWORK_ROUTE,
  MY_STARTUPS_ROUTE,
  CHAT_ROUTE,
  MY_PROFILE_ROUTE,
} from 'services/navigation'
import store from 'store/Store'

export default () => {
  const [isBack, setIsBack] = useState(false)

  const onNavigationStateChange = (prevState, currentState, action) => {
    if (action.routeName) {
      store.dispatch(setRouterAction(action))
    }

    if (action.routeName && TRACK_ROUTES.includes(action.routeName)) {
      const eventName = getEventName(action)
      trackRouter(eventName)
    } else if (action.type === 'Navigation/BACK') {
      setIsBack(true)
    }

    if (isBack && !action.routeName && action.key && TRACK_ROUTES.includes(action.key)) {
      trackRouter(action.key)
      setIsBack(false)
    }
  }

  return <AppNavigator store={store} onNavigationStateChange={onNavigationStateChange} />
}

const TRACK_ROUTES = [
  LOGIN_ROUTE,
  MAIN_HOME_ROUTE,
  MAIN_MY_STARTUPS_ROUTE,
  HOME_ROUTE,
  FEED_SINGLE_VIDEO_ROUTE,
  NOTIFICATION_ROUTE,
  MY_NETWORK_ROUTE,
  NETWORK_ROUTE,
  MY_STARTUPS_ROUTE,
  MY_PROFILE_ROUTE,
  CHAT_ROUTE,
]

const trackRouter = routeName => {
  mixpanel.trackEvent(routeName)
}

const getEventName = action => {
  return (
    {
      HOME_ROUTE: 'tab bar - home',
      FEED_SINGLE_VIDEO_ROUTE: 'tab bar - home',
      NOTIFICATION_ROUTE: 'tab bar -notifications',
      MY_NETWORK_ROUTE: 'tab bar - MyNetwork',
      NETWORK_ROUTE: 'tab bar - MyNetwork',
      MY_STARTUPS_ROUTE: 'tab bar - MyStartups',
      CHAT_ROUTE: 'app chat icon',
    }[action.routeName] || action.routeName
  )
}
