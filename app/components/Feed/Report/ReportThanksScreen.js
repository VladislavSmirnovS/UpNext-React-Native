import React from 'react'
import Images from 'appearance/images'
import BlockTeamButton from 'components/Feed/Report/BlockTeamButton'
import { Icon, CenteredHeaderText, CenteredTitleText } from 'components/Feed/Report/style'
import Colors from 'appearance/colors'
import styled from 'styled-components'

export default ({ item, onBlock }) => {
  return (
    <>
      <Icon source={Images.thanks} resizeMode="contain" height={120} />
      <HeaderTextBlue>Tnx for Letting us know</HeaderTextBlue>
      <TitleTextPurple>We are on it</TitleTextPurple>

      <BlockTeamButton item={item} onPress={onBlock} />
    </>
  )
}
const HeaderTextBlue = styled(CenteredHeaderText)`
  color: ${Colors.TEXT_BRIGHT_BLUE};
`
const TitleTextPurple = styled(CenteredTitleText)`
  color: ${Colors.TEXT_DARK_PURPLE};
`
