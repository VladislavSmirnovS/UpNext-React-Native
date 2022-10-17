import React from 'react'
import { useDispatch } from 'react-redux'
import { useUser, useUserImageLoading } from 'store/user/user.uses'
import ImageSelector from 'components/Control/ImageSelector'
import Avatar from 'components/Common/Avatar'
import { setUser } from 'store/user/user.actions'
import { handleError } from 'services/logger'
import api from 'services/api'

export default () => {
  const dispatch = useDispatch()
  const user = useUser()
  const isLoading = useUserImageLoading()

  const onUpload = imageToUpload => {
    api
      .uploadCompanyAvatar(imageToUpload)
      .then(res => {
        dispatch(setUser(res?.data?.res))
      })
      .catch(error => handleError(error))
  }

  const onCancel = () => {}

  const onError = error => {
    handleError(error)
  }

  const NoPhotoEl = ({ size }) => (
    <Avatar
      uri={user?.company_avatar}
      size={size}
      id="x"
      firsName={user?.company_name}
      borderRadius={AVATAR_BORDER_RADIUS}
    />
  )

  return (
    <ImageSelector
      item={user}
      field="company_avatar"
      isLoading={isLoading}
      getNoPhotoEl={size => <NoPhotoEl size={size} />}
      onUpload={onUpload}
      onCancel={onCancel}
      onError={onError}
      required
      borderRadius={8}
    />
  )
}

const AVATAR_BORDER_RADIUS = 8
