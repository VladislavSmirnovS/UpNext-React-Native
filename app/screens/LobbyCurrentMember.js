import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Member from 'components/Network/Member'
import UserProfile from 'components/Network/UserProfile'
import PageContainer from 'components/Page/PageContainer'
import api from 'services/api'
import { handleError } from 'services/logger'

export default ({ navigation }) => {
  const { user_id } = navigation.state.params

  const [member, setMember] = useState(null)

  useEffect(() => {
    api
      .getMember(user_id)
      .then(res => setMember(res.data))
      .catch(error => handleError(error))
  }, [user_id])

  return (
    <PageContainer
      title="User"
      navigation={navigation}
      hideTopHeader
      titleBack
      isLoading={!member}
    >
      <View>{member ? <UserProfile navigation={navigation} member={member} /> : null}</View>
  
    </PageContainer>
  )
}

const View = styled.View`
  width: 100%;
  height: 100%;
`
