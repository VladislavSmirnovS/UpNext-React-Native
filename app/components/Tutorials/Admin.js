import React from 'react'
import Modal from 'components/Tutorials/Modal'
import Texts from 'appearance/texts'

export default ({ isVisible, onHide }) => {
  return (
    <Modal isVisible={isVisible} buttonText="Got it" onButtonPress={onHide}>
      <Texts.TitleText>{MESSAGE}</Texts.TitleText>
    </Modal>
  )
}

const MESSAGE =
  'When you click on a member, you log out from your account and log in with their account. ' +
  'All actions will be performed on behalf of the user. ' +
  'Admin can log in with any user, even if user already log in. (Admin login avoids one device rule.) ' +
  '\r\nLog out of the member account after completion and log in to your account to continue working.'
