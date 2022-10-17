import React from 'react'
import styled from 'styled-components'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import { getHumanizeTimestamp } from 'services/utils'
import { getUserAvatarProps, getUserFullName } from 'utils/user'

export default ({ item, navigation, onClose, onStatsClose, eventType }) => {
  const { creator, created } = item

  const callback = () => {
    onClose()
    onStatsClose()
  }

  return (
    <Row>
      <UserAvatarLobbyBtn
        {...getUserAvatarProps(creator)}
        size={AVATAR_SIZE}
        navigation={navigation}
        callback={callback}
      />
      <Spacer w={10} />
      <View>
        <Texts.BoldTitleText>{getUserFullName(creator)}</Texts.BoldTitleText>
        <Texts.GreyText> {getHumanizeTimestamp(created)}</Texts.GreyText>
      </View>
    </Row>
  )
}

const AVATAR_SIZE = 60

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`

const View = styled.View`
  flex: 1;
  justify-content: center;
`
