import React from 'react'
import styled from 'styled-components'
import Images from 'appearance/images'

export default ({ isVisible, onClose, children }) => (
  <Modal visible={isVisible}>
    <TouchableOpacity onPress={onClose}>
      <CenteredView>
        <DisableTouchableOpacity activeOpacity={1}>{children}</DisableTouchableOpacity>

        <CloseIcon source={Images.closeCircle} resizeMode={'contain'} />
      </CenteredView>
    </TouchableOpacity>
  </Modal>
)

const Modal = styled.Modal.attrs({ transparent: true })``

const TouchableOpacity = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
`

const DisableTouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 40px;
  width: 100%;
`

const CloseIcon = styled.Image`
  align-self: center;
  height: 40px;
  width: 40px;
`
