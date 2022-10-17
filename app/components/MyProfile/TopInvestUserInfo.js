import React from 'react'
import styled from 'styled-components'
import UserInfo from 'components/MyProfile/UserInfo'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import BackButton from 'components/Video/BackButton'
import Spacer from 'components/Page/Spacer'
import Styles from 'appearance/styles'
import Colors from 'appearance/colors'
import { getUserAvatarProps } from 'utils/user'

export default ({ navigation, member }) => {
  return (
    <Container>
      <Row>
        <BackButton navigation={navigation} color={Colors.BLACK} position="relative" />
      </Row>
      <Spacer w={5} />
      <Row>
        <UserAvatarLobbyBtn
          {...getUserAvatarProps(member)}
          size={AVATAR_SIZE}
          navigation={navigation}
        />
        <Spacer w={5} />
        <UserInfo user={member} subTitle="Investments' list" />
      </Row>
      <Spacer w={10} />
    </Container>
  )
}

const AVATAR_SIZE = 80

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${Styles.PAGE_PADDING};
  align-items: center;
  width: 100%;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`
