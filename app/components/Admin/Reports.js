import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FlatList from 'components/Control/FlatList'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import TeamAvatarLobbyBtn from 'components/Common/TeamAvatarLobbyBtn'
import SearchInput from 'components/Network/SearchInput'
import Spacer from 'components/Page/Spacer'
import Loader from 'components/Page/Loader'
import Switch from 'components/Startup/Switch'
import { TeamPlayer } from 'components/Admin/Teams'
import { returnAllCoinsFromActivity } from 'store/feed/feed.actions'
import { getDate, getShortTimestamp } from 'services/utils'
import {
  getReportsList,
  setReportsListPage,
  setReportsSearch,
  updateReportPermissions,
  setIsLoading,
} from 'store/admin/admin.actions'
import {
  useReportsList,
  useReportsListCount,
  useReportsSearch,
  useReportsListPagination,
  useIsLoading,
} from 'store/admin/admin.uses'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { getTeamAvatarProps } from 'utils/team'
import { getUserAvatarProps, getFullName, getUserFullName, getUserId } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoading = useIsLoading()

  const reports = useReportsList()
  const reportsCount = useReportsListCount()
  const reportsPagination = useReportsListPagination()
  const search = useReportsSearch()
  const [reportsIsLoading, setReportsIsLoading] = useState(false)

  useEffect(() => {
    if (!reports) {
      showLoading()
      getNewReports(0)
    }
  }, [])

  const showLoading = () => {
    dispatch(setIsLoading(true))
  }

  const hideLoading = () => {
    dispatch(setIsLoading(false))
  }

  const getNewReports = (page, search) => {
    setReportsIsLoading(true)
    dispatch(
      getReportsList(page, reportsPagination.size, search, () => {
        setReportsIsLoading(false)
        hideLoading()
      }),
    )
  }

  const onChangeText = value => {
    dispatch(setReportsListPage(0))
    dispatch(setReportsSearch(value))
    getNewReports(0, value)
  }

  const onSearch = value => {
    dispatch(setReportsListPage(0))
    getNewReports(0, value)
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onScroll = () => {
    if (!isEnd() && !reportsIsLoading) {
      onChangePage(reportsPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewReports(page, search)
    dispatch(setReportsListPage(page))
  }

  const isEnd = () => {
    return reports ? reportsCount === reports.length : true
  }

  const renderItem = ({ item }) => {
    return <Team navigation={navigation} item={item} />
  }

  const renderFooterComp = () => {
    return !isEnd() ? <Loader /> : null
  }

  return isLoading ? null : (
    <>
      <Container>
        <Texts.SubtitleText>All count: {reportsCount}</Texts.SubtitleText>
      </Container>
      <SearchInput
        search={search}
        onChangeText={onChangeText}
        onSearch={onSearch}
        placeholder="search"
      />

      <FlatList
        data={reports}
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

const CARD_HEIGHT = 500

const getItemLayout = (data, index) => ({
  length: CARD_HEIGHT,
  offset: CARD_HEIGHT * index,
  index,
})

const Team = ({ navigation, item }) => {
  const dispatch = useDispatch()

  const { report_team, user, created, report } = item
  const createdDate = getDate(created)
  const createdDateAgo = getShortTimestamp(created)

  const onChangePermission = () => {
    let permissions = { ...report_team?.permissions }
    if (permissions?.disable) {
      permissions.disable = false
    } else {
      permissions.lobby = false
      permissions.disable = true
      dispatch(returnAllCoinsFromActivity(report_team))
    }
    dispatch(updateReportPermissions(report_team?.id, permissions, report_team?.pain_video))
  }

  return (
    <>
      <MemberBox>
        <ReportedUser user={user} navigation={navigation} />

        <Texts.SubtitleText>
          <Bold>Created:</Bold> {createdDate} ({createdDateAgo})
        </Texts.SubtitleText>

        <Texts.SubtitleText>
          <Bold>Report:</Bold> {report}
        </Texts.SubtitleText>

        <Spacer h={10} />

        <Row>
          <TeamAvatarLobbyBtn
            {...getTeamAvatarProps(report_team)}
            size={TEAM_AVATAR_SIZE}
            navigation={navigation}
          />
          <Spacer w={10} />
          <View>
            <Texts.TitleText>
              <Bold>{getFullName(report_team?.id, report_team?.name)}</Bold>
            </Texts.TitleText>
          </View>
        </Row>

        <Spacer h={10} />
        <TeamPlayer item={report_team} />
        <Switch
          key="disable"
          label="Enable"
          value={!report_team?.permissions?.disable}
          onChange={onChangePermission}
        />
      </MemberBox>
      <Line />
    </>
  )
}

const ReportedUser = ({ user, navigation }) => {
  return (
    <Row>
      <UserAvatarLobbyBtn
        {...getUserAvatarProps(user)}
        size={AVATAR_SIZE}
        navigation={navigation}
      />
      <Spacer w={10} />
      <View>
        <Texts.TitleText>
          <Bold>{getUserFullName(user)}</Bold>
        </Texts.TitleText>
      </View>
    </Row>
  )
}

const TEAM_AVATAR_SIZE = 40
const AVATAR_SIZE = 40

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

const View = styled.View`
  flex-wrap: wrap;
`

const PlayerWrapper = styled.View`
  width: 100%;
  height: 300px;
`
