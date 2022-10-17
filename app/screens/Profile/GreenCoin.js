import React from 'react'
import { useDispatch } from 'react-redux'
import PageContainer from 'components/Page/PageContainer'
import TopUserInfo from 'components/MyProfile/TopUserInfo'
import { TopPlaceholder } from 'components/MyProfile/MyProfilePlaceholder'
import GreenCoinsPageTabs from 'components/MyProfile/GreenCoinsPageTabs'
import { useUserId, useUserIsMentor } from 'store/user/user.uses'
import MentorProfile from 'screens/Profile/MentorProfile'
import { openHomePage } from 'services/navigation'

const GreenCoin = ({ navigation }) => {
  const dispatch = useDispatch()
  const userId = useUserId()
  const userIsMentor = useUserIsMentor()

  if (!userId) {
    return null
  }

  if (userIsMentor) {
    return <MentorProfile navigation={navigation} />
  }

  const onGoBack = () => {
    dispatch(openHomePage(navigation))
  }

  const renderPlaceholder = () => {
    return <TopPlaceholder />
  }

  return (
    <PageContainer
      title="My NFT"
      paddingTop
      titleBack
      hideTopHeader
      navigation={navigation}
      noPadding
      onGoBack={onGoBack}
      renderPlaceholder={renderPlaceholder}
    >
      <TopUserInfo navigation={navigation} />
      <GreenCoinsPageTabs navigation={navigation} />
    </PageContainer>
  )
}

GreenCoin.navigationOptions = screenProps => {
  return { headerShown: false }
}

export default GreenCoin
