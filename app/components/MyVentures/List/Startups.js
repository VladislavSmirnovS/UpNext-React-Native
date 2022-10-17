import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import MyVenturePlaceholder from 'components/MyVentures/MyVenturePlaceholder'
import VideoStatsModal from 'components/Stats/VideoStatsModal'
import StartupCard from 'components/MyVentures/List/StartupCard'
import FlatList from 'components/Control/FlatList'
import PlusButton from 'components/MyVentures/PlusButton'
import { getUserTeams } from 'store/user/user.actions'
import { getTeamsOptions, addNewTeam, getTeam } from 'store/team/team.actions'
import { useTeamsOptions } from 'store/team/team.uses'
import Styles from 'appearance/styles'
import { openEditStartupPage } from 'services/navigation'
import StartProject from '../StartProject'
import Colors from 'root/app/appearance/colors'
import { Animated } from 'react-native'
import AppHeader from 'root/app/navigation/AppHeader'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const teamsOptions = useTeamsOptions()

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoadingNewTeam, setIsLoadingNewTeam] = useState(false)

  const [isShowStats, setIsShowStats] = useState(false)
  const [selectedItem, setSelectedItem] = useState()
  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 100)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  })

  useEffect(() => {
    if (!teamsOptions?.length) {
      setIsLoading(true)
      getOptions(hideLoading)
    }
  }, [teamsOptions])

  const hideLoading = () => {
    setIsLoading(false)
  }

  const onOpenStatsPress = item => {
    setIsShowStats(true)
    setSelectedItem(item)
  }

  const onCloseStatsPress = item => {
    setIsShowStats(false)
  }

  const onAddNewStartup = () => {
    setIsLoadingNewTeam(true)
    dispatch(addNewTeam(hideLoadingNewTeam))
  }

  const hideLoadingNewTeam = newTeam => {
    setIsLoadingNewTeam(false)
    dispatch(getTeam(newTeam?.id))
    dispatch(openEditStartupPage(navigation))
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    dispatch(
      getUserTeams(() => {
        getOptions(hideRefreshLoading)
      }),
    )
  }

  const hideRefreshLoading = () => {
    setIsRefreshing(false)
  }

  const getOptions = callback => {
    dispatch(getTeamsOptions(callback))
  }

  const renderItem = ({ item }) => {
    return (
      <StartupCard
        key={item?.id}
        team={item}
        navigation={navigation}
        onOpenStatsPress={onOpenStatsPress}
      />
    )
  }

  const renderFooterComp = () => {
    return (
      <AddButtonContainer>
        <PlusButton
          onPress={onAddNewStartup}
          size={PLUS_SIZE}
          disabled={isLoadingNewTeam}
          background="transparent"
          iconColor={Colors.TEXT_BRIGHT_BLUE}
        />
      </AddButtonContainer>
    )
  }
  const onScroll = e => {
    scrollY.setValue(e?.nativeEvent?.contentOffset.y)
  }

  return (
    <Container>
      {isLoading ? (
        <MyVenturePlaceholder />
      ) : teamsOptions?.length ? (
        <>
          <Animated.View
            style={{
              transform: [{ translateY: translateY }],
              zIndex: 200,
              position: 'absolute',
            }}
          >
            <ContainerForHeader>
              <AppHeader />
            </ContainerForHeader>
          </Animated.View>
          <FlatList
            data={teamsOptions}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            keyExtractor={getKey}
            renderItem={renderItem}
            ListHeaderComponent={renderFooterComp}
            shouldComponentUpdate={shouldComponentUpdate}
            noPadding
            onScroll={onScroll}
            paddingTop="80px"
          />
          <VideoStatsModal
            isVisible={isShowStats}
            item={selectedItem}
            onClose={onCloseStatsPress}
            navigation={navigation}
          />
        </>
      ) : (
        <StartProject onPress={onAddNewStartup} />
      )}
    </Container>
  )
}

const getKey = item => {
  return item?.id
}

const shouldComponentUpdate = () => {
  return false
}

export const AVATAR_SIZE = 80
const PLUS_SIZE = 38

const Container = styled.View`
  width: 100%;
  flex: 1;
`
const ContainerForHeader = styled.View`
  padding: 0 20px;
  padding-top: 45px;
  background-color: #fff;
  min-width: 100%;
`

const AddButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 12px 12px 0 0;
`
