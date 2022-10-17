import React from 'react'
import styled from 'styled-components'
import Texts from 'appearance/texts'
import Colors from 'appearance/colors'
import { getShortTimestamp } from 'services/utils'

export default ({ item }) => {
  return (
    <Container>
      <WhiteText style={TEXT_STYLE}>
        Team`s last activity on the app: {getShortTimestamp(item?.last_team_activity)}
      </WhiteText>

      {/* <WhiteText style={TEXT_STYLE}>
        views {item?.views_count} progress {item?.views_progress} likes {item?.likes_count}{' '}
        favorites {item?.favorites_count}
      </WhiteText> */}
    </Container>
  )
}

const TEXT_STYLE = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10,
}

const Container = styled.View`
  margin: 2px 5px;
`

const WhiteText = styled(Texts.TitleText)`
  color: ${Colors.WHITE};
`
