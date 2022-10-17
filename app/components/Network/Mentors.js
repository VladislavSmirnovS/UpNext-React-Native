import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MentorsList from 'components/Network/MentorsList'
import { getMentors, setMentorsPage } from 'store/network/network.actions'
import { useMentors, useMentorsCount, useMentorsPagination } from 'store/network/network.uses'

export default ({ navigation, setIsLoading }) => {
  const dispatch = useDispatch()

  const mentors = useMentors()
  const mentorsCount = useMentorsCount()
  const mentorsPagination = useMentorsPagination()

  const [mentorsIsLoading, setMentorsIsLoading] = useState(false)

  useEffect(() => {
    if (!mentors) {
      setIsLoading(true)
      getNewMentors(0)
    }
  }, [])

  const getNewMentors = page => {
    setMentorsIsLoading(true)
    dispatch(getMentors(page, mentorsPagination.size, hideLoading))
  }

  const hideLoading = () => {
    setMentorsIsLoading(false)
    setIsLoading(false)
  }

  const onRefresh = () => {
    onChangePage(0)
  }

  const onScroll = () => {
    if (!isEnd() && !mentorsIsLoading) {
      onChangePage(mentorsPagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewMentors(page)
    dispatch(setMentorsPage(page))
  }

  const isEnd = () => {
    return mentors ? mentorsCount === mentors.length : true
  }

  return (
    <MentorsList
      navigation={navigation}
      mentors={mentors}
      onRefresh={onRefresh}
      onScroll={onScroll}
      isEnd={isEnd()}
    />
  )
}
