import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import Modal from 'components/Tutorials/Modal'
import Player from 'components/Video/Player'
import mixpanel from 'services/mixpanel'
import { AVAILABLE_HEIGHT } from 'components/Control/DeviceHeight'
import Images from 'appearance/images'

// @TODO: get video url from server
export default ({ isVisible, onHide, videoUrl }) => {
  const onSkipp = () => {
    onHide()
    mixpanel.trackEvent('Skip explainer video')
  }

  return (
    <Modal isVisible={isVisible} buttonText="Skip" onButtonPress={onSkipp}>
      <Wrapper>
        <Player localUrl={videoUrl || Images.launchVideo} isPlay withPlayButton />
      </Wrapper>
    </Modal>
  )
}

const { width } = Dimensions.get('window')

// const URL = 'https://vimeo.com/529206640/69944a67da'
const MIN_HEIGHT = ((width - 60) * 16) / 9
const MAX_HEIGHT = AVAILABLE_HEIGHT - 20 - 100 - 50 // 20 - card padding, 100 - modal padding, 50 - button
const CURENT_HEIGHT = MIN_HEIGHT > MAX_HEIGHT ? MAX_HEIGHT : MIN_HEIGHT

const Wrapper = styled.View`
  height: ${CURENT_HEIGHT}px;
  width: 100%;
  overflow: hidden;
`
