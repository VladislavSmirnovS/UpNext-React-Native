import React from 'react'
import styled from 'styled-components'
import Spacer from 'components/Page/Spacer'
import InviteMemberButton from 'components/MyVentures/Team/InviteMemberButton'
import Texts from 'appearance/texts'

export default ({ size, navigation, roleOpen, roleOptions, updateTeamOpenRole }) => {
  // const onChange = role => {
  //   updateTeamOpenRole(role)
  // }

  return <InviteMemberButton size={size} navigation={navigation} />

  // return (
  //   <Row>
  //     <InviteMemberButton size={size} navigation={navigation} />
  //     <Spacer w={20} />
  //     <Texts.BoldSubHeaderText>Invite</Texts.BoldSubHeaderText>
  //   </Row>
  // )
}

// const Row = styled.View`
//   flex-direction: row;
//   align-items: center;
// `
