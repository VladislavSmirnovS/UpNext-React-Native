import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Images from 'appearance/images'
import { setShareData } from 'store/app/app.actions'
import { useUserId } from 'store/user/user.uses'
import branchio from 'services/branchio'
import vimeo from 'services/vimeo'
import { getVimeoUrl } from 'store/notification/notification.actions'

const ShareButton = ({ item, imageSource, size }) => {
  const dispatch = useDispatch()
  const userId = useUserId()

  const getShareData = async () => {
    const videoUrl = item?.video_url

    const id = vimeo.getVideoId(videoUrl)
    const res = await getVimeoUrl(id)

    return {
      uniqueId: videoUrl,
      inviteUserId: userId,
      acitivityId: item?.id,
      videoUrl,
      teamId: item?.teamId,
      videoVimeoUrl: res.uri,
    }
  }

  const onSharePress = async () => {
    const data = await getShareData()
    const url = await branchio.shareVideo(data)
    dispatch(setShareData({ url }))
  }

  return (
    <TouchableOpacity onPress={onSharePress}>
      <Image source={imageSource || Images.whiteShare} resizeMode="contain" size={size} />
    </TouchableOpacity>
  )
}

const arePropsEqual = (prevProps, nextProps) => {
  const props = ['id', 'teamId', 'video_url']
  return props.every(prop => prevProps.item?.[prop] === nextProps.item?.[prop])
}

export default memo(ShareButton, arePropsEqual)

const IMAGE_SIZE = 30

const Image = styled.Image`
  width: ${p => p.size || IMAGE_SIZE}px;
  height: ${p => p.size || IMAGE_SIZE}px;
`

const TouchableOpacity = styled.TouchableOpacity`
  background: transparent;
`
