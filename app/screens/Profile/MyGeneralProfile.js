import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Avatar from 'components/Common/Avatar'
import { useUser } from 'store/user/user.uses'
import Images from 'appearance/images'
import { openEditPage, openGetCoinPage,openWalletPage } from 'services/navigation'
import { getUserAvatarProps } from 'utils/user'
import BlueCard from 'root/app/components/MyProfile/BlueCard'
import { Dimensions } from 'react-native'
import { EMPTY_STRING } from 'root/app/constants'
import Colors from 'root/app/appearance/colors'
import { EMPTY_COUNT } from 'root/app/constants'
import SeparateLine from 'root/app/components/Control/SeparateLine'
import ButtonOuter from 'components/Control/ButtonOuter'
import { openAskUsPage } from 'services/navigation'
import LogoutButton from 'components/Login/LogoutButton'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import { getAppVersion } from 'services/app'
import PageContainer from 'root/app/components/Page/PageContainer'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const onLikeCoinPress = () => {
    dispatch(openGetCoinPage(navigation))
  }
  const onEditPress = () => {
    dispatch(openEditPage(navigation))
  }
  const openAskUs = () => {
    dispatch(openAskUsPage(navigation))
  }

  const fullName = `${user?.first_name} ${user?.last_name}` || EMPTY_STRING
  const ageWithCountry = `${user?.age}, ${user?.school_country}` || EMPTY_STRING
  const typeProfile = EMPTY_STRING
  const coins = user?.coins || EMPTY_COUNT

  return (
    <>
      <BlueCard>
        <Container>
          <TitleContainer>
            <Avatar {...getUserAvatarProps(user)} size={AVATAR_SIZE} />
            <FullName>{fullName}</FullName>
            <AgeWithCountry>{ageWithCountry}</AgeWithCountry>
            <TypeProfile>{typeProfile}</TypeProfile>
          </TitleContainer>
          <SeparateLine borderColor={Colors.TEXT_BRIGHT_BLUE} borderWide paddingLR />
          <StatsContainer>
            <StartUpContainer>
              <StatsFounder>
                <Title>Founder</Title>
                <Count>{EMPTY_COUNT}</Count>
              </StatsFounder>
              <StatsInvestor>
                <Title>Investor</Title>
                <Count>{EMPTY_COUNT}</Count>
              </StatsInvestor>
            </StartUpContainer>
            <StatsFooter>
              <StatsContacts>
                <Title>Contacts: </Title>
                <Count>{EMPTY_COUNT}</Count>
              </StatsContacts>
              <StatsCoins onPress={onLikeCoinPress}>
                <Count>{coins}</Count>
                <TitleImage resizeMode="contain" source={Images.coin} />
              </StatsCoins>
            </StatsFooter>
          </StatsContainer>
          <EditButton onPress={onEditPress}>
            <EditIcon
              tintColor={Colors.TEXT_BRIGHT_BLUE}
              resizeMode="contain"
              source={Images.edit}
            />
          </EditButton>
        </Container>
      </BlueCard>
      <InfoContainer>
        <BottomRow>
          <ButtonOuter
            text="Ask us anything"
            onPress={openAskUs}
            color={Colors.TEXT_BRIGHT_BLUE}
            width="140px"
            height={35}
          />
          <LogoutButton navigation={navigation} />
        </BottomRow>
        <Spacer h={5} />
        <Texts.GreyText style={{ textAlign: 'center' }}>V {getAppVersion()}</Texts.GreyText>
      </InfoContainer>
    </>
  )
}

const { width } = Dimensions.get('window')

export const AVATAR_SIZE = 80
export const IMAGE_SIZE = 50

const Container = styled.View`
  width: ${width - 80}px;
  position: relative;
  justify-content: center;
`
const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`
const InfoContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 20px;
`
const EditButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 10px;
`

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
`
const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`
const FullName = styled.Text`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 28px;
  margin-bottom: 5px;
  font-weight: 700;
`
const AgeWithCountry = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  margin-bottom: 10px;
  font-size: 16px;
`
const TypeProfile = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 22px;
  font-weight: 500;
`
const StatsContainer = styled.View``
const StartUpContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  margin-bottom: 40px;
`
const StatsFounder = styled.View`
  align-items: center;
`
const StatsInvestor = styled.View`
  align-items: center;
`

const Title = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 18px;
  margin-bottom: 7px;
`
const Count = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 18px;
  font-weight: 700;
`

const StatsFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const StatsContacts = styled.View`
  display: flex;
  flex-direction: row;
`
const StatsCoins = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const TitleImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`
