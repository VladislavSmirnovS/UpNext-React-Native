import { useSelector } from 'react-redux'

export const useEditItem = () => useSelector(state => state.launcher?.editItem)
export const useShownItem = () => useSelector(state => state.launcher?.shownItem)

export const useLaunchersFiltersOptions = () =>
  useSelector(state => state.launcher?.launchersFiltersOptions)

export const useLaunchers = () => useSelector(state => state.launcher?.launchers)
export const useLaunchersFilters = () => useSelector(state => state.launcher?.launchersFilters)
export const useLaunchersPagination = () =>
  useSelector(state => state.launcher?.launchersPagination)

export const useMyLaunchers = () => useSelector(state => state.launcher?.myLaunchers)
export const useMyLaunchersPagination = () =>
  useSelector(state => state.launcher?.myLaunchersPagination)
