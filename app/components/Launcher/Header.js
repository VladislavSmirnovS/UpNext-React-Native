import React from 'react'
import styled from 'styled-components'
import Images from 'appearance/images'
import Texts from 'appearance/texts'
import Spacer from 'components/Page/Spacer'
import { LAUNCHER_CANDIDATE_KEY, LAUNCHER_SEARCHER_KEY } from 'constants'

export default ({ item, title, withLaunchType = true, withSpacer = true }) => {
  return (
    <>
      {withSpacer ? <Spacer h={30} /> : null}
      <Row>
        {title ? <Texts.BlueTitleText>{title}</Texts.BlueTitleText> : null}
        <Flex />
        {withLaunchType ? <Icon source={getIcon(item.launcher_type)} resizeMode="contain" /> : null}
      </Row>
    </>
  )
}

const getIcon = launcherType => {
  if (launcherType === LAUNCHER_CANDIDATE_KEY) {
    return Images.candidateIcon
  }
  if (launcherType === LAUNCHER_SEARCHER_KEY) {
    return Images.searcherIcon
  }
  return null
}

const ICON_SIZE = 60

const Flex = styled.View`
  flex: 1;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${ICON_SIZE}px;
`

const Icon = styled.Image`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  align-self: center;
`
