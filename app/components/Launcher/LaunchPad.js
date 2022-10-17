import React from 'react'
import { useDispatch } from 'react-redux'
import PaginationList from 'components/Control/PaginationList'
import LaunchPadItem from 'components/Launcher/LaunchPadItem'
import Filters from 'components/Launcher/Filters'
import {
  getLaunchers,
  setLaunchersFilters,
  setLaunchersPage,
} from 'store/launcher/launcher.actions'
import {
  useLaunchers,
  useLaunchersFilters,
  useLaunchersPagination,
} from 'store/launcher/launcher.uses'

export default ({ navigation }) => {
  const dispatch = useDispatch()
  const launchers = useLaunchers()
  const launchersFilters = useLaunchersFilters()
  const launchersPagination = useLaunchersPagination()

  const getData = (page, callback) => {
    getDataWithFilters(page, launchersFilters, callback)
  }

  const getDataWithFilters = (page, filters, callback) => {
    dispatch(getLaunchers(page, launchersPagination.size, filters, callback))
  }

  const setPage = page => {
    dispatch(setLaunchersPage(page))
  }

  const onFilter = filters => {
    setFilters(filters)
    setPage(0)
    getDataWithFilters(0, filters)
  }

  const setFilters = filters => {
    dispatch(setLaunchersFilters(filters))
  }

  const renderItem = ({ item }) => {
    return <LaunchPadItem item={item} withConnectButton navigation={navigation} />
  }

  return (
    <>
      <Filters filters={launchersFilters} setFilters={onFilter} />
      <PaginationList
        noPadding
        data={launchers}
        currentPage={launchersPagination.page}
        getData={getData}
        setPage={setPage}
        renderItem={renderItem}
      />
    </>
  )
}
