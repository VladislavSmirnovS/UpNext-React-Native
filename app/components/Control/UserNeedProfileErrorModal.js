import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Card from 'components/Control/Card'
import Button from 'components/Control/Button'
import ButtonOuter from 'components/Control/ButtonOuter'
import Spacer from 'components/Page/Spacer'
import LottieView from 'lottie-react-native'
import Texts from 'appearance/texts'
import Lottie from 'appearance/lottie'
import { openEditPage } from 'services/navigation'

export default ({ isVisible, title, subTitle, onclose, navigation }) => {
  const dispatch = useDispatch()

  const onOpenMyprofilePage = () => {
    dispatch(openEditPage(navigation))
  }

  const onPress = () => {
    onOpenMyprofilePage()
    onclose()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <CenteredView>
        <CardView>
          <AnimationWrapper>
            <Animation source={Lottie.completeProfile} autoPlay loop />
          </AnimationWrapper>
          <Spacer h={20} />

          <HeaderText>{title}</HeaderText>
          <Spacer h={20} />
          <TitleText>{subTitle}</TitleText>
          <Spacer h={20} />

          <Button height={30} text="Do it now" textDesc=" (1 min)" onPress={onPress} />
          <Spacer h={10} />
          <ButtonOuter height={30} text="Do it later" onPress={onclose} />
        </CardView>
      </CenteredView>
    </Modal>
  )
}

const Modal = styled.Modal``

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
`

const CardView = styled(Card)`
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
`

const HeaderText = styled(Texts.TitleText)`
  text-align: center;
  font-weight: 700;
`

const TitleText = styled(Texts.TitleText)`
  text-align: center;
`

const AnimationWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

const Animation = styled(LottieView)`
  height: auto;
`
