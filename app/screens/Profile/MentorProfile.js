import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import Tabs from 'components/MentorProfile/Tabs'
import { openHomePage } from 'services/navigation'
import { useUser } from 'store/user/user.uses'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useUser()

  const onGoBack = () => {
    dispatch(openHomePage(navigation))
  }

  if (!user) {
    return null
  }

  return (
    <>
      <PageContainer
        title="My Profile"
        hideTopHeader
        navigation={navigation}
        noPadding
        onGoBack={onGoBack}
      >
        <Content>
          <Tabs navigation={navigation} />
        </Content>
      </PageContainer>
    </>
  )
}

const Content = styled.View`
  width: 100%;
  height: 100%;
`
