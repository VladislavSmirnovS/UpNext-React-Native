import React from 'react'
import styled from 'styled-components'
import { Badge, Text } from 'native-base'
import { useDispatch } from 'react-redux'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import { getHumanizeTimestamp } from 'services/utils'
import { getUserAvatarProps } from 'utils/user'

export default ({ icon, user, title, description, time, leftElement, navigation, newCount }) => {
  const dispatch = useDispatch()

  const renderIcon = () => {
    return icon ? (
      <>
        <Icon source={Images[icon]} resizeMode="contain" size={AVATAR_SIZE} />
        {newCount ? (
          <StyledBadge>
            <Text>{newCount}</Text>
          </StyledBadge>
        ) : null}
      </>
    ) : null
  }

  const renderAvatar = () => {
    return user ? (
      <UserAvatarLobbyBtn
        {...getUserAvatarProps(user)}
        size={AVATAR_SIZE}
        navigation={navigation}
      />
    ) : null
  }

  const renderTitle = () => {
    return title ? <Texts.BoldTitleText>{title}</Texts.BoldTitleText> : null
  }

  const renderTime = () => {
    return time ? <Texts.GreyText> {getHumanizeTimestamp(time)}</Texts.GreyText> : null
  }

  const renderDescription = () => {
    return description ? (
      <Texts.SubtitleText>
        {description}
        {renderTime()}
      </Texts.SubtitleText>
    ) : null
  }

  return (
    <Row>
      {renderIcon()}
      {renderAvatar()}
      <Spacer w={10} />
      <View>
        {renderTitle()}
        <Row>{renderDescription()}</Row>
      </View>
      {leftElement || null}
    </Row>
  )
}

const AVATAR_SIZE = 60

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`

const Icon = styled.Image`
  align-self: center;
  height: ${p => p.size || AVATAR_SIZE}px;
  width: ${p => p.size || AVATAR_SIZE}px;
  align-self: flex-start;
`

const View = styled.View`
  flex: 1;
  justify-content: center;
`

const StyledBadge = styled(Badge)`
  position: absolute;
  left: ${AVATAR_SIZE - 20}px;
  top: -2px;
`
