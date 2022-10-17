import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import GestureRecognizer from 'react-native-swipe-gestures'
import UserNeedProfileErrorModal from 'components/Control/UserNeedProfileErrorModal'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import Spacer from 'components/Page/Spacer'
import useIsCompleted from 'components/Feed/hooks/useIsCompleted'
import useUserReportVideos from 'components/Feed/hooks/useUserReportVideos'
import { doIfLoginUser } from 'store/user/user.actions'
import { reportVideo, disableTeamFromFeed, addToFaforite } from 'store/feed/feed.actions'

export default ({ isVisible, item, onClose, navigation }) => {
  const dispatch = useDispatch()

  const {
    isProfileErrorModalVisible,
    openProfileErrorModal,
    closeProfileErrorModal,
    isCompleted,
  } = useIsCompleted()
  const { isReportNotAvailable, isMarAvailable } = useUserReportVideos()

  const [currentScreen, setCurrentScreen] = useState(0)

  const openReportScreen = () => {
    setCurrentScreen('report')
  }

  const openThanksScreen = () => {
    setCurrentScreen('thanks')
  }

  const openReportDoubleScreen = () => {
    setCurrentScreen('double')
  }

  const onReport = option => {
    openThanksScreen()
    dispatch(reportVideo(item, option))
  }

  const close = () => {
    setCurrentScreen(0)
    onClose()
  }

  const onReportPress = () => {
    dispatch(doIfLoginUser(handleReportPress))
  }

  const handleReportPress = () => {
    if (!isCompleted()) {
      close()
      openProfileErrorModal()
    } else if (isReportNotAvailable(item)) {
      openReportDoubleScreen()
    } else {
      openReportScreen()
    }
  }

  const onTeamBlockPress = () => {
    close()
    dispatch(disableTeamFromFeed(item))
  }

  const onFavoritPress = () => {
    dispatch(
      doIfLoginUser(() => {
        close()
        dispatch(addToFaforite(item))
      }),
    )
  }

  const renderCurrentScreen = () => {
    return {
      0: (
        <FirstScreen
          onReportPress={onReportPress}
          onFavoritPress={onFavoritPress}
          isMarAvailable={isMarAvailable(item)}
        />
      ),
      report: <ReportScreen onPress={onReport} />,
      thanks: <ThanksScreen item={item} onBlock={onTeamBlockPress} />,
      double: <DoubleScreen item={item} onBlock={onTeamBlockPress} />,
    }[currentScreen]
  }

  return (
    <>
      <Modal animationType="slide" transparent visible={isVisible}>
        <SwipeContainer onSwipeDown={close}>
          <TouchableOpacity onPress={close}>
            <View>
              <>
                <Centered>
                  <ModalHandle />
                </Centered>

                {renderCurrentScreen()}
              </>
            </View>
          </TouchableOpacity>
        </SwipeContainer>
      </Modal>
      <UserNeedProfileErrorModal
        isVisible={isProfileErrorModalVisible}
        onclose={closeProfileErrorModal}
        title="Want to report?"
        subTitle="You need to have a user profile"
        navigation={navigation}
      />
    </>
  )
}

const FirstScreen = ({ onReportPress, onFavoritPress, isMarAvailable }) => {
  return (
    <Row>
      <Button onPress={onReportPress}>
        <Icon source={Images.flag} resizeMode="contain" />
        <CenteredTitleText>Report this video</CenteredTitleText>
      </Button>
      {isMarAvailable ? (
        <Button onPress={onFavoritPress}>
          <Icon source={Images.mark} resizeMode="contain" />
          <CenteredTitleText>Add to favorits</CenteredTitleText>
        </Button>
      ) : null}
    </Row>
  )
}

const ReportScreen = ({ onPress }) => {
  const renderReportOptions = () => {
    return REPORT_OPTIONS.map(item => <ReportOption item={item} onPress={onPress} />)
  }

  return (
    <>
      <CenteredHeaderText>What's wrong with this video?</CenteredHeaderText>
      <Options>{renderReportOptions()}</Options>
    </>
  )
}

const ReportOption = ({ item, onPress }) => {
  const handlePress = () => {
    onPress(item)
  }

  return (
    <Button onPress={handlePress}>
      <Texts.TitleText>{item}</Texts.TitleText>
    </Button>
  )
}

const REPORT_OPTIONS = [
  "It's spam",
  'Nudity of sexual activity',
  'Hate speech or symbols',
  'Sale ilegal or regulated goods',
  'Violance or dangerous organications',
  'Bulying or harassment',
  'Suicide, self-harm, or an eating disorder',
  'Scam or fraud',
  "I just don't like it",
]

const ThanksScreen = ({ item, onBlock }) => {
  return (
    <>
      <Icon source={Images.tnxEmoji} resizeMode="contain" height={120} />
      <CenteredHeaderText>Tnx for Letting us know</CenteredHeaderText>
      <CenteredTitleText>We are on it</CenteredTitleText>

      <BlockTeamButton item={item} onPress={onBlock} />
    </>
  )
}

const BlockTeamButton = ({ item, onPress }) => {
  return (
    <>
      <Spacer h={30} />
      <CenteredTitleText>In the meantime you can</CenteredTitleText>
      <Button onPress={onPress}>
        <RedText>Block team {item?.teamName}</RedText>
      </Button>
    </>
  )
}

const DoubleScreen = ({ item, onBlock }) => {
  return (
    <>
      <CenteredTitleText>You already report this video</CenteredTitleText>

      <BlockTeamButton item={item} onPress={onBlock} />
    </>
  )
}

const Modal = styled.Modal``

const TouchableOpacity = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
  flex: 1;
`

const SwipeContainer = styled(GestureRecognizer)`
  flex: 1;
  width: 100%;
`

const View = styled.TouchableHighlight`
  background: ${Colors.WHITE};
  margin-top: auto;
  padding: 15px 15px 30px;
`

const CenteredHeaderText = styled(Texts.HeaderText)`
  text-align: center;
`

const CenteredTitleText = styled(Texts.TitleText)`
  text-align: center;
`

const RedText = styled(Texts.TitleText)`
  text-align: center;
  color: ${Colors.COMMON_RED};
`

const Options = styled.View`
  padding: 30px 15px;
`

const Button = styled.TouchableOpacity`
  padding: 20px 0;
`

const ICON_SIZE = 80

const Icon = styled.Image`
  height: ${p => p.height || ICON_SIZE}px;
  width: ${p => p.height || ICON_SIZE}px;
  align-self: center;
`

const Centered = styled.View`
  justify-content: center;
  align-items: center;
`

const ModalHandle = styled.View`
  background: ${Colors.COMMON_GREY};
  width: 50px;
  height: 4px;
  border-radius: 5px;
  margin-bottom: 30px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
