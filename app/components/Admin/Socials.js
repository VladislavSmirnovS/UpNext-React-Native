import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import AlertModal from 'components/Control/AlertModal'
import { CheckBox } from 'components/Control/MultiSelectCheckbox'
import FlatList from 'components/Control/FlatList'
import SearchInput from 'components/Network/SearchInput'
import UserAvatarLobbyBtn from 'components/Common/UserAvatarLobbyBtn'
import Spacer from 'components/Page/Spacer'
import Loader from 'components/Page/Loader'
import { getDate, getShortTimestamp } from 'services/utils'
import {
  getSocialsList,
  setSocialsListPage,
  getSocialLoginTypeCounts,
  setSocialsSearch,
  setIsLoading,
} from 'store/admin/admin.actions'
import {
  useSocialsList,
  useSocialsListCount,
  useSocialsListPagination,
  useSocialsLoginTypeCounts,
  useSocialsSearch,
  useIsLoading,
} from 'store/admin/admin.uses'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import api from 'services/api'
import { handleError } from 'services/logger'
import { getUserAvatarProps, getUserFullName, getUserId } from 'utils/user'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoading = useIsLoading()

  const socials = useSocialsList()
  const socialsCount = useSocialsListCount()
  const socialsListPagination = useSocialsListPagination()
  const search = useSocialsSearch()
  const [socialsIsLoading, setSocialsIsLoading] = useState(false)

  const [selectedValues, setSelectedValues] = useState([])
  const [isShownRemoveUserModal, setIsShownRemoveUserModal] = useState(false)

  useEffect(() => {
    if (!socials) {
      showLoading()
      getNewSocials(0)
    }
  }, [])

  const showLoading = () => {
    dispatch(setIsLoading(true))
  }

  const hideLoading = () => {
    dispatch(setIsLoading(false))
  }

  const getNewSocials = (page, search) => {
    setSocialsIsLoading(true)
    dispatch(
      getSocialsList(page, socialsListPagination.size, search, () => {
        setSocialsIsLoading(false)
        hideLoading(false)
      }),
    )
  }

  const onChangeText = value => {
    dispatch(setSocialsSearch(value))
  }

  const onSearch = value => {
    dispatch(setSocialsListPage(0))
    getNewSocials(0, value)
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onScroll = () => {
    if (!isEnd() && !socialsIsLoading) {
      onChangePage(socialsListPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewSocials(page, search)
    dispatch(setSocialsListPage(page))
  }

  const isEnd = () => {
    return socials ? socialsCount === socials.length : true
  }

  const showRemoveModal = () => {
    setIsShownRemoveUserModal(true)
  }

  const hideRemoveModal = () => {
    setIsShownRemoveUserModal(false)
  }

  const onRemove = () => {
    hideRemoveModal()

    removeUsers(selectedValues)
      .then(res => {
        onRefresh()
        setSelectedValues([])
      })
      .catch(error => handleError(error))
  }

  const onSelect = (isChecked, userId) => {
    setSelectedValues(
      isChecked ? selectedValues.filter(item => item !== userId) : [...selectedValues, userId],
    )
  }

  const renderItem = ({ item }) => {
    const userId = getUserId(item)
    return (
      <Member
        navigation={navigation}
        item={item}
        isChecked={selectedValues.includes(userId)}
        onSelect={onSelect}
      />
    )
  }

  const renderFooterComp = () => {
    return !isEnd() ? <Loader /> : null
  }

  return isLoading ? null : (
    <>
      <Container>
        <LoginTypeCounts />
        <Texts.SubtitleText>All count: {socialsCount}</Texts.SubtitleText>
      </Container>
      <SearchInput
        search={search}
        onChangeText={onChangeText}
        onSearch={onSearch}
        placeholder="search"
      />
      <SaveView>
        <Spacer h={5} />
        <Spacer h={5} />
      </SaveView>

      <Spacer h={10} />

      <FlatList
        data={socials}
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

      <AlertModal
        isVisible={isShownRemoveUserModal}
        text="Are you shure you what do delete these users?"
        okText="Remove"
        onConfirm={onRemove}
        cancelText="Cancel"
        onCancel={hideRemoveModal}
      />
    </>
  )
}

const CARD_HEIGHT = 200

const getItemLayout = (data, index) => ({
  length: CARD_HEIGHT,
  offset: CARD_HEIGHT * index,
  index,
})

const Member = ({ navigation, item, isChecked, onSelect }) => {
  const userId = getUserId(item)

  const date = getDate(item.last_activity)
  const dateAgo = getShortTimestamp(item.last_activity)

  const created_date = getDate(item.created)
  const created_dateAgo = getShortTimestamp(item.created)

  const handleSelect = () => {
    onSelect(isChecked, userId)
  }

  return (
    <>
      <MemberBox style={{ height: 200 }}>
        <Row>
          <CheckBox value={userId} isChecked={isChecked} onSelect={handleSelect} />
          <UserAvatarLobbyBtn
            {...getUserAvatarProps(item)}
            size={AVATAR_SIZE}
            navigation={navigation}
          />

          <Spacer w={10} />
          <Texts.SubtitleText>
            <Bold>{getUserFullName(item)}</Bold>
          </Texts.SubtitleText>
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
        <Texts.SubtitleText>
          <Bold>Created:</Bold> {created_date} ({created_dateAgo})
        </Texts.SubtitleText>
        <Texts.SubtitleText>
          <Bold>Type:</Bold> {item.login_type}
        </Texts.SubtitleText>
      </MemberBox>
      <Line />
    </>
  )
}

const LoginTypeCounts = () => {
  const dispatch = useDispatch()

  const socialsLoginTypeCounts = useSocialsLoginTypeCounts()

  useEffect(() => {
    if (!socialsLoginTypeCounts) {
      dispatch(getSocialLoginTypeCounts())
    }
  }, [])

  return !socialsLoginTypeCounts ? null : (
    <CountRow>
      <IconWithCount>
        <GoogleIconWrapper>
          <Icon source={Images.googleLogo} resizeMode="contain" />
        </GoogleIconWrapper>

        <Texts.SubtitleText>{socialsLoginTypeCounts?.google_count || 0}</Texts.SubtitleText>
      </IconWithCount>
      <IconWithCount>
        <AppleIconWrapper>
          <Icon source={Images.appleLogo} resizeMode="contain" />
        </AppleIconWrapper>
        <Texts.SubtitleText>{socialsLoginTypeCounts?.apple_count || 0}</Texts.SubtitleText>
      </IconWithCount>
      <IconWithCount>
        <SnapchatIconWrapper>
          <Icon source={Images.snapchatLogo} resizeMode="contain" />
        </SnapchatIconWrapper>
        <Texts.SubtitleText>{socialsLoginTypeCounts?.snapchat_count || 0}</Texts.SubtitleText>
      </IconWithCount>
    </CountRow>
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

const isInclude = (field, text) => {
  return field && field?.toLowerCase().indexOf(text) !== -1
}

const removeUsers = users => {
  return new Promise((resolve, reject) => {
    api
      .removeUsers(users)
      .then(res => resolve(res.data.result))
      .catch(error => reject(error))
  })
}

const IMAGE_SIZE = 20

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

const SaveView = styled.View`
  justify-content: flex-end;
  flex-direction: row;
`

const MemberBox = styled.View`
  padding: 20px 0;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

const IconWithCount = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const CountRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Icon = styled.Image`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  align-self: center;
`

const SnapchatIconWrapper = styled.View`
  background: ${Colors.SNAPCHAT_YELLOW_COLOR};
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
`

const GoogleIconWrapper = styled.View`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
`

const AppleIconWrapper = styled.View`
  background: #000;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
`

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.COMMON_GREY};
`
