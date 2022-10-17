import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import BlueCard from 'components/MyProfile/BlueCard'
import ChatStatus from 'components/ChatList/ChatStatus'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import Avatar from 'components/Common/Avatar'
import { Badge, Text } from 'native-base'
import { getUserId, getUserAvatar } from 'utils/user'

export default ({
  member,
  onPress,
  chatName,
  status,
  time,
  type,
  additionalText,
  unreadMessageCount,
  children,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0 : 1}>
        <BlueCard wrapPadding="5px">
          <TopArea>
            <LeftArea>
              <Avatar
                uri={getUserAvatar(member)}
                size={IMAGE_SIZE}
                id={getUserId(member)}
                firsName={member?.nickname}
              />
              <MessageStatus>
                <ChatStatus status={status} />
              </MessageStatus>
            </LeftArea>
            <Spacer w={20} />

            <TitleArea>
              <Row>
                {chatName ? (
                  <ChatNameWrapper>
                    <Texts.BlueSubTitleText numberOfLines={1} ellipsizeMode="tail">
                      {chatName}
                    </Texts.BlueSubTitleText>
                  </ChatNameWrapper>
                ) : null}
                <Flex />

                <Texts.GreyText>{time}</Texts.GreyText>
              </Row>

              <Row>
                <View>
                  <Texts.BoldDarkPurpleText numberOfLines={1} ellipsizeMode="tail">
                    {type}
                  </Texts.BoldDarkPurpleText>
                  <AdditionalTextWrapper>
                    <Texts.DarkPurpleText numberOfLines={1} ellipsizeMode="tail">
                      {additionalText}
                    </Texts.DarkPurpleText>
                  </AdditionalTextWrapper>
                </View>
                <Spacer w={10} />
                <RightArea>{children}</RightArea>
              </Row>
            </TitleArea>
          </TopArea>
        </BlueCard>
      </TouchableOpacity>
      <NewMessagesBadge>
        {unreadMessageCount ? (
          <Badge>
            <Text>{unreadMessageCount}</Text>
          </Badge>
        ) : null}
      </NewMessagesBadge>
    </>
  )
}

export const IMAGE_SIZE = 60

const TouchableOpacity = styled.TouchableOpacity``

const { width } = Dimensions.get('window')
const paddings = 2 * 5 + 2 * 10
const spacers = 10
const time = 50
const status = 50
const ChatNameWrapper = styled.View`
  max-width: ${width - paddings - IMAGE_SIZE - spacers - time - status}px;
`

const AdditionalTextWrapper = styled.View`
  width: 100px;
  max-width: 100px;
`

const TopArea = styled.View`
  flex-direction: row;
  width: 100%;
`

const LeftArea = styled.View`
  flex-flow: column;
  align-items: center;
  position: relative;
`
const MessageStatus = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`

const TitleArea = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`

const RightArea = styled.View`
  flex-flow: column;
  flex: 1;
`

const View = styled.View``

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Flex = styled.View`
  flex: 1;
`

const NewMessagesBadge = styled.View`
  position: absolute;
  right: -2px;
`
