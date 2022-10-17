import React from 'react'
import styled from 'styled-components'
import Avatar from 'components/Common/Avatar'
import { useDispatch } from 'react-redux'
import Images from 'appearance/images'
import Colors from 'appearance/colors'
import { openGetCoinPage } from 'services/navigation'

export default ({ navigation, project }) => {
  const dispatch = useDispatch()

  const onLikeCoinPress = () => {
    dispatch(openGetCoinPage(navigation))
  }

  const coins = project?.coins || 0

  return (
    <Container>
      <UserHeaderContainer>
        <Avatar uri={project.avatar} size={AVATAR_SIZE} />
        <UserHeaderItems>
          <UserName>{project.name}</UserName>
          <UserDescription>{project.description}</UserDescription>
        </UserHeaderItems>
        <StatsCoins onPress={onLikeCoinPress}>
          <TitleImage resizeMode="contain" source={Images.coin} />
          <UserDescription>{coins}</UserDescription>
        </StatsCoins>
      </UserHeaderContainer>
    </Container>
  )
}

const AVATAR_SIZE = 60

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 40px;
`

const UserHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  width: 286px;
`
const UserName = styled.Text`
  font-size: 16px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: bold;
  margin-bottom: 5px;
`
const UserDescription = styled.Text`
  font-size: 13px;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const UserHeaderItems = styled.View`
  margin-left: 23px;
  margin-right: 30px;
  width: 155px;
`

const StatsCoins = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`
const TitleImage = styled.Image`
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
`
