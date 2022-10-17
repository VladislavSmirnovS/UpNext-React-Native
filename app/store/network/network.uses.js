import { useSelector } from 'react-redux'

export const useFriendsWithInvestments = () =>
  useSelector(state => state.network?.friendsWithInvestments)
export const useFriendsWithInvestmentsCount = () =>
  useSelector(state => state.network?.friendsWithInvestmentsCount)
export const useFriendsWithInvestmentsPagination = () =>
  useSelector(state => state.network?.friendsWithInvestmentsPagination)

export const useMentors = () => useSelector(state => state.network?.mentors)
export const useMentorsCount = () => useSelector(state => state.network?.mentorsCount)
export const useMentorsPagination = () => useSelector(state => state.network?.mentorsPagination)
