import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import PageContainer from 'components/Page/PageContainer'
import Spacer from 'components/Page/Spacer'
import ButtonOuter from 'components/Control/ButtonOuter'
import ClickedComponent from 'components/Control/ClickedComponent'
import InviteStatsModal from 'components/Stats/InviteStatsModal'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import { setShareData } from 'store/app/app.actions'
import { useUser } from 'store/user/user.uses'
import branchio from 'services/branchio'
import { getUserId } from 'utils/user'
import { openMyProfilePage } from 'services/navigation'

const GetCoin = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const [isShowStats, setIsShowStats] = useState(false)

  const onShowStats = () => {
    setIsShowStats(true)
  }

  const onCloseStats = () => {
    setIsShowStats(false)
  }

  const getShareData = () => {
    const inviteUserId = getUserId(user)
    return {
      uniqueId: inviteUserId,
      inviteUserId,
    }
  }

  const onInviteUserPress = async () => {
    const { uniqueId, inviteUserId } = getShareData()
    const url = await branchio.invite({ uniqueId, inviteUserId })
    dispatch(setShareData({ url }))
  }

  const onGoBack = () => {
    navigation.goBack()
  }

  return (
    <PageContainer
      backgroundColor="#3f005e"
      navigation={navigation}
      hideTopHeader
      withoutInteractions
      noPadding
    >
      <ClickedComponent onLongPress={onShowStats} isFlex>
        <BackgroundImage source={Images.coin_background} resizeMode="cover" />
        <Spacer h={100} />
        <TitleContainer>
          <HeaderButton onPress={onGoBack}>
            <BackImage source={Images.backArrowBlue} resizeMode="contain" />
          </HeaderButton>
          <Title>Share and Earn</Title>
        </TitleContainer>
        <Spacer h={20} />
        <Centered>
          <BigTitle>{'Get extra\r\ninvesting coins'}</BigTitle>
          <Spacer h={10} />
          <SmallTitle>1 user joins = 1 extra coin</SmallTitle>
          <Spacer h={20} />
          <ButtonOuter onPress={onInviteUserPress} text="Invite now" height={40} width="130px" />
        </Centered>
      </ClickedComponent>
      <InviteStatsModal isVisible={isShowStats} onClose={onCloseStats} navigation={navigation} />
    </PageContainer>
  )
}

const { width } = Dimensions.get('window')
const IMAGE_WIDTH = width
const IMAGE_HEIGHT = (IMAGE_WIDTH / 757) * 1511

const BackgroundImage = styled.Image`
  position: absolute;
  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;
`

const Title = styled(Texts.HeaderText)`
  text-align: center;
  font-weight: bold;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 18px;
`
const HeaderButton = styled.TouchableOpacity``
const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const BackImage = styled.Image`
  width: 24px;
  height: 24px;
`

const BigTitle = styled(Texts.BigText)`
  font-size: 35px;
  line-height: 35px;
  text-align: center;
  color: ${Colors.WHITE};
`

const SmallTitle = styled(Texts.TitleText)`
  color: ${Colors.WHITE};
`

const Centered = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`
GetCoin.navigationOptions = () => {
  return { headerShown: false }
}

export default GetCoin
