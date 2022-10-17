import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Icon from 'components/Control/Icon'
import Spacer from 'components/Page/Spacer'
import Padding from 'components/MyVentures/Padding'
import Filter from 'components/Startup/Filter/Filter'
import BackButton from 'components/Video/BackButton'
import { openCardVideosPage, openMyStartupPage } from 'services/navigation'
import useStartupVideoByIds from 'hooks/useStartupVideoByIds'
import Images from 'appearance/images'

export default ({ navigation, currentStepInfo }) => {
  const dispatch = useDispatch()

  const onGoBackPress = () => {
    dispatch(openMyStartupPage(navigation))
  }

  return (
    <View>
      <BackButton onGoBackPress={onGoBackPress} />
      <Row>
        <Spacer w={ICON_SIZE} />
        <Filter />
        <QuestionMark navigation={navigation} currentStepInfo={currentStepInfo} />
      </Row>
      <Spacer h={10} />
    </View>
  )
}

const View = styled.View`
  padding: 5px 0;
  justify-content: center;
`

const ICON_SIZE = 24

const QuestionMark = ({ navigation, currentStepInfo }) => {
  const dispatch = useDispatch()

  const { isHasVideos, videos } = useStartupVideoByIds(currentStepInfo.videos_ids)

  const onPress = () => {
    const params = { videos, key: currentStepInfo.videos_ids }
    dispatch(openCardVideosPage(navigation, params))
  }

  return isHasVideos ? (
    <TouchableOpacity onPress={onPress}>
      <Icon source={Images.questionMark} size={ICON_SIZE} />
    </TouchableOpacity>
  ) : null
}

const Row = styled(Padding)`
  flex-direction: row;
  justify-content: space-between;
`

const TouchableOpacity = styled.TouchableOpacity``
