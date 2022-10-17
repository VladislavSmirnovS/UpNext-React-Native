import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Dimensions, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import NetworkShareButton from 'components/Network/NetworkShareButton'
import ButtonOuter from 'components/Control/ButtonOuter'
import Spacer from 'components/Page/Spacer'
import Carousel from 'components/Control/Carousel'
import AvatarButton from 'components/Common/AvatarBtn'
import { NetworkPlaceholder } from 'components/MyProfile/MyProfilePlaceholder'
import {
  getFriendsWithInvestments,
  setFriendsWithInvestmentsPage,
} from 'store/network/network.actions'
import {
  useFriendsWithInvestments,
  useFriendsWithInvestmentsCount,
  useFriendsWithInvestmentsPagination,
} from 'store/network/network.uses'
import { openNetworkWithDefTab, openUserInvestProfilePage } from 'services/navigation'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { getUserAvatarProps, getUserId } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()

  const friendsWithInvestments = useFriendsWithInvestments()
  const friendsWithInvestmentsCount = useFriendsWithInvestmentsCount()
  const friendsWithInvestmentsPagination = useFriendsWithInvestmentsPagination()
  const [friendsWithInvestmentsIsLoading, setFriendsWithInvestmentsIsLoading] = useState(false)

  useEffect(() => {
    if (!friendsWithInvestments) {
      getNewFriendsWithInvestments(0)
    }
  }, [])

  const getNewFriendsWithInvestments = page => {
    setFriendsWithInvestmentsIsLoading(true)
    dispatch(
      getFriendsWithInvestments(page, friendsWithInvestmentsPagination.size, () => {
        setFriendsWithInvestmentsIsLoading(false)
      }),
    )
  }

  const isLoading = () => {
    return !friendsWithInvestments && friendsWithInvestmentsIsLoading
  }

  const isEmpty = () => {
    return !isLoading() && !friendsWithInvestments?.length
  }

  const onEndReached = () => {
    if (!isEnd() && !friendsWithInvestmentsIsLoading) {
      onChangePage(friendsWithInvestmentsPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewFriendsWithInvestments(page)
    dispatch(setFriendsWithInvestmentsPage(page))
  }

  const isEnd = () => {
    return friendsWithInvestments
      ? friendsWithInvestmentsCount === friendsWithInvestments.length
      : true
  }

  return (
    <Container>
      <Row>
        <MyNetworkTitle>My Network</MyNetworkTitle>
        {isEmpty() ? <Texts.WhiteText>No one here yet</Texts.WhiteText> : null}
      </Row>
      {isLoading() ? (
        <NetworkPlaceholder />
      ) : (
        <>
          {isEmpty() ? <EmptyNetwork navigation={navigation} /> : null}
          {friendsWithInvestments?.length ? (
            <MyNetwork
              navigation={navigation}
              friends={friendsWithInvestments}
              onEndReached={onEndReached}
              isLoading={friendsWithInvestmentsIsLoading}
            />
          ) : null}
        </>
      )}
    </Container>
  )
}

const EmptyNetwork = ({ navigation }) => {
  const dispatch = useDispatch()

  const onDiscoverPress = () => {
    const params = { defaultActiveTab: 0 } // Founders
    dispatch(openNetworkWithDefTab(navigation, params))
  }

  return (
    <>
      <Spacer h={30} />
      <Row>
        <NetworkShareButton isOuter color={Colors.WHITE} text="Invite your homies" />

        <ButtonOuter
          height={30}
          width="160px"
          text="Discover founders"
          onPress={onDiscoverPress}
          color={Colors.WHITE}
        />
      </Row>
    </>
  )
}

const MyNetwork = ({ navigation, friends, onEndReached, isLoading }) => {
  const dispatch = useDispatch()

  const renderItem = ({ item }) => {
    const onAvatarPress = () => {
      const params = { user_id: getUserId(item) }
      dispatch(openUserInvestProfilePage(navigation, params))
    }

    return (
      <>
        <AvatarButton {...getUserAvatarProps(item)} onPress={onAvatarPress} size={AVATAR_SIZE} />
        {item?.like_count ? <InvestmentCount count={item?.like_count} /> : null}
      </>
    )
  }

  return (
    <>
      <Spacer h={10} />
      <Row>
        <Carousel
          options={friends}
          renderItem={renderItem}
          itemWidth={60}
          maxWidth={width - 30}
          onEndReached={onEndReached}
        />
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : null}
      </Row>
    </>
  )
}

const InvestmentCount = ({ count }) => {
  return (
    <InvestmentCountWrapper>
      <Texts.LoginTermsText>{count}</Texts.LoginTermsText>
    </InvestmentCountWrapper>
  )
}
const AVATAR_SIZE = 60

const InvestmentCountWrapper = styled.View`
  position: absolute;
  background: ${Colors.TEXT_RED};
  padding: 5px;
  border-radius: 20px;
  width: 23px;
  height: 23px;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 5;
`

const { width } = Dimensions.get('window')

const Container = styled.View`
  background: ${Colors.WHITE};
  padding: 20px;
  height: 140px;
  width: 100%;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`

const MyNetworkTitle = styled(Texts.BlueHeaderText)`
  line-height: 25px;
`
