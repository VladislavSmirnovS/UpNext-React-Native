import styled from 'styled-components'
import Colors from 'appearance/colors'
import Styles from 'appearance/styles'

export default styled.View`
  display: flex;
  flex-direction: column;
  padding: ${p => (p.noPadding ? 0 : 13.3)}px;
  width: 100%;
  background-color: ${Colors.WHITE};
  border-radius: ${Styles.MAIN_BORDER_RADIUS}px;
  border: ${Styles.BOX_BORDER};
  box-shadow: ${Styles.BOX_SHADOW};
  elevation: ${Styles.ELEVATION};
  margin-top: 10px;
`
