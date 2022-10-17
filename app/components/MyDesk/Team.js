import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import TeamMember from 'components/MyDesk/TeamMember'
import { getUserId } from 'utils/user'

export default ({ navigation, members }) => {
  const renderMember = (item, index) => {
    return <TeamMember navigation={navigation} key={getUserId(item)} item={item} />
  }

  return (
    <>
      <Spacer h={10} />
      <WrapRow>
        {members?.length ? members.map(renderMember) : null}
        {members?.length > 1 ? <WrapRowSpacer /> : null}
      </WrapRow>
      <Spacer h={40} />
    </>
  )
}

const WrapRow = styled.View`
  justify-content: space-around;
  display: flex;
  flex-direction: row;
`

const WrapRowSpacer = styled.View`
  width: 150px;
`
