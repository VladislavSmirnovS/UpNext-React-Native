import React from 'react'
import styled from 'styled-components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from 'components/Login/LoginLoading'
import GoogleLoginButton from 'components/Login/GoogleLoginButton'
import SnapchatLoginButton from 'components/Login/SnapchatLoginButton'
import AppleLoginButton from 'components/Login/AppleLoginButton'
import CodeLoginButton from 'components/Login/CodeLoginButton'
import PolicyTerms from 'components/Login/PolicyTerms'
import FlexSpacer from 'components/Common/FlexSpacer'
import Spacer from 'components/Page/Spacer'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import Images from 'appearance/images'

// @TODO: login screen displayed for too long without loading image after logging in with socials
export default ({ navigation }) => {
  return (
    <>
      <Loading />

      <ScrollView>
        <Spacer h={30} />
        <AppLogo source={Images.upnextNewLogo} resizeMode="contain" />
        <FlexSpacer />

        <Texts.WhiteHeaderText>Sign in</Texts.WhiteHeaderText>
        <Spacer h={8} />
        <Texts.NewWhiteText>
          {'Create your profile, invest in\r\nstartups and create your own'}
        </Texts.NewWhiteText>

        <Spacer h={23} />
        <SnapchatLoginButton navigation={navigation} />

        <Spacer h={23} />
        <GoogleLoginButton navigation={navigation} />

        <Spacer h={23} />
        <AppleLoginButton navigation={navigation} />

        <FlexSpacer />
        <CodeLoginButton navigation={navigation} />

        <FlexSpacer />
        <BottomSection>
          <PolicyTerms />
        </BottomSection>
        <Spacer h={20} />
      </ScrollView>
    </>
  )
}

const ScrollView = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: Colors.MENU_PURPLE,
    alignItems: 'center',
  },
})``

const AppLogo = styled.Image`
  height: 120px;
  margin: 20px;
`

const BottomSection = styled.View`
  align-items: center;
  padding: 10px;
  width: 100%;
`
