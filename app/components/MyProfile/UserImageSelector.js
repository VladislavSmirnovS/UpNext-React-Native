import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser, setUserImageLoading, updateAppInfoAfterUserChange } from 'store/user/user.actions'
import { useUser, useUserImageLoading } from 'store/user/user.uses'
import ImageSelector from 'components/Control/ImageSelector'
import api from 'services/api'
import sendbird from 'services/sendbird'
import Avatar from 'components/Common/Avatar'
import { handleError } from 'services/logger'
import { getUserAvatarProps } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()
  const isLoading = useUserImageLoading()

  const onUpload = imageToUpload => {
    dispatch(setUserImageLoading(true))
    api
      .uploadUserAvatar(imageToUpload)
      .then(res => {
        dispatch(setUser(res?.data?.res))
        dispatch(updateAppInfoAfterUserChange(true))
      })
      .catch(error => dispatch(setUserImageLoading(false)))
  }

  const onCancel = () => {}

  const onError = error => {
    handleError(error)
  }

  const NoPhotoEl = ({ size }) => <Avatar {...getUserAvatarProps(user)} size={size} />

  return (
    <ImageSelector
      item={user}
      isLoading={isLoading}
      getNoPhotoEl={size => <NoPhotoEl size={size} />}
      onUpload={onUpload}
      onCancel={onCancel}
      onError={onError}
      required
    />
  )
}
