import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Dimensions } from 'react-native'
import Carousel from 'components/Control/Carousel'
import CardSlider from 'components/MyProfile/CardSlider'
import BlueCard from 'components/MyProfile/BlueCard'
import Spacer from 'components/Page/Spacer'
import StreamioContainer from 'components/Feed/StreamioContainer'
import TeamAvatarToFeed from 'components/MyProfile/TeamAvatarToFeed'
import { openLobbyCurrentTeamPage } from 'services/navigation'
import { getShortTimestamp, numberWithCommas } from 'services/utils'
import ShareButton from 'components/Feed/ShareButton'
import { CardPlaceholder } from 'components/MyProfile/MyProfilePlaceholder'
import Styles from 'appearance/styles'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'

export default ({ navigation, title, data, getList, pagination, setPage, count, withEmpty }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    if (!data) {
      setIsLoading(true)
      getNewData(0)
      setIsEnd(false)
    }
  }, [data])

  const getNewData = page => {
    getList(page, res => {
      checkEnd(res?.length)
      hideLoading()
    })
  }

  const checkEnd = resLength => {
    if (!resLength) {
      setIsEnd(true)
    }
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const onEndReached = () => {
    if (!isEnd && !isLoading) {
      onChangePage(pagination.page + 1)
    }
  }

  const onChangePage = page => {
    getNewData(page)
    setPage(page)
  }

  const isEmpty = () => {
    return data && !data.length
  }

  const resList = useMemo(() => {
    if (!withEmpty) {
      return data
    }

    if (isEnd && !isLoading) {
      return data?.length ? data.concat(describeOptions) : emptyOptions
    }
    return data
  }, [data, isEnd, isLoading])

  return (
    <Container>
      <StreamioContainer>
        {isLoading ? (
          <CardPlaceholder />
        ) : (
          <>
            <Padder>
              <Title>{title}</Title>
            </Padder>
            {isEmpty() ? (
              <EmptyInvestments />
            ) : (
              <Investments
                likedFeed={resList}
                navigation={navigation}
                onEndReached={onEndReached}
              />
            )}
          </>
        )}
      </StreamioContainer>
    </Container>
  )
}

const describeOptions = [
  {
    icon: 'space2',
    title: 'INVEST',
    getDesc: () => <Text>{'You know best which ideas\r\nmight turn into products'}</Text>,
    is_description: true,
  },
  {
    icon: 'space3',
    title: 'MAKING AN EXIT',
    getDesc: () => (
      <Text>
        Hitting <Texts.RedText>50K</Texts.RedText>{' '}
        {'coins will take\r\nthe project to the next level'}
      </Text>
    ),
    is_description: true,
  },
  {
    icon: 'space4',
    title: 'EARN',
    title_icon: Images.upCoin,
    getDesc: () => (
      <Text>
        {'Own real NFT assets\r\n'}
        <Texts.GreyText>Get ‘em | Keep ‘em | Trade ‘em</Texts.GreyText>
      </Text>
    ),
    is_description: true,
  },
]
const emptyOptions = [
  {
    icon: 'space1',
    title: 'Your investments\r\nportfolio is empty',
    getDesc: () => <Text>You can influence</Text>,
    is_description: true,
  },
  ...describeOptions,
]

const EmptyInvestments = () => {
  return <CardSlider data={emptyOptions} renderItem={renderEmptyItem} />
}

const renderEmptyItem = ({ item, renderPagination }) => {
  return (
    <BlueCard isFlex>
      <Image source={Images[item.icon]} resizeMode="contain" />
      <TitleRow>
        <HeaderText>{item.title}</HeaderText>
        {item.title_icon ? (
          <>
            <Spacer w={10} />
            <TitleCoin source={item.title_icon} resizeMode="contain" />
          </>
        ) : null}
      </TitleRow>
      <Spacer h={10} />
      {item?.getDesc ? item?.getDesc() : null}

      <Centered>
        {item?.sub_description ? <Texts.GreyText>{item?.sub_description}</Texts.GreyText> : null}
      </Centered>
      <Spacer h={10} />
      {renderPagination ? renderPagination() : null}
    </BlueCard>
  )
}

