import React from 'react'
import styled from 'styled-components'
import MyCoinsButton from 'components/Page/MyCoinsButton'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import { TOP_INSETS } from 'components/Control/DeviceHeight'

export default ({
  title,
  filter,
  isFilterActive,
  back,
  topHeader,
  titleBack,
  onLeftPress,
  onFilterPress,
  backgroundColor,
  navigation,
  chatStatus,
  customSubHeader,
  rightBtn,
  subTitle,
  titleColor,
  cancelCross,
  backImage,
  fontSize,
  titleWithCross,
  currentPage,
  addBtn,
  blackArrow,
}) => {
  const leftPress = () => (back || titleBack ? onLeftPress() : {})
  const filterPress = () => (filter ? onFilterPress() : {})

  return (
    <>
      <Container backgroundColor={backgroundColor}>
        {topHeader ? (
          <TopBar>
            {!back && (
              <ImagesView>
                <MyCoinsButton navigation={navigation} />
              </ImagesView>
            )}

            {back && (
              <HeaderButton onPress={leftPress}>
                <BackImage
                  source={backImage || Images.backArrowBlue}
                  resizeMode={'contain'}
                  currentPage={currentPage}
                  blackArrow={blackArrow}
                />
              </HeaderButton>
            )}
            {filter ? (
              <HeaderButton onPress={filterPress}>
                <MenuImage source={Images.filters} resizeMode="contain" active={isFilterActive} />
              </HeaderButton>
            ) : null}
          </TopBar>
        ) : null}
        {customSubHeader ? (
          customSubHeader
        ) : titleBack || title || chatStatus || rightBtn || addBtn ? (
          <TitleContainer>
            <Left>
              <TitleButton titleWithCross={titleWithCross}>
                {titleBack && (
                  <HeaderButton onPress={leftPress}>
                    <BackImage
                      source={backImage || Images.backArrowBlue}
                      resizeMode={'contain'}
                      currentPage={currentPage}
                    />
                  </HeaderButton>
                )}
                {cancelCross && (
                  <HeaderButton onPress={leftPress}>
                    <BackImage
                      source={backImage || Images.cross}
                      currentPage={currentPage}
                      resizeMode={'contain'}
                    />
                  </HeaderButton>
                )}
              </TitleButton>
              {title ? (
                <Title
                  color={Colors.TEXT_BRIGHT_BLUE}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  fontSize={fontSize}
                >
                  {title}
                </Title>
              ) : null}
              {subTitle ? (
                <SubTitle color={Colors.TEXT_BRIGHT_BLUE} numberOfLines={2} ellipsizeMode="tail">
                  {subTitle}
                </SubTitle>
              ) : null}
              {chatStatus ? <ChatStatus status={chatStatus}>{chatStatus}</ChatStatus> : null}
              {rightBtn ? rightBtn : null}
            </Left>
            <Right>
              {addBtn ? (
                <HeaderButton onPress={leftPress}>
                  <AddImage source={Images.addVideo} resizeMode={'contain'} />
                </HeaderButton>
              ) : null}
            </Right>
          </TitleContainer>
        ) : null}
      </Container>
    </>
  )
}

const Title = styled(Texts.HeaderText)`
  color: ${p => p.color || Colors.TEXT_DARK_BLUE};
  font-size: 24px;
  font-weight: 700;
  line-height: 27px;
`
const TitleButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${p => (p.titleWithCross ? 'space-between' : 'flex-start')};
  ${p => (p.titleWithCross ? 'width: 100%;' : '')}
`

const SubTitle = styled(Texts.SubHeader)`
  color: ${p => p.color || Colors.TEXT_DARK_BLUE};
  flex: 1;
`

const ChatStatus = styled(Texts.GreyText)`
  margin-left: auto;
  color: ${p => (p.status === 'online' ? 'green' : Colors.TEXT_GREY)};
`

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${p => p.backgroundColor || 'transparent'};
`

const ImagesView = styled.View`
  display: flex;
  flex-direction: row;
`

const TopBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
`
const Left = styled.View`
  display: flex;
  flex-direction: row;
`

const Right = styled.View`
  display: flex;
  flex-direction: row;
`

const HeaderButton = styled.TouchableOpacity`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackImage = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${p =>
    p.currentPage === 2 ? Colors.WHITE : p.blackArrow == 'black' ? Colors.BLACK : Colors.MENU_BLUE};
`

const AddImage = styled.Image`
  width: 26px;
  height: 26px;
`

const MenuImage = styled.Image`
  width: 30.7px;
  height: 30.7px;
  tint-color: ${p => (p.active ? Colors.COMMON_BLUE : Colors.BLACK)};
`
