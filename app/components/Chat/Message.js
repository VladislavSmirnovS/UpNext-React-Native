import React, { memo } from 'react'
import styled from 'styled-components'
import { Icon } from 'native-base'
import MessageVideo from 'components/Chat/MessageVideo'
import MessageImage from 'components/Chat/MessageImage'
import MessageAudio from 'components/Chat/MessageAudio'
import Avatar from 'components/Common/Avatar'
import LinkText from 'components/Control/LinkText'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'
import Images from 'appearance/images'
import { validURL } from 'services/utils'

const MSG = ({
  item,
  isMyMsg,
  prevSender,
  isGroupChat,
  prevDate,
  date,
  onLongPress,
  onPress,
  isSelected,
}) => {
  const { _sender, type, message, url, messageType, unreadMembersCount } = item
  const currentSender = _sender?.nickname || messageType
  const getMsgTime = () => {
    const t = new Date(item.createdAt)
    const hr = t.getHours()
    const min = t.getMinutes()
    return `${hr || '00'}:${min || '00'} ${t.getHours() >= 12 ? 'PM' : 'AM'}`
  }

  const getMsgDate = (str, withOutTime) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const t = new Date(str)
    if (withOutTime) {
      return `${days[t.getDay()]}, ${month[t.getMonth()]} ${t.getDate()}`
    }
    return `${days[t.getDay()]}, ${
      month[t.getMonth()]
    } ${t.getDate()}  ${t.getHours()}:${t.getMinutes()}`
  }

  const MsgTime = () => <TimeText>{getMsgTime()}</TimeText>
  const MsgCard = ({ isRight }) => (
    <Card isRight={isRight}>
      {type && type.includes('image') ? <MessageImage item={item} /> : null}
      {type && type.includes('video') ? <MessageVideo item={item} /> : null}
      {type && type.includes('audio') ? <MessageAudio item={item} /> : null}
      {validURL(message) ? (
        <LinkText item={item} />
      ) : message ? (
        <MessageText>{message}</MessageText>
      ) : null}
    </Card>
  )

  const MsgStatus = () =>
    item.isRead ? (
      <Icon
        name="checkmark-done"
        style={{ fontSize: 20, fontWeight: 600, color: Colors.TEXT_BRIGHT_BLUE }}
      />
    ) : item.isDelivered ? (
      <Icon name="checkmark-done" style={{ fontSize: 20 }} />
    ) : (
      <Icon name="checkmark-sharp" style={{ fontSize: 20 }} />
    )

  const handleLongPress = () => {
    onLongPress(item)
  }

  return (
    <>
      {getMsgDate(prevDate, true) !== getMsgDate(date, true) ? (
        <DateBox date={getMsgDate(date)} />
      ) : null}

      <MessageOpacity
        onLongPress={handleLongPress}
        isSelected={isSelected}
        onPress={onPress}
        activeOpacity={1}
      >
        {isMyMsg ? (
          <Container isRight={true}>
            <View isRight={true}>
              <MsgCard isRight={true} />
              <Row>
                <MsgTime />
                {isGroupChat ? null : <MsgStatus />}
              </Row>
            </View>
          </Container>
        ) : (
          <Container>
            <View>
              {prevSender !== currentSender ? <Sender>{currentSender}</Sender> : null}
              <Row style={{ alignItems: 'center' }}>
                <Avatar
                  uri={_sender?.plainProfileUrl || Images.userNoPhoto}
                  style={{ marginRight: AVATAR_MARGIN }}
                  size={AVATAR_SIZE}
                />
                <MsgCard />
              </Row>
              <MsgTime />
            </View>
          </Container>
        )}
      </MessageOpacity>
    </>
  )
}

const DateBox = ({ date }) => (
  <View>
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        height: '50%',
        width: '90%',
      }}
    />
    <Texts.TitleText
      style={{
        alignSelf: 'center',
        paddingHorizontal: 6,
        backgroundColor: '#fff',
        color: Colors.TEXT_GREY,
      }}
    >
      {date}
    </Texts.TitleText>
  </View>
)

const AVATAR_SIZE = 60
const AVATAR_MARGIN = 5

const MessageOpacity = styled.TouchableOpacity`
  width: 100%;
  background-color: ${p => (p.isSelected ? '#1babe34a' : 'transparent')};
  padding: 5px 15px;
`

const MessageText = styled.Text`
  color: ${Colors.TEXT_DARK_PURPLE};
  font-size: 17px;
  letter-spacing: -0.41px;
`

const Container = styled.View`
  align-items: ${p => (p.isRight ? 'flex-end' : 'flex-start')};
  width: 100%;
`

const View = styled.View`
  align-items: ${p => (p.isRight ? 'flex-end' : 'flex-start')};
`

const Card = styled.View`
  flex-direction: column;
  padding: 6px 13.3px;
  border-radius: 8px;
  background-color: ${p => (p.isRight ? '#def8f7' : '#f5f5f5')};
  ${p => (p.isRight ? 'border-bottom-right-radius: 0;' : 'border-bottom-left-radius: 0;')}
  max-width: 80%;
`

const Row = styled.View`
  flex-direction: row;
  width: 100%;
`

const Sender = styled(Texts.ContentText)`
  margin: 10px 0 0 ${AVATAR_SIZE + AVATAR_MARGIN + 5}px;
`

const TimeText = styled(Texts.SmallText)`
  margin: 5px 5px 5px ${AVATAR_SIZE + AVATAR_MARGIN + 5}px;
  color: ${Colors.TEXT_GREY};
`

const arePropsEqual = (prevProps, nextProps) => {
  const isSelectedChanged = prevProps.isSelected === nextProps.isSelected
  return isSelectedChanged
}

export default memo(MSG, arePropsEqual)
