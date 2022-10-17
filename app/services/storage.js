import AsyncStorage from '@react-native-community/async-storage'

const storageRoot = '@UpnextStore:'

const AUTH_TOKEN = 'AUTH_TOKEN'
const LOGIN_TYPE = 'LOGIN_TYPE'
const LOGIN_CODE = 'LOGIN_CODE'
const GOOGLE_TOKEN = 'GOOGLE_TOKEN'
const SNAPCHAT_TOKEN = 'SNAPCHAT_TOKEN'
const APPLE_TOKEN = 'APPLE_TOKEN'
const NEW_TUTORIALS = 'NEW_TUTORIALS'
const PROGRESS_UPLOAD_FULL_VIDEO = 'PROGRESS_UPLOAD_FULL_VIDEO'
const PROGRESS_UPLOAD_PART_VIDEO = 'PROGRESS_UPLOAD_PART_VIDEO'

export default {
  setAuthToken: value => setStoreValue(AUTH_TOKEN, value),
  getAuthToken: () => getStoreValue(AUTH_TOKEN),

  setLoginType: value => setStoreValue(LOGIN_TYPE, value),
  getLoginType: () => getStoreValue(LOGIN_TYPE),

  setLoginCode: value => setStoreValue(LOGIN_CODE, value),
  getLoginCode: () => getStoreValue(LOGIN_CODE),

  setGoogleToken: value => setStoreValue(GOOGLE_TOKEN, value),
  getGoogleToken: () => getStoreValue(GOOGLE_TOKEN),

  setSnapchatToken: value => setStoreValue(SNAPCHAT_TOKEN, value),
  getSnapchatToken: () => getStoreValue(SNAPCHAT_TOKEN),

  setAppleToken: value => setStoreValue(APPLE_TOKEN, value),
  getAppleToken: () => getStoreValue(APPLE_TOKEN),

  setTutorials: value => setStoreValue(NEW_TUTORIALS, value),
  getTutorials: () => getStoreValue(NEW_TUTORIALS),

  setProgressUploadFullVideo: value => setStoreJsonValue(PROGRESS_UPLOAD_FULL_VIDEO, value),
  getProgressUploadFullVideo: () => getStoreJsonValue(PROGRESS_UPLOAD_FULL_VIDEO),

  setProgressUploadPartVideo: value => setStoreJsonValue(PROGRESS_UPLOAD_PART_VIDEO, value),
  getProgressUploadPartVideo: () => getStoreJsonValue(PROGRESS_UPLOAD_PART_VIDEO),
}

const setStoreValue = (key, value) => AsyncStorage.setItem(storageRoot + key, value)

const getStoreValue = key => AsyncStorage.getItem(storageRoot + key)

const setStoreJsonValue = async (key, value) => {
  const stringValue = JSON.stringify(value)
  return await setStoreValue(key, stringValue)
}

const getStoreJsonValue = async key => {
  const stringValue = await getStoreValue(key)
  return stringValue ? JSON.parse(stringValue) : stringValue
}
