import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProgressBar from 'components/Stats/ProgressBar'
import Spacer from 'components/Page/Spacer'
import Loader from 'components/Page/Loader'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import Images from 'appearance/images'
import api from 'services/api'
import { handleError } from 'services/logger'

export default ({ activityId, coins, progress }) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (activityId) {
      setIsLoading(true)
      api
        .getVideoViewStats(activityId)
        .then(res => {
          setData(res.data)
          setIsLoading(false)
        })
        .catch(error => handleError(error))
    }
  }, [activityId])

  const getCompletedVideoPercentage = () => {
    return data?.views && data?.completed ? Math.round((data?.completed * 100) / data?.views) : 0
  }

  const getQuitSec = () => {
    return data?.quit && data?.quit < 100 && data?.duration
      ? (data?.duration * data?.quit) / 100
      : 0
  }

  const getQuitProgress = () => {
    return data?.quit && data?.quit < 100 && data?.duration ? data?.quit : 0
  }

  return (
    <>
      <Texts.NewBoldTitleText>Video Stats</Texts.NewBoldTitleText>
      <Spacer h={20} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProgressBar progress={progress} quitProgress={getQuitProgress()} />
          <Spacer h={10} />

          <Row>
            <Row>
              <ImageView source={Images.viewStats} resizeMode="contain" />
              <Spacer w={9} />
              <Texts.PurpleText>{data?.views || 0}</Texts.PurpleText>
            </Row>
            <Row>
              <Image source={Images.coin} resizeMode="contain" />
              <Spacer w={11} />
              <Texts.PurpleText>{coins || 0}</Texts.PurpleText>
            </Row>
          </Row>
          <Spacer h={30} />
          <Row>
            <Row>
              <ListSquareSign background={Colors.TEXT_RED} />
              <Spacer w={10} />
              <Texts.PurpleText>Most quit before</Texts.PurpleText>
            </Row>
            <Texts.NewRedText>{getQuitSec()} sec</Texts.NewRedText>
          </Row>
          <Spacer h={10} />
          <Row>
            <Row>
              <ListSquareSign />
              <Spacer w={10} />
              <Texts.PurpleText>Completed video</Texts.PurpleText>
            </Row>
            <Texts.NewBlueText>{getCompletedVideoPercentage()}%</Texts.NewBlueText>
          </Row>
        </>
      )}
    </>
  )
}

const Image = styled.Image`
  height: ${30}px;
  width: ${30}px;
`

const ImageView = styled.Image`
  height: ${25}px;
  width: ${25}px;
`

const ListSquareSign = styled.View`
  width: 9px;
  height: 9px;
  borderRadius: 100;
  background: ${p => p.background || Colors.TEXT_BRIGHT_BLUE};
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
