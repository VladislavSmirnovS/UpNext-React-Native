import styled, { css } from 'styled-components'
import ShadowView from 'react-native-simple-shadow-view'
import Styles from 'appearance/styles'
import Colors from 'appearance/colors'

export default ({ wrapPadding, isFlex, backgroundColor, children }) => {
  return (
    <Wrapper wrapPadding={wrapPadding} isFlex={isFlex}>
      <Card style={CARD_STYLE} isFlex={isFlex} background={backgroundColor}>
        {children}
      </Card>
    </Wrapper>
  )
}

const CARD_STYLE = {
  shadowColor: Colors.COMMON_GREY,
  shadowOpacity: 0.3,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
}

const Wrapper = styled.View`
  padding: ${p => p.wrapPadding || '15px 10px'};
  ${p => p.isFlex && Flex};
`

const Card = styled(ShadowView)`
  padding: ${p => (p.noPadding ? 0 : 15)}px;
  width: 100%;
  background-color: ${p => p.background || Colors.WHITE};
  border-radius: ${Styles.MAIN_BORDER_RADIUS}px;
  border: ${Styles.BOX_BORDER};
  ${p => p.isFlex && Flex};
`

const Flex = css`
  flex: 1;
`
