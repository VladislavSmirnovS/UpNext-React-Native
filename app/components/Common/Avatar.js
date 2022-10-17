import React from 'react'
import FastImage from 'react-native-fast-image'
import GeneratedAvatar from 'components/Common/GeneratedAvatar'
import Images from 'appearance/images'

export default ({ uri, withoutUser, id, status, firsName, lastName, size = SIZE, borderRadius, style }) => {
  const avatarStyle = {
    height: size,
    width: size,
    opacity: status=='deleted' ? 0.5 : 1 ,
    borderRadius: borderRadius || 0.5 * size,
    ...style,
  }

  if (withoutUser) {
    return <FastImage source={Images.userNoPhoto} size={size} style={avatarStyle} />
  }

  if (uri) {
    const source = typeof uri === 'string' ? { uri } : uri
    return <FastImage source={source} size={size} style={avatarStyle} />
  }

  return (
    <GeneratedAvatar
      id={id}
      firsName={firsName}
      lastName={lastName}
      size={size}
      style={avatarStyle}
    />
  )
}

const SIZE = 30
