import { useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import streamio from 'services/streamio'
import { getCommonStreamioToken } from 'store/user/user.actions'
import {
  useUserStreamIoToken,
  useUserId,
  useUserFirstName,
  useUserSchoolCountry,
  useUserAvatar,
  useUserInitialized,
} from 'store/user/user.uses'

export default () => {
  const dispatch = useDispatch()

  const streamIoToken = useUserStreamIoToken()
  const userId = useUserId()
  const userFirstName = useUserFirstName()
  const userSchoolCountry = useUserSchoolCountry()
  const userAvatar = useUserAvatar()
  const isUserInitialized = useUserInitialized()

  const userStreamioInfo = useMemo(() => {
    return {
      stream_io_token: streamIoToken,
      user_id: userId,
      first_name: userFirstName,
      school_country: userSchoolCountry,
      avatar: userAvatar,
    }
  }, [streamIoToken, userId, userFirstName, userSchoolCountry, userAvatar])

  useEffect(() => {
    if (streamIoToken) {
      streamio.init(userStreamioInfo)
      streamio.updateInfo(userStreamioInfo)
    }
  }, [streamIoToken])

  useEffect(() => {
    if (isUserInitialized && !streamIoToken) {
      dispatch(getCommonStreamioToken())
    }
  }, [isUserInitialized, streamIoToken])

  return { streamIoToken }
}
