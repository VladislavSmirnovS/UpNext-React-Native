import React from 'react'
import styled from 'styled-components'
import FlatList from 'components/Control/FlatList'
import Loader from 'components/Page/Loader'
import Mentor from 'components/Network/Mentor'
import Texts from 'appearance/texts'
import { getUserId } from 'utils/user'

export default ({ navigation, mentors, onRefresh, onScroll, isEnd, emptyEl }) => {
  const getKey = item => {
    return getUserId(item)
  }

  const noResultComp = () => {
    return emptyEl || <CenteredText>no result</CenteredText>
  }

  const renderItem = ({ item: member, index }) => {
    return <Mentor member={member} navigation={navigation} />
  }

  const footerComp = () => {
    return !isEnd ? <Loader /> : null
  }

  const shouldComponentUpdate = () => {
    return false
  }

  return mentors ? (
    <FlatList
      data={mentors}
      onRefresh={onRefresh}
      refreshing={false}
      onEndReached={onScroll}
      onEndReachedThreshold={0.2}
      keyExtractor={getKey}
      ListEmptyComponent={noResultComp}
      renderItem={renderItem}
      ListFooterComponent={footerComp}
      shouldComponentUpdate={shouldComponentUpdate}
    />
  ) : null
}

const CenteredText = styled(Texts.TitleText)`
  text-align: center;
`
