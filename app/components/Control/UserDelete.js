import React from 'react'
import styled from 'styled-components'
import Avatar from 'components/Common/Avatar'
import Colors from 'appearance/colors'

export default ({ user }) => {
  return (
    <Container>
      <UserHeaderContainer>
        <Avatar uri={user.avatar} status={user.status} size={AVATAR_SIZE} />
        <UserHeaderItems>
          <UserName active={user.status}>{user.fullName}</UserName>
          <UserDescription active={user.status}>{user.role}</UserDescription>
        </UserHeaderItems>
        <UserStatus active={user.status}>{user.status}</UserStatus>
      </UserHeaderContainer>
    </Container>
  )
}

const AVATAR_SIZE = 60

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`

const UserHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`
const UserName = styled.Text`
  font-size: 24px;
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-weight: bold;
  margin-bottom: 5px;
  opacity: ${p => (p.active == 'active' ? 1 : 0.5)};
`
const UserStatus = styled.Text`
  margin-top: 6px;
  font-size: 18px;
  color: ${p => (p.active == 'active' ? Colors.TEXT_RED : Colors.TEXT_BRIGHT_BLUE)};
  font-weight: bold;
  margin-bottom: 5px;
  opacity: ${p => (p.active == 'active' ? 1 : 0.5)};
`

const UserDescription = styled.Text`
  font-size: 13px;
  color: ${Colors.TEXT_DARK_PURPLE};
`

const UserHeaderItems = styled.View`
  margin-left: 23px;
  margin-right: 10px;
`
