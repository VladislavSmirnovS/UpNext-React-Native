import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import ScrollPadder from 'components/Page/ScrollPadder'
import Spacer from 'components/Page/Spacer'
import Button from 'components/Control/Button'
import Loader from 'components/Page/Loader'
import ToggleButtonsGroup from 'components/Control/ToggleButtonsGroup'
import {
  getSessionStats,
  getSocialsList,
  setSocialsSearch,
  setSessionStatsPage,
  setIsLoading,
} from 'store/admin/admin.actions'
import {
  useSessionStats,
  useSocialsListPagination,
  useSessionStatsPagination,
  useIsLoading,
} from 'store/admin/admin.uses'
import { numberArray, secondsToHms } from 'services/utils'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import api from 'services/api'

export default ({ openSocialsTab }) => {
  const dispatch = useDispatch()
  const isLoading = useIsLoading()

  const sessionStats = useSessionStats()
  const sessionStatsPagination = useSessionStatsPagination()
  const socialsListPagination = useSocialsListPagination()

  const [formatTab, setFormatTab] = useState(TOGGLE_BUTTONS_GROUP_PERIOD[0].value)
  const [statsTab, setStatsTab] = useState(TOGGLE_BUTTONS_GROUP_STATS[0].value)
  const [appStats, setAppStats] = useState()
  const [loginStats, setLoginStats] = useState()
  const [isNextLoading, setIsNextLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const res = await api.getAppStats()
      setAppStats(res.data)
    }

    if (!appStats) {
      getData()
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      const res = await api.getLoginStats()
      setLoginStats(res.data)
    }

    if (!loginStats) {
      getData()
    }
  }, [])

  const showLoading = () => {
    dispatch(setIsLoading(true))
  }

  const hideLoading = () => {
    dispatch(setIsLoading(false))
  }

  useEffect(() => {
    if (!sessionStats) {
      showLoading()
      getNewData(0, hideLoading)
    }
  }, [formatTab])

  useEffect(() => {
    showLoading()
    getNewData(0, hideLoading)
  }, [formatTab])

  const getNewData = (page, callback) => {
    dispatch(getSessionStats(formatTab, page, sessionStatsPagination.size, callback))
  }

  const onLoadNext = () => {
    setIsNextLoading(true)
    const currentPage = sessionStatsPagination.page + 1
    getNewData(currentPage, hideNextLoading)
    dispatch(setSessionStatsPage(currentPage))
  }

  const onUpdate = () => {
    setIsNextLoading(true)
    getNewData(0, hideNextLoading)
    dispatch(setSessionStatsPage(0))
  }

  const hideNextLoading = () => {
    setIsNextLoading(false)
  }

  const onRowPress = date => {
    const search = sessionStats[date]?.users?.join(' ')
    dispatch(setSocialsSearch(search))
    dispatch(getSocialsList(0, socialsListPagination.size, search))
    openSocialsTab()
  }

  const getDaysKeys = () => {
    return sessionStats ? Object.keys(sessionStats) : []
  }

  const getHeaders = () => {
    const daysKeys = getDaysKeys()
    const collumns = daysKeys?.map((item, index) => `${formatTab} ${index + 1}`)
    return ['', 'New users', ...collumns]
  }

  const renderStatsRows = () => {
    const daysKeys = getDaysKeys()
    const rowsData = daysKeys?.map(key => getStatsRow(key, sessionStats[key]))
    return rowsData?.map((item, index) =>
      renderRow({ items: item, key: index, isColors: true, onPress: onRowPress }),
    )
  }

  const getStatsRow = (key, item) => {
    const keys = item ? Object.keys(item) : []
    const collumns = keys?.filter(key => key !== 'users')?.map((key, i) => getStatsCell(key, item))
    const emptyCells = getEmptyCells(collumns)
    return [key, ...collumns, ...emptyCells]
  }

  const getStatsCell = (key, item) => {
    const count = item?.new_users_count
    const value = item?.[key]?.[statsTab]

    if (key === 'new_users_count') {
      return count
    }
    if (statsTab === 'time') {
      const valueCount = item?.[key]?.count
      return secondsToHms(valueCount ? value / valueCount : 0)
    }
    return value
  }

  const getEmptyCells = items => {
    const headersLength = getHeaders()?.length
    const emptyElCount = headersLength - items?.length - 1
    const numberArr = emptyElCount ? numberArray(0, emptyElCount - 1) : []
    return numberArr?.map(item => '')
  }

  const isDisabled = () => {
    const daysKeys = getDaysKeys()
    const isEnd = sessionStatsPagination.page * sessionStatsPagination.size >= daysKeys?.length
    return isNextLoading || isEnd
  }

  const getDeviceAccountsRatio = () => {
    return loginStats?.count_socials_users
      ? (loginStats?.count_registered_devices / loginStats?.count_socials_users).toFixed(4)
      : '-'
  }

  return isLoading ? null : (
    <ScrollPadder>
      <View>
        <Texts.BoldTitleText>Login devices</Texts.BoldTitleText>
        <Texts.TitleText>
          Unique switching attempts:
          <Texts.BoldTitleText>
            {' '}
            {loginStats?.count_unique_attempt_register_other_device}
          </Texts.BoldTitleText>
        </Texts.TitleText>
        <Texts.TitleText>
          Unique switching completed:
          <Texts.BoldTitleText>
            {' '}
            {loginStats?.count_unique_user_register_other_device}
          </Texts.BoldTitleText>
        </Texts.TitleText>
        <Texts.TitleText>
          devices /acconts ratio:
          <Texts.BoldTitleText> {getDeviceAccountsRatio()}</Texts.BoldTitleText> (
          {loginStats?.count_registered_devices}/ {loginStats?.count_socials_users})
        </Texts.TitleText>
        <Spacer h={20} />

        <Texts.BoldTitleText>Common</Texts.BoldTitleText>
        <Texts.TitleText>
          Count of team members:
          <Texts.BoldTitleText> {appStats?.count_team_members}</Texts.BoldTitleText>
        </Texts.TitleText>
        <Texts.TitleText>
          Count of invested coins:
          <Texts.BoldTitleText> {appStats?.count_invested_coins}</Texts.BoldTitleText>
        </Texts.TitleText>
        <Texts.TitleText>
          Count of unique link clicks:
          <Texts.BoldTitleText> {appStats?.count_unique_link_clicks}</Texts.BoldTitleText>
        </Texts.TitleText>
        <Texts.TitleText>
          Count of coins set from link:
          <Texts.BoldTitleText> {appStats?.count_coins_from_links}</Texts.BoldTitleText>
        </Texts.TitleText>
        <Spacer h={20} />
      </View>

      <Row>
        <ToggleButtonsGroup
          group={TOGGLE_BUTTONS_GROUP_PERIOD}
          value={formatTab}
          onValueChange={setFormatTab}
        />
        {isNextLoading ? <Loader height={10} /> : null}
        <ToggleButtonsGroup
          group={TOGGLE_BUTTONS_GROUP_STATS}
          value={statsTab}
          onValueChange={setStatsTab}
        />
      </Row>
      <ScrollView>
        <Table>
          {renderRow({ items: getHeaders(), key: 'header' })}
          {renderStatsRows()}
        </Table>
      </ScrollView>

      <Row>
        <Button
          text="Reload"
          height={26}
          width="80px"
          onPress={onUpdate}
          disabled={isNextLoading}
        />
        <Button
          text={isNextLoading ? 'Loading...' : 'Load next'}
          height={26}
          width="80px"
          onPress={onLoadNext}
          disabled={isDisabled()}
        />
      </Row>
    </ScrollPadder>
  )
}

