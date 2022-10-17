import React from 'react'
import styled from 'styled-components'
import { Platform, KeyboardAvoidingView, View } from 'react-native'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'
import LinearGradient from 'react-native-linear-gradient'

// Android does keyboard height adjustment natively.
const KeyboardView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})()

export default ({ isVisible, onClose, children }) => {
  return (
    <>
      <Modal animationType="slide" transparent visible={isVisible} swipeDirection="down">
        <StyledViewWrapper behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <LinearGradientBackground colors={GRADIENT_COLORS} />
          <TouchableOpacity onPress={onClose}>
            <StyledView>
              <>
                <Centered>
                  <ModalHandle />
                </Centered>

                {children}
              </>
            </StyledView>
          </TouchableOpacity>
        </StyledViewWrapper>
      </Modal>
    </>
  )
}

const Modal = styled.Modal``

const StyledViewWrapper = styled(KeyboardView)`
  width: 100%;
  flex: 1;
`

const TouchableOpacity = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  height: 100%;
  width: 100%;
  flex: 1;
`

const StyledView = styled.TouchableHighlight`
  background: ${Colors.WHITE};
  margin-top: auto;
  padding: ${Styles.PAGE_PADDING};
`

const Centered = styled.View`
  justify-content: center;
  align-items: center;
`

const ModalHandle = styled.View`
  background: ${Colors.SEPARATE_GREY};
  width: 50px;
  height: 4px;
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 10px;
`

const LinearGradientBackground = styled(LinearGradient)`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.6;
`
const GRADIENT_COLORS = ['#3F005E', '#000000']
