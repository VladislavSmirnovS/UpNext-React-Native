import React from 'react'
import { useDispatch } from 'react-redux'
import { MaterialTopTabBar } from 'react-navigation-tabs'
import { openPageByPath } from 'services/navigation'
import { toggleShowSearchHashtagModal } from 'store/app/app.actions'
import { useUserInitialized, useUserIsMentor } from 'store/user/user.uses'

export default ({ onTabPress, onTabLongPress, jumpTo, navigation, ...props }) => {
  const dispatch = useDispatch()
  const isUserInitialized = useUserInitialized()
  const userIsMentor = useUserIsMentor()

  const onPress = ({ route }) => {
    requestAnimationFrame(() => {
      overwrittenRouteClick(route)
    })
  }

  const overwrittenRouteClick = route => {
    const isMentorSearchTab = isUserInitialized && userIsMentor && route.key === 'MyStartups'
    const isStartupTab = route.key === 'MyStartups'

    if (isMentorSearchTab) {
      dispatch(toggleShowSearchHashtagModal(true))
    } else if (isStartupTab) {
      onJumpTo('Startup')
    }
  }

  const onJumpTo = routeName => {
    dispatch(openPageByPath({ navigation, routeName }))
  }

  return (
    <MaterialTopTabBar
      jumpTo={onJumpTo}
      onTabLongPress={onLongPress}
      onTabPress={onPress}
      navigation={navigation}
      {...props}
    />
  )
}

const onLongPress = navigation => {}
