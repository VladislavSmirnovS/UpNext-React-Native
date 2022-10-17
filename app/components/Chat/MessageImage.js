import React, { useState } from 'react'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'
import ImageModal from 'components/Chat/ImageModal'
import Loading from 'components/Page/Loading'

export default ({ item }) => {
  const { url } = item
  const [isLoading, setIsLoading] = useState(true)
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const onShow = () => {
    setIsVideoVisible(true)
  }

  const onLoad = () => {
    setIsLoading(false)
  }

  const onHide = () => {
    setIsVideoVisible(false)
  }

  return (
    <Wrapper onPress={onShow}>
      {isLoading ? <Loading size={50} /> : null}
      <PreviewImage source={{ uri: url }} resizeMode={'contain'} onLoad={onLoad} />
      <ImageModal isVisible={isVideoVisible} onHide={onHide} url={url} />
    </Wrapper>
  )
}

const Wrapper = styled.TouchableOpacity`
  position: relative;
`

const PreviewImage = styled(FastImage)`
  height: 100px;
  width: 100px;
`
