import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import Spacer from 'components/Page/Spacer'
import Avatar from 'components/Common/Avatar'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import { TOP_INSETS } from 'components/Control/DeviceHeight'
import { getNotificationData } from 'services/utils'

const { width } = Dimensions.get('window')

export default ({ icon, title, message, onPress, onClose }) => {
  const getMessageWithoutParams = () => {
    const { text } = getNotificationData(message)
    if (text.includes('Placed a coin')) {
      return (
        <>
          Placed a <CoinImage source={Images.coin} resizeMode="cover" /> on your video
        </>
      )
    }
    return text
  }

  const handlePress = () => {
    onPress && onPress()
    onClose()
  }

  return (
    <GestureRecognizer onSwipe={onClose}>
      <Container
        style={{ borderBottomColor: Colors.WHITE, borderBottomWidth: 1 }}
        onPress={handlePress}
      >
        {icon ? (
          <>
            <Avatar
              uri={icon.uri}
              size={AVATAR_SIZE}
              id="0"
              firsName={icon.nickname}
              borderRadius={AVATAR_BORDER_RADIUS}
            />
            <Spacer w={20} />
          </>
        ) : null}

        <View style={{ width: icon ? width - 90 : width - 20 }}>
          {title ? <WhiteText>{title}</WhiteText> : null}
          {message ? <DarkText>{getMessageWithoutParams()}</DarkText> : null}
        </View>
      </Container>
    </GestureRecognizer>
  )
}

const AVATAR_SIZE = 40
const AVATAR_BORDER_RADIUS = 25

const Container = styled.TouchableOpacity`
  padding: ${TOP_INSETS + 10}px 10px 10px 10px;
  flex-direction: row;
  background: ${Colors.COMMON_BLUE};
  align-items: center;
  height: 100%;
`

const View = styled.View``

const WhiteText = styled(Texts.SubtitleText)`
  color: ${Colors.WHITE};
  font-weight: 700;
`

const DarkText = styled(Texts.SubtitleText)`
  font-weight: 700;
  flex-wrap: wrap;
`

const CoinImage = styled.Image`
  width: 19px;
  height: 19px;
`
