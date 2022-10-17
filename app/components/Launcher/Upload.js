import React, { useState } from 'react'
import styled from 'styled-components'
import { Linking } from 'react-native'
import Spacer from 'components/Page/Spacer'
import Button from 'components/Control/Button'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import FullScreenPlayer from 'components/MyVentures/FullScreenPlayer'
import Buttons from 'components/Network/Buttons'
import { SocialLink } from 'components/Launcher/SocialLinks'
import NotCompleteModal from 'components/Startup/NotCompleteModal'
import VerticalEmptyVideoWrapper from 'components/MyVentures/Video/VerticalEmptyVideoWrapper'
import ColoredCard from 'components/Launcher/ColoredCard'
import Header from 'components/Launcher/Header'
import Tag from 'components/MyProfile/Tag'
import { getEmptyFieldsFromObject } from 'services/utils'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { SOCIAL_LINKS_FIELDS } from 'components/Launcher/SocialLinks'
import { getUserAvatarProps, getUserFullName, getUserAgeWithCountry } from 'utils/user'

const UPLOAD_REQUEIRED_FIELDS = [
  {
    field: 'launcher_type',
    errorText: 'Launcher Type',
  },
  {
    field: 'skills',
    errorText: 'Skill',
  },
  {
    field: 'video_url',
    errorText: 'Video Pitch',
  },
  {
    field: 'description',
    errorText: 'Description',
  },
]

export default ({
  navigation,
  item,
  onSave,
  onShowSuccessAnimation,
  withConnectButton,
  onGoBackPress,
}) => {
  const [modalText, setModalText] = useState()

  const onUpload = () => {
    const emptyFields = getEmptyFieldsFromObject(item, UPLOAD_REQUEIRED_FIELDS)
    if (emptyFields?.length) {
      setText(emptyFields)
    } else {
      const callback = res => {
        onShowSuccessAnimation()
        onGoBackPress()
      }
      onSave({ ...item, is_upload: true }, callback)
    }
  }

  const setText = emptyFields => {
    let res = ''
    emptyFields.forEach(item => {
      res += `${item.errorText} \r\n`
    })
    setModalText(res)
  }

  const onCancel = () => {
    setModalText()
  }

  const renderTags = item => {
    return <Tag key={item} text={item} color={Colors.WHITE} />
  }

  const onLinkPress = type => {
    Linking.openURL(item?.[type]).catch(error => handleError(error))
  }

  const isEmptyLinks = () => {
    return SOCIAL_LINKS_FIELDS?.every(field => !item?.[field])
  }

  const renderSocialLinks = () => {
    const links = [
      ...SOCIAL_LINKS_FIELDS?.filter(field => item[field]),
      ...SOCIAL_LINKS_FIELDS?.filter(field => !item[field]),
    ]
    return links?.map(field => (
      <SocialLink type={field} item={item} onPress={onLinkPress} withHide />
    ))
  }

  return (
    <Centered>
      {onSave ? (
        <Button
          text="Upload"
          height={30}
          width={`${100}px`}
          onPress={onUpload}
          disabled={item?.is_upload}
        />
      ) : withConnectButton ? (
        <Buttons navigation={navigation} member={item?.user} />
      ) : null}

      <Spacer h={20} />

      <UserAvatarLobbyBtn
        {...getUserAvatarProps(item?.user)}
        size={AVATAR_SIZE}
        navigation={navigation}
      />

      <Texts.BoldTitleText numberOfLines={1} ellipsizeMode="tail">
        {getUserFullName(item?.user)}
      </Texts.BoldTitleText>

      <Row>
        <Texts.SubtitleText>{item?.user?.check_founder_teenvestor}</Texts.SubtitleText>
        <Spacer w={30} />
        <Texts.SubtitleText>{getUserAgeWithCountry(item?.user)}</Texts.SubtitleText>
      </Row>

      <Wrapper>
        <Header item={item} />

        <VerticalEmptyVideoWrapper>
          <FullScreenPlayer url={item?.video_url} navigation={navigation} borderRadius={0} />
        </VerticalEmptyVideoWrapper>
      </Wrapper>
      <Spacer h={10} />

      <ColoredCard title="Description" backgroundColor={Colors.COMMON_GREY} isOpenned>
        <Text>{item?.description}</Text>
      </ColoredCard>
      <Spacer h={10} />

      <ColoredCard title="Skills" backgroundColor={Colors.RED_ORANGE} isOpenned>
        <RowWrap>{item?.skills?.map(renderTags)}</RowWrap>
      </ColoredCard>
      <Spacer h={10} />

      {withConnectButton && isEmptyLinks() ? null : (
        <ColoredCard title="You can find me at" backgroundColor={Colors.GREEN_BLUE} isOpenned>
          <Spacer h={10} />
          <LinkRow>{renderSocialLinks()}</LinkRow>
        </ColoredCard>
      )}

      <NotCompleteModal
        isVisible={!!modalText}
        modalText={modalText}
        onConfirm={onCancel}
        text="In order to make your launch visible to others."
      />
    </Centered>
  )
}

const AVATAR_SIZE = 100

const Centered = styled.View`
  align-items: center;
`

const Row = styled.View`
  flex-direction: row;
`

const Wrapper = styled.View`
  height: 480px;
`

const Text = styled(Texts.TitleText)`
    ${p => p.textSizes || Texts.sizes.TitleSize}
    color: ${p => p.color || Colors.WHITE};
`

const RowWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

const LinkRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`
