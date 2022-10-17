import React from 'react'
import BlockTeamButton from 'components/Feed/Report/BlockTeamButton'
import { CenteredTitleText } from 'components/Feed/Report/style'
import Colors from 'appearance/colors'

export default ({ item, onBlock }) => {
  return (
    <>
      <CenteredTitleText color={Colors.TEXT_BRIGHT_BLUE}>
        You already reported this video
      </CenteredTitleText>

      <BlockTeamButton item={item} onPress={onBlock} />
    </>
  )
}
