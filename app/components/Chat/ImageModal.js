import React, { useState } from 'react'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'
import Images from 'appearance/images'
import Loading from 'components/Page/Loading'

export default ({ isVisible, onHide, url }) => {
  const [isLoading, setIsLoading] = useState(true)

  const onLoad = () => {
    setIsLoading(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableOpacity onPress={onHide}>
        <CenteredView>
          {isLoading ? <Loading /> : null}
          <Image source={{ uri: url }} resizeMode={'contain'} onLoad={onLoad} />

          <Icon source={Images.closeCircle} resizeMode={'contain'} />
        </CenteredView>
      </TouchableOpacity>
    </Modal>
  )
}

const Modal = styled.Modal``

const TouchableOpacity = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`

const Image = styled(FastImage)`
  height: 80%;
  width: 100%;
`

const Icon = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
`
