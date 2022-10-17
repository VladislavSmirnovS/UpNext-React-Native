import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FlatList from 'components/Control/FlatList'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import SearchInput from 'components/Network/SearchInput'
import Spacer from 'components/Page/Spacer'
import Texts from 'appearance/texts'
import Loader from 'components/Page/Loader'
import Button from 'components/Control/Button'
import { getDate, getShortTimestamp } from 'services/utils'
import {
  getCodesList,
  setCodesListPage,
  setCodesSearch,
  setIsLoading,
} from 'store/admin/admin.actions'
import {
  useCodesList,
  useCodesListCount,
  useCodesListPagination,
  useCodesSearch,
  useIsLoading,
} from 'store/admin/admin.uses'
import { logout, loginWithCode } from 'store/auth/auth.actions'
import { setBranchObject } from 'store/user/user.actions'
import { setAppAlert } from 'store/app/app.actions'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'
import { getUserAvatarProps, getUserFullName, getUserId } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoading = useIsLoading()

  const members = useCodesList()
  const membersCount = useCodesListCount()
  const membersPagination = useCodesListPagination()
  const search = useCodesSearch()
  const [membersIsLoading, setMembersIsLoading] = useState(false)

  useEffect(() => {
    if (!members) {
      showLoading()
      getNewMembers(0)
    }
  }, [])

  const showLoading = () => {
    dispatch(setIsLoading(true))
  }

  const hideLoading = () => {
    dispatch(setIsLoading(false))
  }

  const getNewMembers = (page, search) => {
    setMembersIsLoading(true)
    dispatch(
      getCodesList(page, membersPagination.size, search, () => {
        setMembersIsLoading(false)
        hideLoading(false)
      }),
    )
  }

  const onChangeText = value => {
    dispatch(setCodesSearch(value))
  }

  const onSearch = value => {
    dispatch(setCodesListPage(0))
    getNewMembers(0, value)
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onScroll = () => {
    if (!isEnd() && !membersIsLoading) {
      onChangePage(membersPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewMembers(page, search)
    dispatch(setCodesListPage(page))
  }

  const isEnd = () => {
    return members ? membersCount === members.length : true
  }

  const renderItem = ({ item }) => {
    return <Member navigation={navigation} item={item} />
  }

  const renderFooterComp = () => {
    return !isEnd() ? <Loader /> : null
  }

  return isLoading ? null : (
    <>
      <Container>
        <Texts.SubtitleText>All count: {membersCount}</Texts.SubtitleText>
      </Container>
      <SearchInput
        search={search}
        onChangeText={onChangeText}
        onSearch={onSearch}
        placeholder="search"
      />

      <FlatList
        data={members}
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

const CARD_HEIGHT = 150

const getItemLayout = (data, index) => ({
  length: CARD_HEIGHT,
  offset: CARD_HEIGHT * index,
  index,
})

const Member = ({ navigation, item }) => {
  const dispatch = useDispatch()

  const onLoginWithOtherUser = async () => {
    if (item.code) {
      await dispatch(logout())
      onNewLogin()
    } else {
      dispatch(showAdminLoginError())
    }
  }

  const onNewLogin = () => {
    resetBranchData()
    dispatch(loginWithCode(item.code, navigation))
  }

  const resetBranchData = () => {
    dispatch(setBranchObject(null))
  }

  const date = getDate(item.last_activity)
  const dateAgo = getShortTimestamp(item.last_activity)

  return (
    <>
      <MemberBox style={{ height: CARD_HEIGHT }}>
        <Row>
          <UserAvatarLobbyBtn
            {...getUserAvatarProps(item)}
            size={AVATAR_SIZE}
            navigation={navigation}
          />
          <Spacer w={10} />
          <Texts.SubtitleText>
            <Bold>{getUserFullName(item)}</Bold>
          </Texts.SubtitleText>
          <SpaceDevider />
          <Button text="Login" height={26} width="80px" onPress={onLoginWithOtherUser} />
        </Row>
        <Texts.SubtitleText>
          <Bold>Country/ Region:</Bold> {item.school_country}
        </Texts.SubtitleText>
        <Texts.SubtitleText>
          <Bold>Age:</Bold> {item.age}
        </Texts.SubtitleText>
        <Texts.SubtitleText>
          <Bold>Gender:</Bold> {item.gender}
        </Texts.SubtitleText>
        <Texts.SubtitleText>
          <Bold>Last activity:</Bold> {date} ({dateAgo})
        </Texts.SubtitleText>
      </MemberBox>
      <Line />
    </>
  )
}

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

const showAdminLoginError = () =>
  setAppAlert({
    text: 'This user has not code. You can not use this accaut for login',
    okText: 'Got it',
    onConfirm: () => {},
  })

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
  justify-content: flex-end;
`

const SpaceDevider = styled.View`
  flex: 1;
`

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.COMMON_GREY};
`
