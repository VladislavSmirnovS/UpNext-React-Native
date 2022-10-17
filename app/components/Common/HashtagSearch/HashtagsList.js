import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import List from 'components/Control/List'
import {
  getFeedHashtags,
  setHashtagsPage,
  setHashtagFilter,
  resetFeed,
} from 'store/feed/feed.actions'
import {
  useFeedHashtags,
  useFeedHashtagsCount,
  useFeedHashtagsPagination,
  useHashtagFilter,
} from 'store/feed/feed.uses'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'

export default ({ search, onCloseHashtagSearchModal }) => {
  const dispatch = useDispatch()

  const data = useFeedHashtags()
  const count = useFeedHashtagsCount()
  const pagination = useFeedHashtagsPagination()
  const hashtag = useHashtagFilter()

  useEffect(() => {
    getData(0)
  }, [search])

  const getData = (page, callback) => {
    dispatch(getFeedHashtags(page, pagination.size, search, callback))
  }

  const setPage = page => {
    dispatch(setHashtagsPage(page))
  }

  const renderItem = ({ item }) => {
    const onPress = () => {
      dispatch(setHashtagFilter(item === hashtag ? null : item))

      requestAnimationFrame(() => {
        dispatch(resetFeed())
        setTimeout(() => {
          onCloseHashtagSearchModal()
        }, 500)
      })
    }

    return (
      <TouchableOpacity onPress={onPress} key={item}>
        <ItemText isSelected={item === hashtag}>#{item}</ItemText>
      </TouchableOpacity>
    )
  }

  return (
    <List
      data={data}
      count={count}
      currentPage={pagination.page}
      getData={getData}
      setPage={setPage}
      renderItem={renderItem}
    />
  )
}

const TouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 10px;
`

const ItemText = styled(Texts.TitleText)`
  color: ${p => (p.isSelected ? Colors.COMMON_BLUE : Colors.TEXT_DARK_BLUE)};
`
