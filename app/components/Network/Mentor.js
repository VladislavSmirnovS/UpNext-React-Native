import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Spacer from 'components/Page/Spacer'
import Avatar from 'components/Common/Avatar'
import MentorAvatarWithFlag from 'components/Network/MentorAvatarWithFlag'
import Card from 'components/Control/Card'
import Texts from 'appearance/texts'
import { openLobbyCurrentMentorPage } from 'services/navigation'
import { getUserFullName, getUserId } from 'utils/user'

export default ({ navigation, member }) => {
  const dispatch = useDispatch()

  const { age, company_avatar, company_avatar_small, company_name } = member

  const onPress = () => {
    const params = { user_id: getUserId(member) }
    dispatch(openLobbyCurrentMentorPage(navigation, params))
  }

  return (
    <Card>
      <TouchableOpacity onPress={onPress}>
        <Row>
          <View>
            <MentorAvatarWithFlag
              item={member}
              size={AVATAR_SIZE}
              borderRadius={MENTOR_BORDER_RADIUS}
            />
          </View>
          <Spacer w={10} />

          <Centered>
            <Texts.TitleText numberOfLines={1}>{getUserFullName(member)}</Texts.TitleText>
            {age ? <Texts.TitleText>{age}</Texts.TitleText> : null}
          </Centered>

          <View>
            <Avatar
              uri={company_avatar_small || company_avatar}
              size={AVATAR_SIZE}
              id="x"
              firsName={company_name}
              borderRadius={AVATAR_BORDER_RADIUS}
            />
          </View>
        </Row>
      </TouchableOpacity>
    </Card>
  )
}

const AVATAR_SIZE = 80
const AVATAR_BORDER_RADIUS = 150
const MENTOR_BORDER_RADIUS = 40

const Row = styled.View`
  flex-direction: row;
`

const Centered = styled.View`
  justify-content: center;
  align-items: center;
  flex: 2;
`

const View = styled.View`
  flex: 1;
`

const TouchableOpacity = styled.TouchableOpacity``
