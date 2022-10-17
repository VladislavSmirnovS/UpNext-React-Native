import React, { useEffect, useState, memo } from 'react'
import Tab from 'components/Feed/Tab'
import CommonFeed from 'components/Feed/CommonFeed'
import MyInvestmentsFeed from 'components/Feed/MyInvestmentsFeed'
import useFeedVideoPlay from 'components/Feed/hooks/useFeedVideoPlay'

const DEFAULT_ACTIVE_TAB = 0

const FEED_TAB_VIDEOS = 'videos'
const FEED_TAB_INVESTMENTS = 'my_investments'

const TABS = [
  { key: FEED_TAB_VIDEOS, title: 'Feed' },
  { key: FEED_TAB_INVESTMENTS, title: 'Favorites' },
]

export default ({ navigation }) => {
  const { isFeedPlay } = useFeedVideoPlay(navigation)

  const [currentTab, setCurrentTab] = useState(DEFAULT_ACTIVE_TAB)

  useEffect(() => {
    if (navigation?.state?.params?.activity_id && currentTab !== 0) {
      setCurrentTab(0)
    }
  }, [navigation])

  const isVideosPlayRule = tab => {
    return currentTab === tab && isFeedPlay
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case FEED_TAB_VIDEOS: {
        const isPlayRule = isVideosPlayRule(0)
        return <MemoCommonFeed navigation={navigation} isPlayRule={isPlayRule} />
      }

      case FEED_TAB_INVESTMENTS: {
        const isPlayRule = isVideosPlayRule(1)
        return <MemoMyInvestmentsFeed navigation={navigation} isPlayRule={isPlayRule} />
      }
    }
  }

  return (
    <Tab
      tabs={TABS}
      activeTab={currentTab}
      setCurrentStep={setCurrentTab}
      renderScene={renderScene}
    />
  )
}

const areTabPropsEqual = (prevProps, nextProps) => {
  return prevProps.isPlayRule === nextProps.isPlayRule
}

const MemoCommonFeed = memo(CommonFeed, areTabPropsEqual)
const MemoMyInvestmentsFeed = memo(MyInvestmentsFeed, areTabPropsEqual)
