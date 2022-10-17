import React from 'react'
import { TouchableHighlight } from 'react-native'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Card } from 'react-native-shadow-cards'
import { openHomePage, openMyStartupPage } from 'root/app/services/navigation'
import Spacer from 'components/Page/Spacer'
import AppHeader from 'root/app/navigation/AppHeader'

import Images from 'appearance/images'
import Styles from 'appearance/styles'
import Colors from 'appearance/colors'
import Text from 'appearance/texts'

export default ({ navigation, hideStartNavigate }) => {
  const dispatch = useDispatch()

  const navigateToFeed = () => {
    hideStartNavigate()
  }
  const navigateToStartUp = () => {
    dispatch(openMyStartupPage(navigation))
    hideStartNavigate()
  }

  return (
    <>
      <ContainerForHeader>
        <AppHeader />
      </ContainerForHeader>
      <Container>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={navigateToFeed}
          style={{ flex: 1 }}
        >
          <ItemsContainer>
            <Image source={Images.discover} resizeMode="cover" />
            <TextContainer>
              <TitleText>Discover</TitleText>
              <SubTitleText>Find startup to invest in</SubTitleText>
            </TextContainer>
          </ItemsContainer>
        </TouchableHighlight>
        <Spacer h={15} />
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="transparent"
          onPress={navigateToStartUp}
          style={{ flex: 1 }}
        >
          <ItemsContainer>
            <Image source={Images.startProject} resizeMode="cover" />
            <TextContainer>
              <TitleText>Start a Project</TitleText>
              <SubTitleText>Start you own startup project and find investors</SubTitleText>
            </TextContainer>
          </ItemsContainer>
        </TouchableHighlight>
      </Container>
    </>
  )
}

const Container = styled.View`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
  padding: ${Styles.PAGE_SIDE_PADDING};
`

const ContainerForHeader = styled.View`
  padding: 0 20px;
  padding-top: 45px;
  background-color: #fff;
  min-width: 100%;
`

const ItemsContainer = styled(Card)`
  height: 100%;
  width: 100%;
  border-radius: 21px;
  margin: 10px 0;
  overflow: hidden;
  elevation: 10;
`
const Image = styled.Image`
  width: 100%;
  height: 165px;
`
const TextContainer = styled.View`
  width: 90%;
  padding: 20px 20px;
`
const TitleText = styled(Text.BoldHeaderText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
`
const SubTitleText = styled(Text.MediumText)`
  font-size: 20px;
  color: ${Colors.TEXT_DARK_PURPLE};
`
