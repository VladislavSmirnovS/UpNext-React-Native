import React, { memo } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import Hashtags from 'components/Feed/Hashtags'
import TeamAvatarLobbyBtn from 'components/Common/TeamAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { openLobbyCurrentTeamPage } from 'services/navigation'
import { useDispatch } from 'react-redux'

const VideoBottom = ({ navigation, item }) => {
  const dispatch = useDispatch()

  const onPress = () => {
    const id = item?.teamId
    const params = { teamId: id }
    dispatch(openLobbyCurrentTeamPage(navigation, params))
  }

  return (
    <VideoInfoBottomWrapper onPress={onPress}>
      <TeamAvatarLobbyBtn
        uri={item?.teamImage}
        id={item?.teamId}
        firsName={item?.teamName}
        size={TEAM_AVATAR_SIZE}
        navigation={navigation}
      />
      <Spacer w={6} />
      <Card>
        <Row>
          <View>
            <BoldText numberOfLines={1} ellipsizeMode="tail">
              {item?.teamName}
            </BoldText>

            {item?.teamSlogan ? (
              <Texts.SubtitleText numberOfLines={2} ellipsizeMode="tail">
                {item?.teamSlogan}
              </Texts.SubtitleText>
            ) : null}

            <Hashtags item={item} />
          </View>
        </Row>
      </Card>
    </VideoInfoBottomWrapper>
  )
}

const TEAM_AVATAR_SIZE = 60

const arePropsEqual = (prevProps, nextProps) => {
  const props = ['item']
  return props.every(prop => prevProps?.[prop] === nextProps?.[prop])
}

export default memo(VideoBottom, arePropsEqual)

const { width } = Dimensions.get('window')

const VideoInfoBottomWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Card = styled.View`
  padding: 10px;
  background-color: 'rgba(255, 255, 255, 0.8)';
  border-radius: ${Styles.MAIN_BORDER_RADIUS}px;
  border: ${Styles.BOX_BORDER}60;
  width: ${width - 2 * 20 - 52}px;
  ${p => p.isFlex && Flex}
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const View = styled.View`
  max-width: ${width - 2 * 20 - 2 * 10 - 20 - 60}px;
`

const BoldText = styled(Texts.BigText)`
  font-weight: 700;
  color: ${Colors.MENU_PURPLE};
`
