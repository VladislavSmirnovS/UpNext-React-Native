import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import app from 'store/app/app.reducer'
import user from 'store/user/user.reducer'
import team from 'store/team/team.reducer'
import chat from 'store/chat/chat.reducer'
import feed from 'store/feed/feed.reducer'
import lobby from 'store/lobby/lobby.reducer'
import network from 'store/network/network.reducer'
import startup from 'store/startup/startup.reducer'
import notification from 'store/notification/notification.reducer'
import launcher from 'store/launcher/launcher.reducer'
import admin from 'store/admin/admin.reducer'
import AppNavigator from 'navigation/AppNavigator'

import { LOADER_ROUTE } from 'services/navigation'

const initialNavState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(LOADER_ROUTE),
)

const nav = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

const allReducers = combineReducers({
  app,
  user,
  nav,
  team,
  chat,
  feed,
  lobby,
  network,
  startup,
  admin,
  notification,
  launcher,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    // remove all state exept branch obj, showNotification func
    state = {
      app: { isShowNotLoginAlert: false, showNotification: state?.app?.showNotification },
      user: { branchObj: state?.user?.branchObj ? { ...state?.user?.branchObj } : null },
    }
  }

  return allReducers(state, action)
}

// const store = createStore(rootReducer, applyMiddleware(thunk, logger))
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
