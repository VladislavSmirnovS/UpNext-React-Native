import React from 'react'
import styled from 'styled-components'
import { Platform, KeyboardAvoidingView, View, Keyboard } from 'react-native'
// import Header from 'components/MyVentures/Header'
import ScrollPadderEmpty from 'components/Page/ScrollPadderEmpty'
import Spacer from 'components/Page/Spacer'

export default ({ navigation, currentStepInfo, children }) => {
  const onOutPress = () => {
    Keyboard.dismiss()
  }

  return (
    <>
      {/* <Header navigation={navigation} currentStepInfo={currentStepInfo} /> */}
      <Spacer h={10} />
      <ViewWrapper behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollPadderEmpty keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={onOutPress}>{children}</TouchableOpacity>
        </ScrollPadderEmpty>
      </ViewWrapper>
    </>
  )
}

// Android does keyboard height adjustment natively.
const KeyboardView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})()

const TouchableOpacity = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  flex: 1;
`

const ViewWrapper = styled(KeyboardView)`
  flex: 1;
  width: 100%;
`
