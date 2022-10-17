import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Linking } from 'react-native'
import MentorAvatarWithFlag from 'components/Network/MentorAvatarWithFlag'
import PageContainer from 'components/Page/PageContainer'
import Spacer from 'components/Page/Spacer'
import LinkText from 'components/Control/LinkText'
import ChatButton from 'components/Network/Buttons/ChatButton'
import api from 'services/api'
import { setOverflowAnimation } from 'store/app/app.actions'
import { handleError } from 'services/logger'
import { useUser } from 'store/user/user.uses'
import Texts from 'appearance/texts'
import Images from 'appearance/images'
import sendbird from 'services/sendbird'
import { getUserFullNameWithAge } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const { user_id } = navigation.state.params

  const [member, setMember] = useState(null)

  useEffect(() => {
    api
      .getMember(user_id)
      .then(res => setMember(res.data))
      .catch(error => handleError(error))
  }, [user_id])

  useEffect(() => {
    if (member?.id) {
      sendbird
        .getUserById(member?.id)
        .then(res => setMember({ ...member, is_online: res.is_online }))
        .catch(error => handleError(error))
    }
  }, [member?.id])

  const onStatsPress = () => {
    dispatch(setOverflowAnimation({ name: 'comingSoon', timout: 5000 }))
  }

  const getCompanyNameWithRole = () => {
    const companyName = member?.company_name || ''
    const companyRole = member?.company_role || ''
    const separator = companyName && companyRole ? ', ' : ''

    return `${companyRole}${separator}${companyName}`
  }

  const onOpenCompanyUrl = () => {
    openUrl(member?.company_url)
  }

  return (
    <PageContainer
      title="Mentor"
      navigation={navigation}
      hideTopHeader
      titleBack
      isLoading={!member}
    >
      {member ? (
        <>
          <Row>
            <MentorAvatarWithFlag item={member} size={AVATAR_SIZE} borderRadius={AVATAR_RADIUS} />
          </Row>
          <Spacer h={10} />

          <Row>
            <Texts.BoldTitleText>{getUserFullNameWithAge(member)}</Texts.BoldTitleText>
          </Row>

          <Row>
            <TouchableOpacity onPress={onOpenCompanyUrl}>
              <Texts.TitleText>{getCompanyNameWithRole()}</Texts.TitleText>
            </TouchableOpacity>
          </Row>
        </>
      ) : null}

      <Spacer h={30} />
      {member?.bio ? (
        <View>
          <Texts.TitleText>Bio</Texts.TitleText>
          <LinkText item={{ message: member?.bio }} titleTextEl={Texts.GreyText} />
        </View>
      ) : null}

      <FullSpacer />
      <Row>
        <ChatButton navigation={navigation} member={member} user={user} title="Message" />
        <Spacer w={20} />
        <TouchableOpacity onPress={onStatsPress}>
          <Icon source={Images.stats} resizeMode="contain" />
        </TouchableOpacity>
      </Row>
    </PageContainer>
  )
}

const openUrl = url => {
  Linking.openURL(url).catch(error => handleError(error))
}

const AVATAR_SIZE = 100
const AVATAR_RADIUS = AVATAR_SIZE / 2
const IMAGE_SIZE = 40

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const View = styled.View`
  width: 100%;
`

const FullSpacer = styled.View`
  flex: 1;
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  align-self: center;
`

const TouchableOpacity = styled.TouchableOpacity``
