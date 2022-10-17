import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import Carousel from 'react-native-snap-carousel'
import Card from 'components/Control/Card'
import Spacer from 'components/Page/Spacer'
import TeamAvatarLobbyBtn from 'components/Common/TeamAvatarLobbyBtn'
import Hashtags from 'components/Feed/Hashtags'
import { getMoreTeams, setTeamMoreTeamsPage } from 'store/team/team.actions'
import { useTeamMoreTeams, useTeamMoreTeamsPagination } from 'store/team/team.uses'
import Colors from 'appearance/colors'
import Texts from 'appearance/texts'
import Styles from 'appearance/styles'
import { getTeamAvatarProps } from 'utils/team'

export default ({ navigation, team }) => {
  return null
  const dispatch = useDispatch()
  const teamMoreTeams = useTeamMoreTeams()
  const { page, size } = useTeamMoreTeamsPagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    if (team?.id && !isLoading) {
      showLoading()
      getNewData(0, hideLoading)

      resetData()
    }
  }, [team])

  useEffect(() => {
    if (!page && isEnd) {
      setIsEnd(false)
    }
  }, [page])

  const resetData = () => {
    if (page) {
      setPage(0)
    }
    if (isEnd) {
      setIsEnd(false)
    }
  }

  const showLoading = () => {
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const getNewData = (page, callback) => {
    setIsDataLoading(true)
    getData(page, resLength => {
      checkEnd(resLength)
      setIsDataLoading(false)
      callback && callback()
    })
  }

  const getData = (page, callback) => {
    dispatch(getMoreTeams(team?.id, page, size, callback))
  }

  const setPage = page => {
    dispatch(setTeamMoreTeamsPage(page))
  }

  const checkEnd = resLength => {
    if (!resLength) {
      setIsEnd(true)
    }
  }

  // const onRefresh = () => {
  //   onChangePage(0)
  //   setIsEnd(false)
  // }

  const onEndReached = () => {
    if (!isEnd && !isDataLoading) {
      onChangePage(page + 1)
    }
  }

  const onChangePage = page => {
    getNewData(page)
    setPage(page)
  }

  const renderItem = ({ item }) => {
    return <CarouselItem item={item} navigation={navigation} />
  }

  if (!team?.id || !teamMoreTeams?.lenght) {
    return null
  }

  return (
    <Wrapper>
      <Padder>
        <Texts.WhiteText>More startups</Texts.WhiteText>

        <Carousel
          useScrollView={Platform.OS === 'ios'}
          data={teamMoreTeams || []}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 90}
          inactiveSlideOpacity={1}
          onEndReached={onEndReached}
        />
      </Padder>
    </Wrapper>
  )
}

const CarouselItem = ({ item, navigation }) => {
  return (
    <Card>
      <Row>
        <TeamAvatarLobbyBtn {...getTeamAvatarProps(item)} size={TEAM_AVATAR_SIZE} />
        <Spacer w={10} />
        <View>
          <BoldText numberOfLines={1} ellipsizeMode="tail">
            {item?.name}
          </BoldText>

          {item?.slogan ? (
            <Texts.SubtitleText numberOfLines={2} ellipsizeMode="tail">
              {item?.slogan}
            </Texts.SubtitleText>
          ) : null}

          <Hashtags item={item} />
        </View>
      </Row>
    </Card>
  )
}

const TEAM_AVATAR_SIZE = 80

const { width } = Dimensions.get('window')

const BoldText = styled(Texts.BigText)`
  font-weight: 700;
`

const Wrapper = styled.View`
  background: ${Colors.COMMON_BLUE};
  width: 100%;
`

const Padder = styled.View`
  padding: ${Styles.PAGE_PADDING};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const View = styled.View`
  max-width: ${width - 90 - 2 * 20 - 10 - TEAM_AVATAR_SIZE}px;
`
