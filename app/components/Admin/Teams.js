import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'
import PlayButton from 'components/Video/PlayButton'
import FlatList from 'components/Control/FlatList'
import SearchInput from 'components/Network/SearchInput'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import TeamAvatarLobbyBtn from 'components/Common/TeamAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import Loader from 'components/Page/Loader'
import Carousel from 'components/Control/Carousel'
import Player from 'components/Video/Player'
import Switch from 'components/Startup/Switch'
import { returnAllCoinsFromActivity } from 'store/feed/feed.actions'
import { getDate, getShortTimestamp } from 'services/utils'
import {
  getTeamsList,
  setTeamsSearch,
  setTeamsListPage,
  updateTeamPermissions,
  setIsLoading,
} from 'store/admin/admin.actions'
import {
  useTeamsList,
  useTeamsListCount,
  useTeamsSearch,
  useTeamsListPagination,
  useIsLoading,
} from 'store/admin/admin.uses'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { getTeamAvatarProps } from 'utils/team'
import { getUserAvatarProps, getFullName, getUserId, getUserAvatar } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoading = useIsLoading()

  const teams = useTeamsList()
  const teamsCount = useTeamsListCount()
  const teamsPagination = useTeamsListPagination()
  const search = useTeamsSearch()
  const [teamsIsLoading, setTeamsIsLoading] = useState(false)

  useEffect(() => {
    if (!teams) {
      showLoading()
      getNewTeams(0)
    }
  }, [])

  const showLoading = () => {
    dispatch(setIsLoading(true))
  }

  const hideLoading = () => {
    dispatch(setIsLoading(false))
  }

  const getNewTeams = (page, search) => {
    setTeamsIsLoading(true)
    dispatch(
      getTeamsList(page, teamsPagination.size, search, () => {
        setTeamsIsLoading(false)
        hideLoading()
      }),
    )
  }

  const onChangeText = value => {
    dispatch(setTeamsSearch(value))
  }

  const onSearch = value => {
    dispatch(setTeamsListPage(0))
    getNewTeams(0, value)
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onScroll = () => {
    if (!isEnd() && !teamsIsLoading) {
      onChangePage(teamsPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewTeams(page, search)
    dispatch(setTeamsListPage(page))
  }

  const isEnd = () => {
    return teams ? teamsCount === teams?.length : true
  }

  const renderItem = ({ item }) => {
    return <Team navigation={navigation} team={item} />
  }

  const renderFooterComp = () => {
    return !isEnd() ? <Loader /> : null
  }

  return isLoading ? null : (
    <>
      <Container>
        <Texts.SubtitleText>All count: {teamsCount}</Texts.SubtitleText>
      </Container>
      <SearchInput
        search={search}
        onChangeText={onChangeText}
        onSearch={onSearch}
        placeholder="search"
      />

      <FlatList
        data={teams}
        onRefresh={onRefresh}
        refreshing={false}
        onEndReached={onScroll}
        onEndReachedThreshold={0.2}
        keyExtractor={getKey}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        ListFooterComponent={renderFooterComp}
        shouldComponentUpdate={shouldComponentUpdate}
        getItemLayout={getItemLayout}
      />
    </>
  )
}

const CARD_HEIGHT = 530

const getItemLayout = (data, index) => ({
  length: CARD_HEIGHT,
  offset: CARD_HEIGHT * index,
  index,
})

const Team = ({ navigation, team }) => {
  const dispatch = useDispatch()

  const createdDate = getDate(team.created)
  const createdDateAgo = getShortTimestamp(team.created)
  const updatedDate = getDate(team.updated)
  const updatedDateAgo = getShortTimestamp(team.updated)

  const renderItem = ({ item }) => {
    return (
      <UserAvatarLobbyBtn
        {...getUserAvatarProps(item)}
        size={AVATAR_SIZE}
        navigation={navigation}
      />
    )
  }

  const onChangePermission = () => {
    let permissions = { ...team?.permissions }
    if (permissions?.disable) {
      permissions.disable = false
    } else {
      permissions.lobby = false
      permissions.disable = true
      dispatch(returnAllCoinsFromActivity(team))
    }
    dispatch(updateTeamPermissions(team?.id, permissions, team?.pain_video))
  }

  return (
    <>
      <MemberBox style={{ height: 530 }}>
        <Row>
          <TeamAvatarLobbyBtn
            {...getTeamAvatarProps(team)}
            size={TEAM_AVATAR_SIZE}
            navigation={navigation}
          />
          <Spacer w={10} />
          <View>
            <Texts.TitleText>
              <Bold>{getFullName(team?.id, team?.name)}</Bold>
            </Texts.TitleText>
          </View>
        </Row>
        <Texts.SubtitleText>
          <Bold>Created:</Bold> {createdDate} ({createdDateAgo})
        </Texts.SubtitleText>

        <Texts.SubtitleText>
          <Bold>Updated:</Bold> {updatedDate} ({updatedDateAgo})
        </Texts.SubtitleText>

        <Texts.SubtitleText>
          <Bold>Members:</Bold>
        </Texts.SubtitleText>
        <Carousel
          options={team?.new_team_members}
          renderItem={renderItem}
          itemWidth={40}
          maxWidth={width - 30}
        />
        <Spacer h={10} />
        <TeamPlayer item={team} />
        <Switch
          key="disable"
          label="Enable"
          value={!team?.permissions?.disable}
          onChange={onChangePermission}
        />
      </MemberBox>
      <Line />
    </>
  )
}

export const TeamPlayer = ({ item, height }) => {
  const [isPlay, setIsPlay] = useState(false)

  const onPlay = () => {
    setIsPlay(true)
  }

  return (
    <PlayerWrapper height={height}>
      {isPlay ? (
        <Player
          url={item?.pain_video}
          isPlay={isPlay}
          onTogglePlay={setIsPlay}
          isContain
          withPlayButton
        />
      ) : (
        <TouchableOpacity onPress={onPlay}>
          <FastImage
            source={{ uri: getUserAvatar(item) }}
            style={{ height: '100%', width: '100%' }}
          />
          <PlayButton isPlay={false} />
        </TouchableOpacity>
      )}
    </PlayerWrapper>
  )
}

const TEAM_AVATAR_SIZE = 40
const AVATAR_SIZE = 40
const { width } = Dimensions.get('window')

const getKey = item => {
  return getUserId(item)
}

const ListEmptyComponent = () => {
  return <CenteredText>no result</CenteredText>
}

const shouldComponentUpdate = () => {
  return false
}

const Bold = styled(Texts.SubtitleText)`
  font-weight: bold;
`

const Container = styled.View`
  padding: ${Styles.PAGE_PADDING};
  padding-bottom: 0;
`

const CenteredText = styled(Texts.TitleText)`
  text-align: center;
`

const MemberBox = styled.View`
  padding: 20px 0;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.COMMON_GREY};
`

const TouchableOpacity = styled.TouchableOpacity``

const View = styled.View`
  flex-wrap: wrap;
`

const PlayerWrapper = styled.View`
  width: 100%;
  height: ${p => p.height || 300}px;
`