const renderRow = ({ items, key, isColors, onPress }) => {
  const handlePress = () => {
    onPress && onPress(items?.[0])
  }

  const renderItems = (item, index) => {
    const isFirstCell = index === 1
    const isStatsCell = index > 1
    const backgroundColor = isFirstCell ? '#fff1c0' : isStatsCell ? '#65d5ff' : null
    return renderCell(item, isColors ? backgroundColor : null, index)
  }

  return (
    <TableRow key={key} onPress={handlePress} activeOpacity={onPress ? 0 : 1}>
      {items?.map(renderItems)}
    </TableRow>
  )
}

const renderCell = (text, backgroundColor, index) => {
  return (
    <TableCell backgroundColor={backgroundColor} key={`${index}-${text}`}>
      <Texts.TitleText>{text}</Texts.TitleText>
    </TableCell>
  )
}

const TOGGLE_BUTTONS_GROUP_PERIOD = [
  { title: 'D', value: 'D' },
  { title: 'W', value: 'W' },
  { title: 'M', value: 'M' },
]

const TOGGLE_BUTTONS_GROUP_STATS = [{ title: '#', value: 'count' }, { title: '🕓', value: 'time' }]

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const ScrollView = styled.ScrollView.attrs({ horizontal: true })`
  padding: 20px 0;
`

const Table = styled.View``

const View = styled.View`
  width: 100%;
`

const TableRow = styled.TouchableOpacity`
  flex: 1;
  align-self: stretch;
  flex-direction: row;
`

const TableCell = styled.View`
  flex: 1;
  align-self: stretch;
  width: 80px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  background: ${p => p.backgroundColor || Colors.WHITE};
`
