import { useSelector } from 'react-redux'

export const useCountries = () => useSelector(state => state.app.selectOptions.countries)
export const userCountriesFlags = () =>
  useSelector(state => state.app?.selectOptions?.countries_flags)
export const useGrades = () => useSelector(state => state.app?.selectOptions?.grades)
export const useRoles = () => useSelector(state => state.app?.selectOptions?.roles)
export const useLanguages = () => useSelector(state => state.app?.selectOptions?.languages)
export const useInterestTags = () => useSelector(state => state.app?.selectOptions?.interest_tags)
export const useSkills = () => useSelector(state => state.app?.selectOptions?.skills)

export const usePagesWebviews = () => useSelector(state => state.app?.pagesWebviews)
export const useOverflowAnimation = () => useSelector(state => state.app?.overflowAnimation)
export const useAppAlert = () => useSelector(state => state.app?.appAlert)
export const useIsShowNotLoginAlert = () => useSelector(state => state.app?.isShowNotLoginAlert)
export const useNewNotificationsCount = () => useSelector(state => state.app?.newNotificationsCount)
export const useShareData = () => useSelector(state => state.app?.shareData)
export const useIsShowSearchHashtagModal = () =>
  useSelector(state => state.app?.isShowSearchHashtagModal)
export const useSavedVideoProgress = () => useSelector(state => state.app?.savedVideoProgress)
export const useCamera = () => useSelector(state => state.app?.camera)
