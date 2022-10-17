import React from 'react'
import Colors from 'appearance/colors'
import Spacer from 'components/Page/Spacer'
import { CenteredTitleText, Button } from 'components/Feed/Report/style'

export default ({ item, onPress }) => {
  return (
    <>
      <Spacer h={30} />
      <CenteredTitleText color={Colors.TEXT_DARK_PURPLE}>In the meantime you can</CenteredTitleText>
      <Button onPress={onPress}>
        <CenteredTitleText color={Colors.TEXT_BRIGHT_BLUE}>
          Block team {item?.teamName}
        </CenteredTitleText>
      </Button>
    </>
  )
}
