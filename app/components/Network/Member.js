import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import Spacer from 'components/Page/Spacer'
import Avatar from 'components/Common/Avatar'
import SeparateLine from 'components/Control/SeparateLine'
import Tag from 'components/MyProfile/Tag'
import BlueCard from 'components/MyProfile/BlueCard'
import Buttons from 'components/Network/Buttons'
import Texts from 'appearance/texts'
import { getUserAvatarProps, getUserFullName } from 'utils/user'
import { useDispatch } from 'react-redux'
import { openLobbyCurrentMemberPage } from 'services/navigation'

export default ({ navigation, member }) => {
  const { age, school_country, interest_tags } = member
  const dispatch = useDispatch()

  const getAdditionalText = () => {
    return age && school_country ? age + ', ' + school_country : age || school_country
  }

  const onPress = () => {
    const params = { user_id: member.id }
    dispatch(openLobbyCurrentMemberPage(navigation, params))
  }

  return (
    <BlueCard wrapPadding="10px">
      <Row>
        <TouchableOpacity onPress={onPress} navigation={navigation}>
          <Avatar {...getUserAvatarProps(member)} size={AVATAR_SIZE} />
        </TouchableOpacity>
        <Spacer w={20} />

        <View>
          <Texts.BlueHeaderText numberOfLines={1} style={HEADER_TEXT_STYLE}>
            {getUserFullName(member)}
          </Texts.BlueHeaderText>
          <Row>
            <Texts.BoldDarkPurpleText>{member.check_founder_teenvestor}</Texts.BoldDarkPurpleText>
            <Spacer w={7} />
            <Texts.DarkPurpleText>{getAdditionalText()}</Texts.DarkPurpleText>
          </Row>
        </View>
      </Row>
      <Spacer h={19} />
      <Row>
        <View>
          <Texts.BoldPurpleSubTitleText>{member.age}</Texts.BoldPurpleSubTitleText>
          <Texts.PurpleSubTitleText>Founder</Texts.PurpleSubTitleText>
        </View>
        <Spacer w={14} />
        <View>
          <Texts.BoldPurpleSubTitleText>{member.age}</Texts.BoldPurpleSubTitleText>
          <Texts.PurpleSubTitleText>Investor</Texts.PurpleSubTitleText>
        </View>
        <Spacer w={16} />
        <View>
          <Texts.BoldPurpleSubTitleText>{member.age}</Texts.BoldPurpleSubTitleText>
          <Texts.PurpleSubTitleText>Contacts</Texts.PurpleSubTitleText>
        </View>
        <Spacer w={35} />
        <Buttons navigation={navigation} member={member} withStartupBtns />
      </Row>
    </BlueCard>
  )
}

const AVATAR_SIZE = 60

const { width } = Dimensions.get('window')
const paddings = 2 * 5 + 2 * 10
const spacers = 10
const HEADER_TEXT_STYLE = {
  maxWidth: width - paddings - AVATAR_SIZE - spacers - 10,
  paddingTop: 10,
}

const Row = styled.View`
  flex-direction: row;
  align-items:center;
`

const View = styled.View`
max-width: 220px;`

const RowWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
const TouchableOpacity = styled.TouchableOpacity``
