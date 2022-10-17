import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import CardPlayer from 'components/MyVentures/CardPlayer'
import { openCardVideosPage } from 'services/navigation'

export default ({ url, title, navigation, ...props }) => {
  const dispatch = useDispatch()

  const onVideoPress = () => {
    if (url) {
      const params = {
        videos: [
          {
            url,
            title,
          },
        ],
      }
      dispatch(openCardVideosPage(navigation, params))
    }
  }

  return (
    <TouchableOpacity onPress={onVideoPress} activeOpacity={url ? 0 : 1}>
      <CardPlayer navigation={navigation} url={url} disablePlayer {...props} />
    </TouchableOpacity>
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
`
