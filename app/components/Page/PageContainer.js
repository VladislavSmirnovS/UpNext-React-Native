import React from 'react'
import styled from 'styled-components'
import GeneralStatusBar from 'components/Page/GeneralStatusBar'
import PageHeader from 'components/Page/PageHeader'
import AfterInteractions from 'components/Page/AfterInteractions'
import PageContent from 'components/Page/PageContent'
import Colors from 'appearance/colors'
import Loading from 'components/Page/Loading'
import PageLottie from 'components/Control/PageLottie'
import { useUserLoading } from 'store/user/user.uses'
import Lottie from 'components/Control/Lottie'
import AppAlert from 'components/Control/AppAlert'
import CameraView from 'components/Control/CameraView'
import ShareView from 'components/Control/ShareView'
import NotLoginAlert from 'components/Page/NotLoginAlert'
import SearchHashtagModal from 'components/Common/HashtagSearch/SearchHashtagModal'

export default ({
  navigation,
  onGoBack,
  noPadding,
  backCallback,
  hideHeader,
  hideTopHeader,
  hideMenu,
  hideChat,
  backgroundColor,
  isLoading,
  isLoadingOverlay,
  isWhiteStatusBarText,
  withoutInteractions,
  renderPlaceholder,
  children,
  backImage,
  paddingTop,
  fontSize,
  currentPage,
  blackArrow,
  ...props
}) => {
  const isUserLoading = useUserLoading()

  const onBackPress = () => {
    if (onGoBack) {
      onGoBack()
    } else if (navigation?.state?.params?.onGoBack) {
      navigation?.state?.params?.onGoBack()
    } else {
      navigation.goBack()
    }
    backCallback && backCallback()
  }

  return (
    <Container
      paddingTop={paddingTop}
      backgroundColor={currentPage == 2 ? Colors.BLACK : backgroundColor}
    >
      <GeneralStatusBar isWhiteStatusBarText={isWhiteStatusBarText} />
      <Wrapper>
        {!hideHeader && (
          <PageHeader
            backImage={backImage}
            navigation={navigation}
            backgroundColor={backgroundColor}
            topHeader={!hideTopHeader}
            menu={!hideMenu}
            chat={!hideChat}
            onLeftPress={onBackPress}
            fontSize={fontSize}
            currentPage={currentPage}
            blackArrow={blackArrow}
            {...props}
          />
        )}
        <AfterInteractions
          withoutInteractions={withoutInteractions}
          renderPlaceholder={renderPlaceholder}
        >
          <Content>
            <AppAlert />

            <PageContent noPadding={noPadding}>{children}</PageContent>
            {isLoading || isLoadingOverlay ? <Loading isOverlay={isLoadingOverlay} /> : null}

            {isUserLoading ? (
              <Lottie
                name="loader"
                text="Updating..."
                isInfinitely
                animationHeight="100px"
                animationWidth="100px"
              />
            ) : null}
            <PageLottie />
          </Content>

          <ShareView />
          <CameraView />

          <NotLoginAlert navigation={navigation} />
          <SearchHashtagModal />
        </AfterInteractions>
      </Wrapper>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${p => p.backgroundColor || Colors.WHITE};
  width: 100%;
  ${({ paddingTop }) => (paddingTop ? 'padding-top:50px' : '')};
`

const Wrapper = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  width: 100%;
`
