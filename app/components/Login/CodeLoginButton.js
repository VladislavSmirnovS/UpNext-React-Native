import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Spacer from 'components/Page/Spacer'
import ButtonOuter from 'components/Control/ButtonOuter'
import { resetState } from 'store/app/app.actions'
import { loginWithCode } from 'store/auth/auth.actions'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const [code, setCode] = useState(__DEV_USER_CODE__)

  const doLogin = () => {
    dispatch(resetState())
    dispatch(loginWithCode(code, navigation))
  }

  return (
    <>
      <Texts.WhiteSubtitleText>Got VIP Code?</Texts.WhiteSubtitleText>
      <Spacer h={10} />
      <CodeInput placeholder="Paste your code here" value={code} onChangeText={setCode} />
      <Spacer h={17} />
      <ApplayButton onPress={doLogin} />
    </>
  )
}

const ApplayButton = ({ onPress }) => (
  <ButtonOuter text="Apply" onPress={onPress} height={39} radius={20} width="125px" color={Colors.MENU_BLUE} fontSize={24}/>
)

const CodeInput = styled.TextInput`
  background: ${Colors.WHITE};
  width: 55%;
  height: 46px;
  border-radius: 45px;
  padding-left: 16.7px;
  padding-right: 16.7px;
  font-size: 16px;
  letter-spacing: -0.35px;
  color: ${Colors.TEXT_DARK_BLUE};
  text-align: center;
`
