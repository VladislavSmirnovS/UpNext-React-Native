import React from 'react'
import styled from 'styled-components'
import ScrollPadderForFeed from 'components/Page/ScrollPadderForFeed'
import UserImageSelector from 'components/MyProfile/UserImageSelector'
import Form from 'components/MyProfile/Form'
import Spacer from 'components/Page/Spacer'
import Bottom from 'components/MentorProfile/Bottom'

export default ({ navigation }) => {
  const renderBottom = () => {
    return <Bottom navigation={navigation} />
  }

  return (
    <ScrollPadderForFeedStyled>
      <UserImageSelector navigation={navigation} />
      <Spacer h={145} />
      <Form isNameOneLine renderBottom={renderBottom} />
      <Spacer w={10} />
    </ScrollPadderForFeedStyled>
  )
}

const ScrollPadderForFeedStyled = styled(ScrollPadderForFeed)`
  padding-bottom: 15px;
`