const Investments = ({ likedFeed, navigation, onEndReached }) => {
  const dispatch = useDispatch()

  useEffect(() => {}, [])

  const renderItem = ({ item }) => {
    if (item?.is_description) {
      return renderEmptyItem({ item })
    }

    const onGoToCurrentTeamPage = () => {
      const params = { teamId: item?.teamId }
      dispatch(openLobbyCurrentTeamPage(navigation, params))
    }

    const getLikeCounts = likeCounts => {
      return likeCounts ? numberWithCommas(likeCounts) : 0
    }

    return (
      <BlueCard isFlex>
        <Spacer h={5} />
        <TitleContainer>
          <TeamAvatarToFeed item={item} navigation={navigation} />
          <Spacer w={30} />
          <View>
            <TeamTitle>{item.teamName}</TeamTitle>
            <TeamSlogan>{item.teamSlogan}</TeamSlogan>
          </View>
        </TitleContainer>

        <StatusContainer>
          <StatusItem>
            <StatusIcon resizeMode="contain" source={Images.coinsStats} />
            <StatusTitle>Up Coins</StatusTitle>
            <StatusCount>{getLikeCounts(item.reaction_counts?.like)}</StatusCount>
          </StatusItem>
          {/* <Spacer w={60} /> */}
          <StatusItem>
            <StatusIcon resizeMode="contain" source={Images.viewStats} />
            <StatusTitle numberOfLines={1}>Total Views</StatusTitle>
            <StatusCount>{1250}</StatusCount>
          </StatusItem>
        </StatusContainer>
        <BorderLine />
        <StatusContainer>
          <StatusItem>
            <SmallStatusIcon resizeMode="contain" source={Images.videoGallery} />
            <SmallStatusTitle numberOfLines={1}>Video Gallery</SmallStatusTitle>
          </StatusItem>
          <StatusItem>
            <ShareButton item={item} navigation={navigation} imageSource={Images.mainShare} />
            <Spacer h={8} />
            <SmallStatusTitle>Share</SmallStatusTitle>
          </StatusItem>
        </StatusContainer>
      </BlueCard>
    )
  }

  return (
    <Carousel
      options={likedFeed}
      renderItem={renderItem}
      itemWidth={likedFeed?.length > 1 ? width - 45 : width - 10}
      maxWidth={width}
      onEndReached={onEndReached}
    />
  )
}

const { width } = Dimensions.get('window')

const Container = styled.View`
  flex: 1;
  width: 100%;
`

const Padder = styled.View`
  padding: ${Styles.PAGE_SIDE_PADDING};
`

const Image = styled.Image`
  flex: 1;
  align-self: center;
`

const TitleCoin = styled.Image`
  width: 30px;
  height: 30px;
  align-self: center;
`

const HeaderText = styled(Texts.HeaderText)`
  font-weight: 700;
  color: ${Colors.COMMON_BLUE};
  text-align: center;
`

const Text = styled(Texts.BoldTitleText)`
  text-align: center;
  color: ${Colors.TEXT_DARK_GREY};
`

const Title = styled(Texts.NewBoldTitleText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
`

const Centered = styled.View`
  align-items: center;
`

const TitleRow = styled.View`
  justify-content: center;
  flex-direction: row;
  width: 100%;
`

const View = styled.View``

const StatusContainer = styled.View`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`
const BorderLine = styled.View`
  border-color: ${Colors.TEXT_BRIGHT_BLUE};
  height: 0;
  border-width: 1px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const StatusItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 90px;
`
const StatusIcon = styled.Image`
  width: 50px;
  height: 50px;
`
const StatusTitle = styled(Texts.PurpleSubTitleText)`
  line-height: 22px;
  font-size: 18px;
  margin-bottom: 5px;
`

const SmallStatusIcon = styled.Image`
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
`
const SmallStatusTitle = styled(Texts.PurpleSubTitleText)`
  line-height: 18px;
  font-size: 13px;
  text-align: center;
  font-weight: 500;
`

const StatusCount = styled(Texts.PurpleSubTitleText)`
  line-height: 22px;
  font-size: 18px;
  font-weight: 700;
`

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const TeamTitle = styled(Texts.BoldTitleText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
  font-size: 24px;
`

const TeamSlogan = styled(Texts.DarkPurpleText)``
