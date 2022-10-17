import React from 'react'
import PageContainer from 'components/Page/PageContainer'
import Spacer from 'components/Page/Spacer'
import Startups from 'components/MyVentures/List/Startups'
import { useUserIsMentor, useUserInitialized } from 'store/user/user.uses'
import useJoinTeam from 'components/MyVentures/hooks/useJoinTeam'
import Texts from 'appearance/texts'

const StartUp = ({ navigation }) => {
  const isUserInitialized = useUserInitialized()
  const userIsMentor = useUserIsMentor()

  useJoinTeam(navigation)

  if (isUserInitialized && userIsMentor) {
    return null
  }

  return (
    <PageContainer navigation={navigation} noPadding hideTopHeader>
      <Startups navigation={navigation} />
    </PageContainer>
  )
}

StartUp.navigationOptions = screenProps => {
  return { headerShown: false }
}
export default StartUp
